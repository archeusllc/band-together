import { PrismaClient } from '../../config/prisma';

const prisma = PrismaClient;

export interface CreateTagInput {
  category: string;
  value: string;
}

export const tagsService = {
  async create(data: CreateTagInput) {
    return prisma.tag.create({
      data,
    });
  },

  async getById(tagId: string) {
    return prisma.tag.findUnique({
      where: { tagId },
      include: {
        tracks: true,
      },
    });
  },

  async listByCategory(category?: string) {
    const where = category ? { category } : {};

    const tags = await prisma.tag.findMany({
      where,
      include: {
        _count: {
          select: { tracks: true },
        },
      },
      orderBy: [{ category: 'asc' }, { value: 'asc' }],
    });

    if (!category) {
      // Group by category
      const grouped: Record<string, typeof tags> = {};
      tags.forEach((tag) => {
        if (!grouped[tag.category]) {
          grouped[tag.category] = [];
        }
        grouped[tag.category].push(tag);
      });
      return grouped;
    }

    return tags;
  },

  async listAll() {
    return prisma.tag.findMany({
      include: {
        _count: {
          select: { tracks: true },
        },
      },
      orderBy: [{ category: 'asc' }, { value: 'asc' }],
    });
  },

  async delete(tagId: string) {
    return prisma.tag.delete({
      where: { tagId },
    });
  },

  async getCategories() {
    const tags = await prisma.tag.findMany({
      select: { category: true },
      distinct: ['category'],
      orderBy: { category: 'asc' },
    });

    return tags.map((t) => t.category);
  },
};
