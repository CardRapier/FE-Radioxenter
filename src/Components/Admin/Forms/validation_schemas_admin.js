import * as yup from "yup";

export const entity_schema = yup.object({
  razon_social_entidad: yup.string().trim().required("Campo requerido"),
  nombre_comercial_entidad: yup.string().trim().required("Campo requerido"),
  nit_entidad: yup.string().trim().required("Campo requerido"),
  direccion_entidad: yup.string().trim().required("Campo requerido"),
  telefono_entidad: yup.string().trim().required("Campo requerido"),
  nombre_representante: yup.string().trim().required("Campo requerido"),
  cedula_representante: yup
    .number()
    .integer("Debe ser un numero entero")
    .required("Campo requerido")
    .positive("Debe ser positivo"),
  telefono_representante: yup.string().trim().required("Campo requerido"),
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
  nombre_servicio: yup.string().trim().required("Campo requerido"),
  descripcion_servicio: yup.string(),
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
  nombre_paquete: yup.string().trim().required("Campo requerido"),
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
          "La fecha final debe ser después de la inicial"
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
          "La fecha final debe ser después de la inicial"
        )
    ),
});

export const doctor_schema = yup.object({
  nombres_doctor: yup.string().trim().required("Campo requerido"),
  apellidos_doctor: yup.string().trim().required("Campo requerido"),
  direccion_doctor: yup.string().trim(),
  telefono_doctor: yup.string().trim(),
  documento_doctor: yup
    .number()
    .integer("Debe ser un numero entero")
    .positive("Debe ser positivo"),
  correo_doctor: yup
    .string()
    .email("Debe ser un correo")
    .required("El correo es requerido"),
});

export const employee_schema = yup.object({
  nombres_empleado: yup.string().trim().required("Campo requerido"),
  apellidos_empleado: yup.string().trim().required("Campo requerido"),
  documento_empleado: yup
    .number()
    .integer("Debe ser un numero entero")
    .required("Campo requerido")
    .positive("Debe ser positivo"),
  direccion_empleado: yup.string().trim().required("Campo requerido"),
  correo_empleado: yup
    .string()
    .email("Debe ser un correo")
    .required("El correo es requerido"),
  fnacimiento_empleado: yup.date(),
  telefono_empleado: yup.string().trim().required("Campo requerido"),
  usuario_empleado: yup.string().trim().required("Campo requerido"),
});

const enumeration_schema = yup.object({
  numeracion_inicial: yup
    .number()
    .integer("Debe ser un numero entero")
    .required("Campo requerido")
    .positive("Debe ser positivo"),
  numeracion_final: yup
    .number()
    .integer("Debe ser un numero entero")
    .required("Campo requerido")
    .positive("Debe ser positivo")
    .when(
      "numeracion_inicial",
      (numeracion_inicial, yup) =>
        numeracion_inicial &&
        yup.min(
          numeracion_inicial,
          "La numeracion final debe ser un numero mayor a la inicial"
        )
    ),
  numeracion_aumento: yup
    .number()
    .integer("Debe ser un numero entero")
    .required("Campo requerido")
    .positive("Debe ser positivo")
    .when(
      "numeracion_final",
      (numeracion_final, yup) =>
        numeracion_final &&
        yup.max(
          numeracion_final - 1,
          "El aumento debe ser menor a la numeracion final"
        )
    ),
  numeracion_actual: yup
    .number()
    .integer("Debe ser un numero entero")
    .required("Campo requerido")
    .positive("Debe ser positivo"),
});

export const enumerations_schema = yup.object({
  formA: enumeration_schema,
  formB: enumeration_schema,
  formC: enumeration_schema,
  formD: enumeration_schema,
});
