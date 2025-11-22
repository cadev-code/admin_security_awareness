// Expresiones regulares para validación
export const REGEX = {
  USERNAME: /^[a-z0-9.@-]{4,}$/,
  PASSWORD: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&*]).{8,}$/,
} as const;
