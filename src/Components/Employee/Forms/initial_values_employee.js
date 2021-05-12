import moment from "moment";

export let user_initial_values = {
  nombres_usuario: "",
  apellidos_usuario: "",
  telefono_usuario: "",
  direccion_usuario: "",
  documento_usuario: "",
  ocupacion_usuario: "",
  fecha_nacimiento_usuario: moment(),
  correo_usuario: "",
  genero_usuario: "",
  tutor: false,
  celular_usuario: "",
  cod_sexo: 1,
  cod_tipo_documento: 1,
  cod_departamento: 1,
  cod_ciudad: 1,
  cod_tipo_pref_entrega: 1,
  esNuevo: true,
};

export const tutor_initial_values = {
  nombres_tutor: "",
  apellidos_tutor: "",
  documento_tutor: "",
  cod_tipo_documento: 1,
  parentesco_tutor: "",
};

export const receipt_initial_values = {
  service: null,
  doctor: null,
  entity: null,
  tipo_compra: "Servicio",
  fecha_transaccion: moment(),
  cod_entidad_doctor: 0,
  servicios: [],
  consentimiento: {},
  paga_cliente: false,
  forma_de_pago: "Efectivo",
};

export const satisfaction_initial_values = {
  experiencia_satisfaccion: "1",
  ubicacion_satisfaccion: "1",
  recomendacion_satifasfaccion: "1",
  privacidad_satisfaccion: "1",
  indicacion_satisfaccion: "1",
  amabilidad_atencion_satisfaccion: "1",
  amabilidad_radiologo_satisfaccion: "1",
  presentacion_satisfaccion: "1",
  tiempo_espera_satisfaccion: "1",
  tiempo_entrega_satisfaccion: "1",
  entrega_recomendacion_satisfaccion: false,
  sugerencias_satisfaccion: "",
};
