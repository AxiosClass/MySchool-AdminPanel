import { z } from 'zod';

interface INumberGeneratorArgs {
  min?: number;
  max?: number;
  minErrorMessage?: string;
  maxErrorMessage?: string;
}
export const numberGenerator = ({ min, max, minErrorMessage, maxErrorMessage }: INumberGeneratorArgs) => {
  const numberSchema = z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: 'Invalid number' });

  if (min) numberSchema.refine((val) => val > min, { message: minErrorMessage });
  if (max) numberSchema.refine((val) => val > max, { message: maxErrorMessage });

  return numberSchema;
};
