import { BrowserRouter, Route, Switch } from "react-router-dom";

import Employee from "./Components/Worker/Employee";
import Login from "./Components/Login";
import React from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/Empleado" component={Employee} />
          <Route exact path="/" component={Login} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
