const data = {
  props: {
    services: {
      title: "Servicios",
      link: "/Administrador/CrearServicio",
      filter: { id: "nombre_servicio", label: "Nombre" },
      header: ["Nombre", "Precio", "Iva"],
      actions: [{ name: "Editar", action: "/Administrador/EditarServicio" }],
    },
    packages: {
      title: "Paquetes",
      link: "/Administrador/CrearPaquete",
      filter: { id: "nombre_paquete", label: "Nombre" },
      header: ["Nombre", "Precio"],
      actions: [{ name: "Editar", action: "/Administrador/EditarPaquete" }],
    },
    entities: {
      title: "Entidades",
      link: "/Administrador/CrearEntidad",
      filter: { id: "nombre_comercial_entidad", label: "Nombre Comercial" },
      header: [
        "Razon Social",
        "Nombre Comercial",
        "NIT",
        "Direccion",
        "Telefono",
      ],
      actions: [
        { name: "Editar", action: "/Administrador/EditarEntidad" },
        { name: "Facturar", action: "/Administrador/FacturarEntidad" },
      ],
      additional_actions: true,
    },
    agreements: {
      title: "Convenios",
      link: "/Administrador/CrearConvenio",
      filter: { id: "razon_social_entidad", label: "Entidad" },
      header: ["Entidad", "Convenios"],
      actions: [{ name: "Editar", action: "/Administrador/EditarConvenios" }],
    },

    employees: {
      title: "Empleados",
      link: "/Administrador/CrearEmpleado",
      filter: { id: "documento_empleado", label: "Documento" },
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
      filter: { id: "nombres_doctor", label: "Nombre" },
      header: ["Nombre", "Telefono", "Correo"],
      actions: [{ name: "Editar", action: "/Administrador/EditarDoctor" }],
    },
  },
};

export default data;
