import { Field, Form, Formik } from "formik";

import BackDropLoading from "../../BackDropLoading";
import FormButtons from "../../FormButtons";
import Grid from "@material-ui/core/Grid";
import { MenuItem } from "@material-ui/core";
import React from "react";
import TextFormField from "../../Form/TextFormField";
import Typography from "@material-ui/core/Typography";
import { api_entities } from "../../../api_app";
import { api_type_receipt } from "../../../api_app";
import { entity_initial_values } from "./initial_values_admin";
import { entity_schema } from "./validation_schemas_admin";
import { useSnackbar } from "notistack";
import { useStyles } from "./styles";

export default function EntityForm(props) {
  const classes = useStyles();
  const [data, setData] = React.useState(undefined);
  const [type_receipts, setTypeReceipts] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();
  React.useEffect(() => {
    api_type_receipt.get("/").then((res) => {
      setTypeReceipts(res.data.respuesta);
    });
  }, []);
  React.useEffect(() => {
    if (props.location.hasOwnProperty("data")) {
      setData(props.location.data);
    }
  }, [props.location]);
  console.log(data);
  return (
    <Formik
      enableReinitialize
      validationSchema={entity_schema}
      initialValues={data === undefined ? entity_initial_values : data}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        if (values.cedula_contacto === "") {
          delete values.cedula_contacto;
        }

        if (data === undefined) {
          setSubmitting(true);
          api_entities
            .post("/", values)
            .then(function (response) {
              setSubmitting(false);
              enqueueSnackbar("Se ha creado exitosamente!", {
                variant: "success",
              });
              resetForm({});
              console.log(response);
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
          api_entities
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
                {data === undefined ? "Crear" : "Editar"} Entidad
              </Typography>
            </Grid>
            <Grid item container spacing={3}>
              <Grid item xs={6}>
                <Field
                  required
                  label="Razon Social"
                  name="razon_social_entidad"
                  component={TextFormField}
                />
              </Grid>

              <Grid item xs={6}>
                <Field
                  required
                  label="Nombre Comercial"
                  name="nombre_comercial_entidad"
                  component={TextFormField}
                />
              </Grid>
            </Grid>

            <Grid item container spacing={3}>
              <Grid item xs={6}>
                <Field
                  required
                  label="NIT"
                  name="nit_entidad"
                  component={TextFormField}
                />
              </Grid>

              <Grid item xs={6}>
                <Field
                  required
                  label="Direccion"
                  name="direccion_entidad"
                  component={TextFormField}
                />
              </Grid>
            </Grid>

            <Grid
              item
              container
              spacing={3}
              justify="center"
              alignItems="center"
            >
              <Grid item xs={6}>
                <Field
                  required
                  label="Telefono"
                  name="telefono_entidad"
                  component={TextFormField}
                />
              </Grid>

              <Grid item xs={6}>
                <Field
                  component={TextFormField}
                  required
                  label="Tipo de Facturación"
                  name="cod_tipo_facturacion"
                  fullWidth
                  select
                >
                  {type_receipts.map((type) => (
                    <MenuItem value={type.cod_tipo_facturacion}>
                      {type.nombre_tipo_facturacion}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
            </Grid>

            <Grid item>
              <Field
                component={TextFormField}
                required
                label="Forma de pago entidad"
                name="cod_forma_de_pago_entidad"
                fullWidth
                select
              >
                <MenuItem value={0}>Mensual</MenuItem>
                <MenuItem value={1}>Quincenal</MenuItem>
              </Field>
            </Grid>

            <Grid item container spacing={3}>
              <Grid item xs={6}>
                <Field
                  required
                  label="Nombre representante"
                  name="nombre_representante"
                  component={TextFormField}
                />
              </Grid>

              <Grid item xs={6}>
                <Field
                  required
                  label="Cedula Representante"
                  name="cedula_representante"
                  component={TextFormField}
                  type="number"
                />
              </Grid>
            </Grid>

            <Grid item container spacing={3}>
              <Grid item xs={6}>
                <Field
                  required
                  label="Telefono representante"
                  name="telefono_representante"
                  component={TextFormField}
                />
              </Grid>

              <Grid item xs={6}>
                <Field
                  required
                  label="Correo Representante"
                  name="correo_representante"
                  component={TextFormField}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={3}>
              <Grid item xs={6}>
                <Field
                  label="Nombre Contacto"
                  name="nombre_contacto"
                  component={TextFormField}
                />
              </Grid>

              <Grid item xs={6}>
                <Field
                  label="Cedula Contacto"
                  name="cedula_contacto"
                  component={TextFormField}
                  type="number"
                />
              </Grid>
            </Grid>

            <Grid item container spacing={3}>
              <Grid item xs={6}>
                <Field
                  label="Telefono Contacto"
                  name="telefono_contacto"
                  component={TextFormField}
                />
              </Grid>

              <Grid item xs={6}>
                <Field
                  label="Correo Contacto"
                  name="correo_contacto"
                  component={TextFormField}
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
                to={"/Administrador/Entidades"}
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
