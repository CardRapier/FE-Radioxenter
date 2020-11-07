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
    .positive("Debe ser positivo"),
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

export const agreement_schema = yup.object({});

export const doctor_schema = yup.object({})

export const employee_schema = yup.object({})
