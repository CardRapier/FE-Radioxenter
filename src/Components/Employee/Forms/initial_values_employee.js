import moment from "moment";

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
  celular_usuario: "",
  cod_sexo: 1,
  cod_tipo_documento: 1,
  cod_ciudad: 1,
  cod_tipo_pref_entrega: 1,
};
