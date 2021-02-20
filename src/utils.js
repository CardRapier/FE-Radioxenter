const give_error_message = (error) => {
  return error.status === 422
    ? `Ha ocurrido un error con ${
        error.data.error.split('"')[1]
      }, intente de nuevo.`
    : error.data.error;
};

const remove_abbreviation = (services, abbreviation) => {
  let new_services = services;
  for (let i in services) {
    new_services[i].nombre_servicio = new_services[i].nombre_servicio.replace(
      abbreviation,
      ""
    );
  }
  return new_services;
};

export { give_error_message, remove_abbreviation };
