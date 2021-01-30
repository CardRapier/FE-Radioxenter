import { Field, Form, Formik } from "formik";
import { api_process, api_type_document } from "../../../api_app";

import BackDropLoading from "../../BackDropLoading";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import { Redirect } from "react-router-dom";
import TextFormField from "../../Form/TextFormField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { tutor_initial_values } from "../Forms/initial_values_employee";
import { tutor_schema } from "../Forms/validation_schemas_employee";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(4, 0, 2),
  },
  button: {
    marginRight: 4,
  },
  marginT: {
    marginTop: theme.spacing(3),
  },
}));

export default function ReceiptKinship(props) {
  const { data } = props.location;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [type_document, setTypeDocument] = React.useState([]);
  const [redirect, setRedirect] = React.useState(false);
  React.useEffect(() => {
    api_type_document.get("/").then((res) => {
      setTypeDocument(res.data.respuesta);
    });
  }, []);

  return (
    <React.Fragment>
      <Formik
        enableReinitialize
        validationSchema={tutor_schema}
        initialValues={tutor_initial_values}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          api_process
            .post("agregarTutor", {
              ...values,
              documento_usuario: data.documento_usuario,
            })
            .then(function (response) {
              setSubmitting(false);
              enqueueSnackbar("Se ha agregado el tutor exitososamente!", {
                variant: "success",
              });
              setRedirect(true);
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
        }}
      >
        {({ resetForm, isSubmitting, values }) => (
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
                  Tutor
                </Typography>
              </Grid>

              <Grid item container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Field
                    required
                    label="Nombre"
                    name="nombres_tutor"
                    component={TextFormField}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    required
                    label="Apellidos"
                    name="apellidos_tutor"
                    component={TextFormField}
                  />
                </Grid>
              </Grid>
              <Grid item container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextFormField}
                    required
                    label="Tipo de documento"
                    name="cod_tipo_documento"
                    fullWidth
                    select
                  >
                    {type_document.map((type) => (
                      <MenuItem
                        key={type.cod_tipo_documento}
                        value={type.cod_tipo_documento}
                      >
                        {type.nombre_tipo_documento}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    required
                    label="Documento"
                    name="documento_tutor"
                    component={TextFormField}
                    type="number"
                  />
                </Grid>
              </Grid>
              <Grid item container spacing={3}>
                <Grid item xs>
                  <Field
                    component={TextFormField}
                    required
                    fullWidth
                    label="Parentesco"
                    name="parentesco_tutor"
                  />
                </Grid>
              </Grid>

              <Grid
                container
                item
                justify="flex-end"
                className={classes.marginT}
              >
                <Button
                  className={classes.button}
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  Cancelar
                </Button>

                <Button
                  className={classes.button}
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  Limpiar
                </Button>

                <Button
                  className={classes.button}
                  variant="contained"
                  size="small"
                  color="primary"
                  type="submit"
                >
                  Crear
                </Button>
              </Grid>
            </Grid>

            <BackDropLoading isSubmitting={isSubmitting} />
            {redirect === true ? (
              <Redirect
                to={{
                  pathname: "/Empleado/CrearFactura",
                  data: data,
                  tutor: values,
                }}
              />
            ) : (
              ""
            )}
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
}
