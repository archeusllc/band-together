import { defineConfig } from 'prisma/config';

const {
  DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/band_together'
} = process.env;

export default defineConfig({
  datasource: {
    url: DATABASE_URL,
  },
});
