class Auth {
  constructor() {
    if (localStorage.getItem("authenticated") === undefined) {
      localStorage.setItem("authenticated", false);
    }
  }

  login(callback, data) {
    this.authenticated = true;
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);

    if (data.user.cod_tipo_empleado === 1) {
      localStorage.setItem("redirect", "/Empleado");
    } else {
      localStorage.setItem("redirect", "/Administrador");
    }

    localStorage.setItem("authenticated", true);
    callback();
  }

  logout(callback) {
    localStorage.clear();
    localStorage.setItem("authenticated", false);
    callback();
  }
}

export default new Auth();
