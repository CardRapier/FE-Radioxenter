import * as yup from "yup";

export const entity_schema = yup.object({
  razon_social_entidad: yup.string().required("Campo requerido"),
  nombre_comercial_entidad: yup.string().required("Campo requerido"),
  nit_entidad: yup.string().required("Campo requerido"),
  direccion_entidad: yup.string().required("Campo requerido"),
  telefono_entidad: yup.string().required("Campo requerido"),
  nombre_representante: yup.string().required("Campo requerido"),
  cedula_representante: yup
    .number()
    .integer("Debe ser un numero entero")
    .required("Campo requerido")
    .positive("Debe ser positivo"),
  telefono_representante: yup.string().required("Campo requerido"),
  correo_representante: yup
    .string()
    .email("Debe ser un correo")
    .required("Campo requerido"),
  nombre_contacto: yup.string(),
  cedula_contacto: yup
    .number()
    .integer("Debe ser un numero entero")
    .positive("Debe ser positivo")
    .nullable(),
  telefono_contacto: yup.string(),
  correo_contacto: yup.string().email("Debe ser un correo"),
  cod_forma_de_pago_entidad: yup.number().required("Campo requerido"),
  cod_tipo_facturacion: yup.number().required("Campo requerido"),
});

export const service_schema = yup.object({
  nombre_servicio: yup.string().required("Campo requerido"),
  descripcion_servicio: yup.string().required("Campo requerido"),
  precio_servicio: yup
    .number()
    .required("Campo requerido")
    .min(1000, "Debe ser igual o mayor a 1000")
    .typeError("Debe ser un numero")
    .integer("Debe ser un numero entero"),
  iva_servicio: yup
    .number()
    .required("Campo requerido")
    .min(0, "Debe ser igual o mayor a 0")
    .max(100, "Debe ser menor o igual a 100")
    .typeError("Debe ser un numero")
    .integer("Debe ser un numero entero"),
});

export const package_schema = yup.object({
  nombre_paquete: yup.string().required("Campo requerido"),
  precio_paquete: yup
    .number()
    .required("Campo requerido")
    .min(1000, "Debe ser igual o mayor a 1000")
    .typeError("Debe ser un numero")
    .integer("Debe ser un numero entero"),
  servicios: yup.array().of(yup.number()).required("Campo requerido"),
});

export const agreements_schema = yup.object({
  fecha_inicial_convenio: yup.date(),
  fecha_final_convenio: yup
    .date()
    .when(
      "fecha_inicial_convenio",
      (fecha_inicial_convenio, yup) =>
        fecha_inicial_convenio &&
        yup.min(
          fecha_inicial_convenio,
          "La fecha final debe ser despues de la inicial"
        )
    ),
  cod_servicios: yup.array().of(yup.number()).required("Campo requerido"),
  precios_servicios: yup
    .array()
    .of(
      yup
        .number()
        .required("Campo requerido")
        .min(1000, "Debe ser igual o mayor a 1000")
        .integer("Debe ser un numero entero")
    )
    .required("Campo requerido"),
});

export const agreement_schema = yup.object({
  valor_servicio: yup
    .number()
    .required("Campo requerido")
    .min(1000, "Debe ser igual o mayor a 1000")
    .typeError("Debe ser un numero")
    .integer("Debe ser un numero entero"),
  fecha_inicial_convenio: yup.date(),
  fecha_final_convenio: yup
    .date()
    .when(
      "fecha_inicial_convenio",
      (fecha_inicial_convenio, yup) =>
        fecha_inicial_convenio &&
        yup.min(
          fecha_inicial_convenio,
          "La fecha final debe ser despues de la inicial"
        )
    ),
});

export const doctor_schema = yup.object({
  nombres_doctor: yup.string().required("Campo requerido"),
  apellidos_doctor: yup.string().required("Campo requerido"),
  direccion_doctor: yup.string().required("Campo requerido"),
  telefono_doctor: yup.string().required("Campo requerido"),
  documento_doctor: yup
    .number()
    .integer("Debe ser un numero entero")
    .required("Campo requerido")
    .positive("Debe ser positivo"),
  correo_doctor: yup
    .string()
    .email("Debe ser un correo")
    .required("El correo es requerido"),
});

export const employee_schema = yup.object({
  nombres_empleado: yup.string().required("Campo requerido"),
  apellidos_empleado: yup.string().required("Campo requerido"),
  documento_empleado: yup
    .number()
    .integer("Debe ser un numero entero")
    .required("Campo requerido")
    .positive("Debe ser positivo"),
  direccion_empleado: yup.string().required("Campo requerido"),
  correo_empleado: yup
    .string()
    .email("Debe ser un correo")
    .required("El correo es requerido"),
  fnacimiento_empleado: yup.date(),
  telefono_empleado: yup.string().required("Campo requerido"),
  usuario_empleado: yup.string().required("Campo requerido"),
});
