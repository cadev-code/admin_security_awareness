import z from 'zod';

export const videoSchema = z.object({
  title: z.string().min(2, 'El título es obligatorio'),
  availability: z
    .string()
    .regex(
      /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
      'La fecha debe tener el formato YYYY-MM-DD',
    ),
  examUrl: z.string(),
  idModule: z
    .string()
    .transform((val) => Number(val))
    .refine((num) => Number.isInteger(num) && num > 0, {
      message: 'idModule debe ser un número entero válido',
    }),
});

export type VideoBody = z.infer<typeof videoSchema>;

export const videoQuerySchema = z.object({
  idModule: z
    .string({ message: 'idModule es un campo obligatorio' })
    .transform((val) => Number(val))
    .refine((num) => Number.isInteger(num) && num > 0, {
      message: 'idModule debe ser un número entero válido',
    }),
});

export type VideoQuery = z.infer<typeof videoQuerySchema>;
