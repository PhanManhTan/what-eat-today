import { z } from 'zod';

export const DataSourceTypeSchema = z.enum([
  'usda_fooddata_central',
  'vietnam_nin',
  'open_food_facts',
  'user_manual',
]);

export type DataSourceType = z.infer<typeof DataSourceTypeSchema>;

export const DataProvenanceSchema = z.object({
  source: DataSourceTypeSchema,
  sourceId: z.string().optional(),
  license: z.string(),
  referenceUrl: z.string().url().optional(),
  verifiedAt: z.string().datetime().optional(),
});

export type DataProvenance = z.infer<typeof DataProvenanceSchema>;
