import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { REGEX } from '@/lib';
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useLogin } from '@/hooks';

export const Login = () => {
  const formSchema = z.object({
    username: z
      .string()
      .regex(REGEX.USERNAME, 'Nombre de usuario inválido o inexistente.'),
    password: z
      .string()
      .regex(REGEX.PASSWORD, 'Contraseña inválida o incorrecta.'),
  });

  const login = useLogin();

  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: (values) => {
      login.mutate(values.value);
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-full max-w-md border-border">
        <CardHeader>
          <div className="bg-black/90 py-4 flex justify-center rounded-md mb-4">
            <img className="w-42" draggable={false} src="/logo.png" alt="" />
          </div>
          <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
          <CardDescription>
            Administrador de Intranet de Seguridad de la Información
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            id="login"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field
                name="username"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Usuario</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur} // cuando pierde el foco para validar
                        onChange={(e) => field.handleChange(e.target.value)}
                        // TODO: pendiente disabled
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Contraseña</FieldLabel>
                      <div className="relative">
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur} // cuando pierde el foco para validar
                          onChange={(e) => field.handleChange(e.target.value)}
                          type={showPassword ? 'text' : 'password'}
                          autoComplete="password"
                          placeholder="••••••••"
                          className="pr-10"
                          // TODO: pendiente disabled
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 -translate-y-1/2"
                          onClick={() => setShowPassword((v) => !v)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
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

        <CardFooter className="flex flex-col gap-4">
          <Field orientation="horizontal">
            <Button
              form="login"
              type="submit"
              className="w-full"
              // add disabled
            >
              {/* TODO: add spinner when loading login */}
              Entrar
            </Button>
          </Field>
          <div className="text-center text-sm text-muted-foreground">
            ¿Olvidaste tu contraseña? Contacta al administrador.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
