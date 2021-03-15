import { Button, Grid, makeStyles } from "@material-ui/core";
import { Field, Form, Formik } from "formik";

import BackDropLoading from "./BackDropLoading";
import React from "react";
import { Redirect } from "react-router-dom";
import TextFormField from "./Form/TextFormField";
import { api_login } from "../api_app";
import auth from "./Auth/auth";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  image: {
    padding: theme.spacing(4, 0, 4),
  },
  grid: {
    minHeight: "80vh",
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "35ch",
    },
  },
}));

export default function Login() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [redirect, setRedirect] = React.useState(false);
  return (
    <Formik
      enableReinitialize
      initialValues={{ usuario_empleado: "", contrasenia_empleado: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        api_login
          .post("/", values)
          .then(function (response) {
            setSubmitting(false);
            enqueueSnackbar("Bienvenido!", {
              variant: "success",
            });
            auth.login(
              () => {
                setRedirect(true);
              },
              { user: response.data.respuesta, token: response.data.token }
            );
          })
          .catch(function (error) {
            setSubmitting(false);
            enqueueSnackbar(`Error ${error.response.data.error}`, {
              variant: "error",
            });
          });
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className={classes.root}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            className={classes.grid}
          >
            <img
              src={window.location.origin + "/header_logo.png"}
              alt="logo"
              className={classes.image}
            />

            <Grid item xs={12}>
              <Field
                required
                label="Usuario"
                name="usuario_empleado"
                component={TextFormField}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                required
                label="Contraseña"
                name="contrasenia_empleado"
                component={TextFormField}
                variant="outlined"
                type="password"
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                type="submit"
                disabled={isSubmitting}
              >
                Ingresar
              </Button>
            </Grid>
          </Grid>
          <BackDropLoading isSubmitting={isSubmitting} />
          {redirect === true || localStorage.getItem("authenticated") ? (
            <Redirect
              to={
                localStorage.getItem("redirect") !== null
                  ? localStorage.getItem("redirect")
                  : "/"
              }
            />
          ) : (
            ""
          )}
        </Form>
      )}
    </Formik>
  );
}
