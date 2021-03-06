import axios from "axios";

const headers = {
  "auth-token": localStorage.getItem("token"),
  "Access-Control-Allow-Credentials": true,
};

export const api_login = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/login/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

export const api_register = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/register/",
  headers: { "Access-Control-Allow-Credentials": true },
});

export const api_services = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/servicios/",
  headers: headers,
});
export const api_packages = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/paquetes/",
  headers: headers,
});
export const api_entities = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/entidades/",
  headers: headers,
});
export const api_type_receipt = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/tipoFacturaciones/",
  headers: headers,
});
export const api_type_payment = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/formaDePagoEntidad/",
  headers: headers,
});
export const api_type_document = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/tipoDocumentos/",
  headers: headers,
});

export const api_type_shipment = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/tipoPrefEntrega/",
  headers: headers,
});

export const api_type_employee = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/tipoEmpleados/",
  headers: headers,
});

export const api_sex = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/sexos/",
  headers: headers,
});

export const api_cities = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/ciudades/",
  headers: headers,
});

export const api_period_payments = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/formaDePagoEntidad/",
  headers: headers,
});

export const api_employees = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/empleados/",
  headers: headers,
});

export const api_doctors = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/doctores/",
  headers: headers,
});

export const api_agreements = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/convenios/",
  headers: headers,
});

export const api_process = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/procesos/",
  headers: headers,
});

export const api_departments = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/departamentos/",
  headers: headers,
});

export const api_doctors_entities = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/entidadDoctor/",
  headers: headers,
});

export const api_users = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/usuarios/",
  headers: headers,
});

export const api_receipts = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/facturas/",
  headers: headers,
});
