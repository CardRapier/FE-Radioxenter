import * as yup from "yup";

export const user_schema = yup.object({
  nombres_usuario: yup.string().trim().required("Campo requerido"),
  apellidos_usuario: yup.string().trim().required("Campo requerido"),
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
  nombres_tutor: yup.string().trim().required("Campo requerido"),
  apellidos_tutor: yup.string().trim().required("Campo requerido"),
  documento_tutor: yup
    .number()
    .integer("Debe ser un numero entero")
    .required("Campo requerido")
    .positive("Debe ser positivo"),
});

export const report_schema = yup.object({
  fecha_inicial: yup.date(),
  fecha_final: yup
    .date()
    .when(
      "fecha_inicial",
      (fecha_inicial, yup) =>
        fecha_inicial &&
        yup.min(fecha_inicial, "La fecha final debe ser después de la inicial")
    ),
});
