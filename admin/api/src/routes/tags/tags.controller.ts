import { tagsService } from './tags.service';

export class TagError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = 'TagError';
  }
}

export const tagsController = {
  async create(data: any) {
    if (!data.category || typeof data.category !== 'string') {
      throw new TagError('Category is required and must be a string', 400);
    }
    if (!data.value || typeof data.value !== 'string') {
      throw new TagError('Value is required and must be a string', 400);
    }

    return tagsService.create({
      category: data.category.trim(),
      value: data.value.trim(),
    });
  },

  async getById(tagId: string) {
    if (!tagId) {
      throw new TagError('Tag ID is required', 400);
    }

    const tag = await tagsService.getById(tagId);
    if (!tag) {
      throw new TagError('Tag not found', 404);
    }

    return tag;
  },

  async listByCategory(category?: string) {
    return tagsService.listByCategory(category);
  },

  async listAll() {
    return tagsService.listAll();
  },

  async delete(tagId: string) {
    if (!tagId) {
      throw new TagError('Tag ID is required', 400);
    }

    const tag = await tagsService.getById(tagId);
    if (!tag) {
      throw new TagError('Tag not found', 404);
    }

    return tagsService.delete(tagId);
  },

  async getCategories() {
    return tagsService.getCategories();
  },
};
