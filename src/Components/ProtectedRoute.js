import { Redirect, Route } from "react-router-dom";

import React from "react";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("authenticated")) {
          if (
            localStorage.getItem("redirect") === props.match.path &&
            localStorage.getItem("redirect") === "/Empleado"
          ) {
            return <Component {...props} />;
          } else if (localStorage.getItem("redirect") === "/Administrador") {
            return <Component {...props} />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/",
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          }
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
