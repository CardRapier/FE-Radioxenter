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
  doctores_entidad: [],
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
  nom_entidad: "",
  nom_servicio: "",
  valor_servicio: 0,
  fecha_inicial_convenio: moment(),
  fecha_final_convenio: moment(),
};

export const agreements_initial_values = {
  cod_entidad: "",
  fecha_inicial_convenio: moment(),
  fecha_final_convenio: moment(),
  cod_servicios: [],
  precios_servicios: [],
};

export const doctor_initial_values = {
  nombres_doctor: "",
  apellidos_doctor: "",
  direccion_doctor: "",
  telefono_doctor: "",
  documento_doctor: "",
  cod_tipo_documento: 1,
  cod_tipo_pref_entrega: 1,
  correo_doctor: "",
  esParticular: false,
  cod_departamento: 1,
  cod_ciudad: 1,
};

export const employee_initial_values = {
  nombres_empleado: "",
  apellidos_empleado: "",
  cod_tipo_documento: 1,
  documento_empleado: "",
  direccion_empleado: "",
  correo_empleado: "",
  fnacimiento_empleado: moment(),
  telefono_empleado: "",
  usuario_empleado: "",
  cod_tipo_empleado: 1,
  contrasenia_empleado: "",
};

export const enumeration_initial_values = {
  cod_numeracion: 0,
  numeracion_siglas: "",
  numeracion_nombre: "",
  numeracion_inicial: 0,
  numeracion_final: 0,
  numeracion_aumento: 0,
  numeracion_actual: 0,
};
