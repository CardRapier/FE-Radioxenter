const data = {
  "props":
    {
      "services": 
        {
          "title": "Servicios",
          "link": "/Administrador/CrearServicio",
          "filter": {"id": "name", "label": "Nombre"},
          "header": ["Nombre", "Precio", "Iva"], 
          "actions": [{"name": "Editar","action": "/Administrador/EditarServicio"}]
        },
        "packages":
        {
          "title": "Paquetes",
          "link": "/Administrador/CrearPaquete",
          "filter": {"id": "name", "label": "Nombre"},
          "header": ["Nombre", "Precio"], 
          "actions": [{"name": "Editar","action": "/Administrador/EditarPaquete"}]
        }
    }
}

export default data
