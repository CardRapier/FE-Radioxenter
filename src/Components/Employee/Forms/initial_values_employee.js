import moment from "moment";

//TODO: DOCUMENT STRING
export const user_initial_values = {
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
};
