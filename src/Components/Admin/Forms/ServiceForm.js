import { Field, Form, Formik } from "formik";

import BackDropLoading from "../../BackDropLoading";
import FormButtons from "../../FormButtons";
import Grid from "@material-ui/core/Grid";
import React from "react";
import TextFormField from "../../Form/TextFormField";
import Typography from "@material-ui/core/Typography";
import { api_services } from "../../../api_app";
import { service_initial_values } from "./initial_values_admin";
import { service_schema } from "./validation_schemas_admin";
import { useSnackbar } from "notistack";
import { useStyles } from "./styles";

export default function ServiceForm(props) {
  const classes = useStyles();
  const [data, setData] = React.useState(undefined);
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (props.location.hasOwnProperty("data")) {
      setData(props.location.data);
    }
  }, [props.location]);

  return (
    <Formik
      enableReinitialize
      validationSchema={service_schema}
      initialValues={data === undefined ? service_initial_values : data}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        if (data === undefined) {
          setSubmitting(true);
          api_services
            .post("/", values)
            .then(function (response) {
              setSubmitting(false);
              enqueueSnackbar("Se ha creado exitosamente!", {
                variant: "success",
              });
              resetForm({});
            })
            .catch(function (error) {
              setSubmitting(false);
              enqueueSnackbar(
                "Ha habido un error, revise los datos e intente de nuevo.",
                {
                  variant: "error",
                }
              );
            });
        } else {
          setSubmitting(true);
          api_services
            .put("/", values)
            .then(function (response) {
              setSubmitting(false);
              enqueueSnackbar("Los cambios han sido exitosos!", {
                variant: "success",
              });
            })
            .catch(function (error) {
              setSubmitting(false);
              enqueueSnackbar(
                "Ha habido un error, revise los datos e intente de nuevo." +
                  error.response,
                {
                  variant: "error",
                }
              );
            });
        }
      }}
    >
      {({ resetForm, isSubmitting }) => (
        <Form>
          <Grid container direction="column">
            <Grid item container className={classes.title}>
              <Typography
                component="h1"
                variant="h5"
                align="left"
                color="textPrimary"
                gutterBottom
              >
                {data === undefined ? "Crear" : "Editar"} Servicio
              </Typography>
            </Grid>
            <Grid item container>
              <Field
                required
                label="Nombre del Servicio"
                name="nombre_servicio"
                component={TextFormField}
              />
            </Grid>
            <Grid item container>
              <Field
                required
                multiline
                label="Descripcion del Servicio"
                name="descripcion_servicio"
                component={TextFormField}
              />
            </Grid>
            <Grid item container spacing={3}>
              <Grid item xs={6}>
                <Field
                  required
                  label="Precio"
                  name="precio_servicio"
                  type="number"
                  component={TextFormField}
                />
              </Grid>

              <Grid item xs={6}>
                <Field
                  required
                  label="Iva"
                  name="iva_servicio"
                  component={TextFormField}
                  type="number"
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              justify="flex-end"
              spacing={3}
              className={classes.buttons}
            >
              <FormButtons
                to={"/Administrador"}
                data={data}
                isSubmitting={isSubmitting}
                resetForm={() => resetForm}
              />
            </Grid>
          </Grid>

          <BackDropLoading isSubmitting={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
}
