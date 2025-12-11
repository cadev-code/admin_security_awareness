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
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Module as ModuleType } from '@/types';
import { useForm } from '@tanstack/react-form';
import z from 'zod';

export const EditModule = ({
  module,
  closeForm,
}: {
  module: ModuleType;
  closeForm: () => void;
}) => {
  const formSchema = z.object({
    title: z.string().min(2, 'El título es obligatorio'),
    type: z.string(),
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

  const { title, url, bgColor } = module;

  const form = useForm({
    defaultValues: {
      title,
      url,
      bgColor,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: (values) => {
      console.log(values.value);
    },
  });

  return (
    <Card className="rounded-md">
      <CardHeader>
        <CardTitle>
          Editar Módulo:{' '}
          <span className="bg-gray-200 rounded px-2">{title}</span>
        </CardTitle>
        <CardDescription>
          Modifica la información del módulo seleccionado.
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
            <Field className="grid grid-cols-2 gap-4">
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
            </Field>
            <Field className="grid grid-cols-2 gap-4">
              <form.Field
                name="bgColor"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Color de Fondo
                      </FieldLabel>
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
            </Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <div className="flex gap-2 w-full">
          <Button
            type="button"
            variant="secondary"
            form="add-module"
            className="cursor-pointer"
            onClick={closeForm}
          >
            Cancelar
          </Button>
          <Button type="submit" form="add-module" className="cursor-pointer">
            Actualizar
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
