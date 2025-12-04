import { z } from 'zod';

export const moduleSchema = z.object({
  title: z.string().min(2, 'El título es obligatorio'),
  type: z.enum(['AUDIO', 'VIDEO', 'IMAGE']),
  url: z
    .string()
    .min(2, 'Deben ser 2 o más caracteres')
    .regex(
      /^[a-z0-9/\-_]+$/,
      'Solo se permiten letras minúsculas, números, guiones y barras.',
    ),
  bgColor: z
    .string()
    .min(3, 'Color inválido en formato HEX.')
    .regex(
      /^(?:[A-Fa-f0-9]{3}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/,
      'Color inválido en formato HEX.',
    ),
});

export type ModuleBody = z.infer<typeof moduleSchema>;
