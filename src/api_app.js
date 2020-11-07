import axios from "axios";

export const api_services = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/servicios/",
});
export const api_packages = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/paquetes/",
});
export const api_entities = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/entidades/",
});
export const api_type_receipt = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/tipoFacturaciones",
});
export const api_type_document = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/tipoDocumentos/",
});

export const api_type_shipment = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/tipoPrefEntrega/",
});

export const api_type_employee = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/tipoEmpleados/",
});

export const api_users = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE + "/api/usuarios/",
});
