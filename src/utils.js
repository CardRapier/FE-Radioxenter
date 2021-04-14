const give_error_message = (error) => {
  let error_message = ``;
  if (error.status === 422) {
    if (error.data.error.split('"').length === 2) {
      error_message = `Ha ocurrido un error con ${
        error.data.error.split('"')[1]
      }, intente de nuevo.`;
    } else {
      error_message = error.data.error;
    }
  } else {
    error_message = error.data.error;
  }
  return error_message;
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

const remove_abbreviations = (services, abbreviations) => {
  let new_services = services;

  for (let i in services) {
    for (let j in abbreviations) {
      new_services[i].nombre_servicio = new_services[i].nombre_servicio.replace(
        abbreviations[j],
        ""
      );
    }
  }

  return new_services;
};

const remove_abbreviations_ofString = (text, abbreviations) => {
  for (let i in abbreviations) {
    text = text.split(abbreviations[i]).join("");
  }
  return text;
};

const omitPropertyFromJson = (obj, props) => {
  let clone = Object.assign({}, obj);
  for (let i in props) {
    let name = `${props[i]}`;
    delete clone[name];
  }

  return clone;
};

export {
  give_error_message,
  remove_abbreviation,
  remove_abbreviations,
  remove_abbreviations_ofString,
  omitPropertyFromJson,
};
