import { importService } from '@services/import.service';

export class ImportError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = 'ImportError';
  }
}

export const importController = {
  async importCSV(fileContent: string, adminUserId: string) {
    if (!fileContent) {
      throw new ImportError('File content is required', 400);
    }

    if (fileContent.length > 10 * 1024 * 1024) {
      throw new ImportError('File size exceeds 10MB limit', 413);
    }

    const { tracks, errors } = await importService.parseCSV(fileContent);

    if (tracks.length === 0 && errors.length > 0) {
      throw new ImportError(`CSV parsing failed: ${errors.map((e) => e.message).join('; ')}`, 400);
    }

    return importService.bulkImportTracks(tracks, adminUserId);
  },

  async importJSON(fileContent: string, adminUserId: string) {
    if (!fileContent) {
      throw new ImportError('File content is required', 400);
    }

    if (fileContent.length > 10 * 1024 * 1024) {
      throw new ImportError('File size exceeds 10MB limit', 413);
    }

    const { tracks, errors } = await importService.parseJSON(fileContent);

    if (tracks.length === 0 && errors.length > 0) {
      throw new ImportError(`JSON parsing failed: ${errors.map((e) => e.message).join('; ')}`, 400);
    }

    return importService.bulkImportTracks(tracks, adminUserId);
  },

  getCSVTemplate() {
    return importService.generateCSVTemplate();
  },
};
