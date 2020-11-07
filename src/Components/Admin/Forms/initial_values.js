import moment from "moment";

export const entity_initial_values = {
  razon_social_entidad: "",
  nombre_comercial_entidad: "",
  nit_entidad: "",
  direccion_entidad: "",
  telefono_entidad: "",
  nombre_representante: "",
  cedula_representante: "",
  telefono_representante: "",
  correo_representante: "",
  nombre_contacto: "",
  cedula_contacto: "",
  telefono_contacto: "",
  correo_contacto: "",
  cod_forma_de_pago_entidad: 1,
  cod_tipo_facturacion: 1,
};

export const service_initial_values = {
  nombre_servicio: "",
  descripcion_servicio: "",
  precio_servicio: "",
  iva_servicio: "",
};

export const package_initial_values = {
  nombre_paquete: "",
  precio_paquete: "",
  servicios: [],
};

export const agreement_initial_values = {
  cod_entidad: "",
  fecha_inicial_convenio: moment(),
  fecha_final_convenio: moment(),
  cod_servicios: [],
  precios_servicios: [],
};

export const doctor_initial_values = {};

export const employee_initial_values = {};
