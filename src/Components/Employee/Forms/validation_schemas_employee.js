import * as yup from "yup";

export const user_schema = yup.object({
  documento_usuario: yup
    .number()
    .integer("Debe ser un numero entero")
    .required("Campo requerido")
    .positive("Debe ser positivo"),
  correo_usuario: yup
    .string()
    .email("Debe ser un correo")
    .required("El correo es requerido"),
  fecha_nacimiento_usuario: yup.date(),
});

export const tutor_schema = yup.object({
  documento_tutor: yup
    .number()
    .integer("Debe ser un numero entero")
    .required("Campo requerido")
    .positive("Debe ser positivo"),
});
