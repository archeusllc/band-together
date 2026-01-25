import { Elysia } from 'elysia';
import { tagsController, TagError } from './tags.controller';
import { requireAuth } from '@middleware/jwt.middleware';

export const tagsRoutes = new Elysia({ prefix: '/tags' })
  .error({
    TAG_ERROR: TagError,
  })
  .onError(({ code, error, set }) => {
    if (error instanceof TagError) {
      set.status = error.statusCode;
      return { error: error.message };
    }
  })
  .use(requireAuth)
  .get(
    '/',
    async ({ query }) => {
      const category = (query as any)?.category;
      return tagsController.listByCategory(category);
    },
    {
      detail: {
        tags: ['Tags'],
        summary: 'List tags',
        description: 'Get all tags, optionally grouped by category',
        security: [{ bearerAuth: [] }],
      },
    }
  )
  .post(
    '/',
    async ({ body }) => {
      return tagsController.create(body as any);
    },
    {
      detail: {
        tags: ['Tags'],
        summary: 'Create new tag',
        description: 'Create a new tag with category and value',
        security: [{ bearerAuth: [] }],
      },
    }
  )
  .delete(
    '/:tagId',
    async ({ params }) => {
      return tagsController.delete(params.tagId);
    },
    {
      detail: {
        tags: ['Tags'],
        summary: 'Delete tag',
        description: 'Delete a tag by ID',
        security: [{ bearerAuth: [] }],
      },
    }
  )
  .get(
    '/categories/list',
    async () => {
      return tagsController.getCategories();
    },
    {
      detail: {
        tags: ['Tags'],
        summary: 'Get tag categories',
        description: 'Get distinct list of tag categories',
        security: [{ bearerAuth: [] }],
      },
    }
  );
