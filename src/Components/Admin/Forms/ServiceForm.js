import { Field, Form, Formik } from "formik";

import BackDropLoading from "../../BackDropLoading";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import FormButtons from "../../FormButtons";
import Grid from "@material-ui/core/Grid";
import React from "react";
import TextFormField from "../../Form/TextFormField";
import { api_services } from "../../../api_app";
import { give_error_message } from "../../../utils.js";
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
              enqueueSnackbar(give_error_message(error.response), {
                variant: "error",
              });
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
              enqueueSnackbar(give_error_message(error.response), {
                variant: "error",
              });
            });
        }
      }}
    >
      {({ resetForm, isSubmitting }) => (
        <Form>
          <Grid container direction="column">
            <Container
              className="form-paper"
              elevation={3}
              component={Card}
              fixed
            >
              <CardHeader
                title={
                  data === undefined ? "Crear Servicio" : "Editar Servicio"
                }
              />
              <CardContent>
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
                    label="Descripción del Servicio"
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
              </CardContent>
              <CardActions disableSpacing>
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
              </CardActions>
            </Container>
          </Grid>

          <BackDropLoading isSubmitting={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
}
