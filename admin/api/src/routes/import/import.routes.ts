import { Elysia } from 'elysia';
import { importController, ImportError } from './import.controller';
import { requireAuth } from '@middleware/jwt.middleware';

export const importRoutes = new Elysia({ prefix: '/import' })
  .error({
    IMPORT_ERROR: ImportError,
  })
  .onError(({ error, set }) => {
    if (error instanceof ImportError) {
      set.status = error.statusCode;
      return { error: error.message };
    }
  })
  .get(
    '/csv-template',
    async () => {
      return importController.getCSVTemplate();
    },
    {
      detail: {
        tags: ['Import'],
        summary: 'Get CSV template',
        description: 'Download a CSV template for bulk importing tracks',
      },
    }
  )
  .use(requireAuth)
  .post(
    '/csv',
    async ({ admin, request }) => {
      // Read raw body from request - necessary for text/plain content type
      const buffer = await request.arrayBuffer();
      if (buffer.byteLength === 0) {
        throw new ImportError('File content is required', 400);
      }
      const content = new TextDecoder().decode(buffer);

      if (!content || content.trim() === '') {
        throw new ImportError('File content is required', 400);
      }
      return importController.importCSV(content, admin.adminUserId);
    },
    {
      detail: {
        tags: ['Import'],
        summary: 'Import tracks from CSV',
        description: 'Bulk import tracks from a CSV file',
        security: [{ bearerAuth: [] }],
      },
    }
  )
  .post(
    '/json',
    async ({ admin, request }) => {
      // Read raw body from request - necessary for text/plain content type
      const buffer = await request.arrayBuffer();
      if (buffer.byteLength === 0) {
        throw new ImportError('File content is required', 400);
      }
      const content = new TextDecoder().decode(buffer);

      if (!content || content.trim() === '') {
        throw new ImportError('File content is required', 400);
      }
      return importController.importJSON(content, admin.adminUserId);
    },
    {
      detail: {
        tags: ['Import'],
        summary: 'Import tracks from JSON',
        description: 'Bulk import tracks from a JSON file',
        security: [{ bearerAuth: [] }],
      },
    }
  );
