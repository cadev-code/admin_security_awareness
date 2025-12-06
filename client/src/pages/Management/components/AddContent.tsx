import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useCreateVideo } from '@/hooks';
import { useForm } from '@tanstack/react-form';
import z from 'zod';

export const AddContent = ({
  idModule,
  type,
  closeForm,
}: {
  idModule: number;
  type: 'VIDEO' | 'AUDIO' | 'IMAGE';
  closeForm: () => void;
}) => {
  const allowedFileTypes = {
    VIDEO: ['video/mp4', 'video/webm'],
    AUDIO: ['audio/mp3', 'audio/wav'],
    IMAGE: ['image/jpeg', 'image/png', 'image/webp'],
  };

  const formSchema = z.object({
    title: z.string().min(2, 'El título es obligatorio'),
    file: z
      .instanceof(File, { message: 'El archivo es obligatorio' })
      .refine(
        (file) => allowedFileTypes[type].includes(file.type),
        `El archivo debe ser en alguno de los siguientes formatos: ${allowedFileTypes[type].join(', ')}`,
      ),
    availability: z
      .string()
      .regex(
        /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
        'La fecha debe tener el formato YYYY-MM-DD',
      ),
    examUrl: z.string().startsWith('http', 'No es una URL válida'),
    cover: z
      .instanceof(File)
      .refine(
        (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
        'El archivo debe ser una imagen (jpg, png, webp)',
      )
      .nullable(),
  });

  const today = new Date();

  const createVideo = useCreateVideo(closeForm);

  const form = useForm({
    defaultValues: {
      title: '',
      file: null as File | null,
      availability: `${today.getFullYear()}-${`${today.getMonth() + 1}`.padStart(2, '0')}-${`${today.getDate()}`.padStart(2, '0')}`,
      examUrl: '',
      cover: null as File | null,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: (values) => {
      createVideo.mutate({ idModule, ...values.value });
    },
  });

  return (
    <div className="space-y-4">
      <form
        id="add-content"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field
            name="title"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Título</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="file"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Archivo</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="file"
                    accept={allowedFileTypes[type].join(',')}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(e.target.files?.[0] ?? null)
                    }
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="availability"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Fecha de Lanzamiento
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="date"
                    value={field.state.value}
                    accept={allowedFileTypes[type].join(',')}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="examUrl"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>URL de Examen</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          {type !== 'AUDIO' && (
            <form.Field
              name="cover"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Cover</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(e.target.files?.[0] ?? null)
                      }
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          )}
        </FieldGroup>
      </form>
      <div className="space-x-2">
        <Button
          variant="secondary"
          className="cursor-pointer"
          onClick={closeForm}
        >
          Cancelar
        </Button>
        <Button type="submit" className="cursor-pointer" form="add-content">
          Guardar
        </Button>
      </div>
    </div>
  );
};
