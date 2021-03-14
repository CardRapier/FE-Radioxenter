import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Admin from "./Components/Admin/Admin";
import Employee from "./Components/Employee/Employee";
import Login from "./Components/Login";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import React from "react";
import { SnackbarProvider } from "notistack";
import Waves from "./Waves";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <ProtectedRoute path="/Empleado" component={Employee} />
          <ProtectedRoute path="/Administrador" component={Admin} />
        </Switch>
      </BrowserRouter>
      <Waves />
    </SnackbarProvider>
  );
}

export default App;
