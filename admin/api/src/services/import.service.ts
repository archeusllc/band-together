import { PrismaClient } from '../config/prisma';
import { parse } from 'csv-parse/sync';

const prisma = PrismaClient;

export interface TrackImportRow {
  title: string;
  artist: string;
  type: string;
  duration?: number;
  defaultDuration?: number;
  tuning?: string;
  defaultTuning?: string;
}

export interface ImportResult {
  success: number;
  failed: number;
  errors: Array<{
    row: number;
    message: string;
    data?: TrackImportRow;
  }>;
}

const validateTrackRow = (row: any, rowNumber: number): { valid: boolean; track?: TrackImportRow; error?: string } => {
  if (!row.title || typeof row.title !== 'string') {
    return { valid: false, error: `Row ${rowNumber}: Title is required and must be a string` };
  }

  if (!row.artist || typeof row.artist !== 'string') {
    return { valid: false, error: `Row ${rowNumber}: Artist is required and must be a string` };
  }

  if (!row.type || typeof row.type !== 'string') {
    return { valid: false, error: `Row ${rowNumber}: Type is required and must be a string` };
  }

  // Validate type against allowed values
  const validTypes = ['SONG', 'BACKING_TRACK', 'INSTRUMENTAL', 'DEMO'];
  if (!validTypes.includes(row.type.toUpperCase())) {
    return {
      valid: false,
      error: `Row ${rowNumber}: Type must be one of: ${validTypes.join(', ')}`,
    };
  }

  // Support both 'duration' and 'defaultDuration' field names
  const durationValue = row.duration || row.defaultDuration;
  let duration: number | undefined;
  if (durationValue) {
    duration = parseInt(String(durationValue));
    if (isNaN(duration) || duration <= 0) {
      return { valid: false, error: `Row ${rowNumber}: Duration must be a positive number` };
    }
  }

  // Support both 'tuning' and 'defaultTuning' field names
  const tuning = row.tuning || row.defaultTuning;

  return {
    valid: true,
    track: {
      title: row.title.trim(),
      artist: row.artist.trim(),
      type: row.type.toUpperCase(),
      duration,
      defaultDuration: duration,
      tuning: tuning?.trim(),
      defaultTuning: tuning?.trim(),
    },
  };
};

export const importService = {
  async parseCSV(fileContent: string): Promise<{ tracks: TrackImportRow[]; errors: Array<{ row: number; message: string }> }> {
    const errors: Array<{ row: number; message: string }> = [];
    const tracks: TrackImportRow[] = [];

    try {
      const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
      });

      records.forEach((record: any, index: number) => {
        const rowNumber = index + 2; // +2 because row 1 is header, index is 0-based
        const validation = validateTrackRow(record, rowNumber);

        if (!validation.valid) {
          errors.push({
            row: rowNumber,
            message: validation.error!,
          });
        } else {
          tracks.push(validation.track!);
        }
      });

      return { tracks, errors };
    } catch (error) {
      throw new Error(`CSV parsing error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  async parseJSON(fileContent: string): Promise<{ tracks: TrackImportRow[]; errors: Array<{ row: number; message: string }> }> {
    const errors: Array<{ row: number; message: string }> = [];
    const tracks: TrackImportRow[] = [];

    try {
      const data = JSON.parse(fileContent);

      if (!Array.isArray(data)) {
        throw new Error('JSON must be an array of track objects');
      }

      data.forEach((record: any, index: number) => {
        const rowNumber = index + 1;
        const validation = validateTrackRow(record, rowNumber);

        if (!validation.valid) {
          errors.push({
            row: rowNumber,
            message: validation.error!,
          });
        } else {
          tracks.push(validation.track!);
        }
      });

      return { tracks, errors };
    } catch (error) {
      throw new Error(`JSON parsing error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  async bulkImportTracks(
    tracks: TrackImportRow[],
    createdBy: string
  ): Promise<ImportResult> {
    const result: ImportResult = {
      success: 0,
      failed: 0,
      errors: [],
    };

    for (let i = 0; i < tracks.length; i++) {
      try {
        const track = tracks[i];
        await prisma.track.create({
          data: {
            title: track.title,
            artist: track.artist,
            type: track.type as any,
            defaultDuration: track.defaultDuration,
            defaultTuning: track.defaultTuning,
            createdBy,
            isActive: true,
          },
        });
        result.success++;
      } catch (error) {
        result.failed++;
        result.errors.push({
          row: i + 1,
          message: error instanceof Error ? error.message : 'Unknown error',
          data: tracks[i],
        });
      }
    }

    return result;
  },

  generateCSVTemplate(): string {
    const headers = ['title', 'artist', 'type', 'defaultDuration', 'defaultTuning'];
    const example = [
      ['Purple Haze', 'Jimi Hendrix', 'SONG', '189', 'Standard'],
      ['Backing Track', 'Various', 'BACKING_TRACK', '240', ''],
    ];

    const rows = [headers, ...example];
    return rows.map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');
  },
};
