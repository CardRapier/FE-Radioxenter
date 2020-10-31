const data = {
  props: {
    services: {
      title: "Servicios",
      link: "/Administrador/CrearServicio",
      filter: { id: "name", label: "Nombre" },
      header: ["Nombre", "Precio", "Iva"],
      actions: [{ name: "Editar", action: "/Administrador/EditarServicio" }],
    },
    packages: {
      title: "Paquetes",
      link: "/Administrador/CrearPaquete",
      filter: { id: "name", label: "Nombre" },
      header: ["Nombre", "Precio"],
      actions: [{ name: "Editar", action: "/Administrador/EditarPaquete" }],
    },
    entities: {
      title: "Entidades",
      link: "/Administrador/CrearEntidad",
      filter: { id: "name", label: "Nombre" },
      header: [
        "Razon Social",
        "Nombre Comercial",
        "NIT",
        "Direccion",
        "Telefono",
      ],
      actions: [{ name: "Editar", action: "/Administrador/EditarEntidad" }],
    },
    agreements: {
      title: "Convenios",
      link: "/Administrador/CrearConvenio",
      filter: { id: "name", label: "Nombre" },
      header: ["Entidad", "Convenios"],
      actions: [
        { name: "Editar", action: "/Administrador/EditarConvenios" },
        { name: "Facturar", action: "/Administrador/Facturar" },
      ],
    },

    employees: {
      title: "Empleados",
      link: "/Administrador/CrearEmpleado",
      filter: { id: "name", label: "Nombre" },
      header: [
        "Nombre",
        "Documento",
        "Tipo Documento",
        "Usuario",
        "Tipo Empleado",
      ],
      actions: [{ name: "Editar", action: "/Administrador/EditarEmpleado" }],
    },

    doctors: {
      title: "Doctores",
      link: "/Administrador/CrearDoctor",
      filter: { id: "name", label: "Nombre" },
      header: [
        "Nombre",
        "Telefono",
        "Correo",
      ],
      actions: [{ name: "Editar", action: "/Administrador/EditarDoctor" }],
    },
  },
};

export default data;
