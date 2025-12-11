import { z } from 'zod';

const title = z.string().min(2, 'El título es obligatorio');
const url = z
  .string()
  .min(2, 'Deben ser 2 o más caracteres')
  .regex(
    /^[a-z0-9/\-_]+$/,
    'Solo se permiten letras minúsculas, números, guiones y barras.',
  );
const bgColor = z
  .string()
  .min(3, 'Color inválido en formato HEX.')
  .regex(
    /^(?:[A-Fa-f0-9]{3}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/,
    'Color inválido en formato HEX.',
  );

export const moduleAddSchema = z.object({
  title,
  type: z.enum(['AUDIO', 'VIDEO', 'IMAGE']),
  url,
  bgColor,
});

export type ModuleBody = z.infer<typeof moduleAddSchema>;

export const moduleParamSchema = z.object({
  id: z
    .string()
    .transform((val) => Number(val))
    .refine((num) => Number.isInteger(num) && num > 0, {
      message: 'id debe ser un número entero válido',
    }),
});

export type ModuleParam = z.infer<typeof moduleParamSchema>;

export const moduleEditSchema = z.object({
  title,
  url,
  bgColor,
});

export type ModuleEditBody = z.infer<typeof moduleEditSchema>;
