import { z } from "zod";
import structuredFields from "./structured_fields_uphill_small.json";


const defaultFields = {
  claim_id: z.string().nullable(),
  claim: z.string(),
  veracity_explanation: z.string().nullable(),
  subjects: z.string().nullable(),
  date_published: z.string().nullable(),
  source_db: z.string().nullable(),
  fact_checkers: z.string().nullable(),
  main_text: z.string().nullable(),
  sources: z.string().nullable(),
  query_with_presupposition: z.string(),
  response_num: z.number().nullable(),
  query_response_id: z.string().nullable(),
  model_response: z.string().nullable(),
  prediction_reasoning: z.string().nullable(),
};

const dimensionFields = structuredFields.reduce((schema, field) => {
  return {
    ...schema,
    [field.name]: z.string(),
  };
}, {});

export const paperSchema = z.object({
  ...defaultFields, // Basic fields for each paper
  ...dimensionFields, // All dimensions
});

export type Paper = z.infer<typeof paperSchema>;

export const groupedFieldsByCategory: Record<
  string,
  (typeof structuredFields)[number][]
> = {};

structuredFields.forEach((field) => {
  if (groupedFieldsByCategory[field.category]) {
    groupedFieldsByCategory[field.category].push(field);
  } else {
    groupedFieldsByCategory[field.category] = [field];
  }
});
