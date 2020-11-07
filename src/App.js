import { BrowserRouter, Route, Switch } from "react-router-dom";

import Admin from "./Components/Admin/Admin";
import Employee from "./Components/Worker/Employee";
import Login from "./Components/Login";
import React from "react";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <Switch>
          <Route path="/Empleado" component={Employee} />
          <Route path="/Administrador" component={Admin} />
          <Route exact path="/" component={Login} />
        </Switch>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
