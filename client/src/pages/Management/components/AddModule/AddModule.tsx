import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from '@tanstack/react-form';
import z from 'zod';

export const AddModule = ({
  setShowAddModule,
}: {
  setShowAddModule: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const formSchema = z.object({
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
    bgImage: z
      .instanceof(File)
      .refine(
        (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
        'El archivo debe ser una imagen (jpg, png, webp)',
      )
      .nullable(),
    logo: z
      .instanceof(File)
      .refine(
        (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
        'El archivo debe ser una imagen (jpg, png, webp)',
      )
      .nullable(),
  });

  const form = useForm({
    defaultValues: {
      title: '',
      type: 'VIDEO',
      url: '',
      bgColor: '',
      bgImage: null as File | null,
      logo: null as File | null,
    },
    validators: {
      onSubmit: formSchema,
    },
  });

  return (
    <Card className="rounded-md">
      <CardHeader>
        <CardTitle>Agregar Módulo</CardTitle>
        <CardDescription>
          Crea un nuevo módulo para la intranet.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="add-module"
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
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="type"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Tipo de Módulo</FieldLabel>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger id={field.name}>
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="AUDIO">
                            Audios / Podcast
                          </SelectItem>
                          <SelectItem value="VIDEO">Videos</SelectItem>
                          <SelectItem value="IMAGE">Imágenes</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                );
              }}
            />
            <form.Field
              name="url"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>URL</FieldLabel>
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onKeyDown={(e) =>
                          e.code === 'Space' && e.preventDefault()
                        }
                        className="pl-38"
                      />
                      <p className="absolute left-2 top-1/2 -translate-y-1/2 select-none">
                        http://example.com/
                      </p>
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="bgColor"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Color de Fondo</FieldLabel>
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onKeyDown={(e) =>
                          e.code === 'Space' && e.preventDefault()
                        }
                        className="pl-5"
                      />
                      <p className="absolute left-2 top-1/2 -translate-y-1/2 select-none">
                        #
                      </p>
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="bgImage"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Imagen de Fondo (Opcional)
                    </FieldLabel>
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
            <form.Field
              name="logo"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Logo de Módulo (Opcional)
                    </FieldLabel>
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
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <div className="flex gap-2 w-full">
          <Button
            type="button"
            variant="secondary"
            form="add-module"
            className="w-1/2 cursor-pointer"
            onClick={() => setShowAddModule(false)}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            form="add-module"
            className="w-1/2 cursor-pointer"
          >
            Guardar
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
