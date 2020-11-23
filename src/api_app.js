import axios from "axios";

export const api_login = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/login/",
});

export const api_register = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/register/",
});

export const api_services = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/servicios/",
  headers: { "auth-token": localStorage.getItem("token") },
});
export const api_packages = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/paquetes/",
  headers: { "auth-token": localStorage.getItem("token") },
});
export const api_entities = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/entidades/",
  headers: { "auth-token": localStorage.getItem("token") },
});
export const api_type_receipt = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/tipoFacturaciones/",
  headers: { "auth-token": localStorage.getItem("token") },
});
export const api_type_document = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/tipoDocumentos/",
  headers: { "auth-token": localStorage.getItem("token") },
});

export const api_type_shipment = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/tipoPrefEntrega/",
  headers: { "auth-token": localStorage.getItem("token") },
});

export const api_type_employee = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/tipoEmpleados/",
  headers: { "auth-token": localStorage.getItem("token") },
});

export const api_users = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/usuarios/",
  headers: { "auth-token": localStorage.getItem("token") },
});

export const api_sex = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/sexos/",
  headers: { "auth-token": localStorage.getItem("token") },
});

export const api_cities = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/ciudades/",
  headers: { "auth-token": localStorage.getItem("token") },
});

export const api_period_payments = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/formaDePagoEntidad/",
  headers: { "auth-token": localStorage.getItem("token") },
});

export const api_employees = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/empleado/",
  headers: { "auth-token": localStorage.getItem("token") },
});

export const api_doctors = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/doctores/",
  headers: { "auth-token": localStorage.getItem("token") },
});

export const api_agreements = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/convenios/",
  headers: { "auth-token": localStorage.getItem("token") },
});
