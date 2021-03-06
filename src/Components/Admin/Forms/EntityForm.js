import { Field, Form, Formik } from "formik";
import { MenuItem, TextField } from "@material-ui/core";
import {
  api_entities,
  api_type_payment,
  api_type_receipt,
} from "../../../api_app";

import BackDropLoading from "../../BackDropLoading";
import FormButtons from "../../FormButtons";
import Grid from "@material-ui/core/Grid";
import React from "react";
import TextFormField from "../../Form/TextFormField";
import Typography from "@material-ui/core/Typography";
import { entity_initial_values } from "./initial_values_admin";
import { entity_schema } from "./validation_schemas_admin";
import { give_error_message } from "../../../utils.js";
import { useSnackbar } from "notistack";
import { useStyles } from "./styles";

export default function EntityForm(props) {
  const classes = useStyles();
  var data = undefined;
  const [type_payments, setTypePayments] = React.useState([]);
  const [type_receipts, setTypeReceipts] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();
  React.useEffect(() => {
    api_type_receipt.get("/").then((res) => {
      setTypeReceipts(res.data.respuesta);
    });

    api_type_payment.get("/").then((res) => {
      setTypePayments(res.data.respuesta);
    });
  }, []);
  if (props.location.hasOwnProperty("data")) {
    data = props.location.data;
  }
  return (
    <Formik
      enableReinitialize
      validationSchema={entity_schema}
      initialValues={
        data === undefined
          ? entity_initial_values
          : {
              razon_social_entidad: data.razon_social_entidad,
              nombre_comercial_entidad: data.nombre_comercial_entidad,
              nit_entidad: data.nit_entidad,
              direccion_entidad: data.direccion_entidad,
              telefono_entidad: data.telefono_entidad,
              nombre_representante: data.nombre_representante,
              cedula_representante: data.cedula_representante,
              telefono_representante: data.telefono_representante,
              correo_representante: data.correo_representante,
              nombre_contacto: data.nombre_contacto,
              cedula_contacto: data.cedula_contacto,
              telefono_contacto: data.telefono_contacto,
              correo_contacto: data.correo_contacto,
              cod_forma_de_pago_entidad: data.cod_forma_de_pago_entidad,
              cod_tipo_facturacion: data.cod_tipo_facturacion,
              cod_entidad: data.cod_entidad,
            }
      }
      onSubmit={(values, { setSubmitting, resetForm }) => {
        values.cedula_representante = `${values.cedula_representante}`;
        values.cedula_contacto = `${values.cedula_contacto}`;
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
            })
            .catch(function (error) {
              setSubmitting(false);
              enqueueSnackbar(give_error_message(error.response), {
                variant: "error",
              });
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
              enqueueSnackbar(give_error_message(error.response), {
                variant: "error",
              });
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
                {type_receipts.length !== 0 ? (
                  <Field
                    component={TextFormField}
                    required
                    label="Tipo de Facturación"
                    name="cod_tipo_facturacion"
                    fullWidth
                    select
                  >
                    {type_receipts.map((type, index) => (
                      <MenuItem
                        key={`menu-receipt-${index}`}
                        value={type.cod_tipo_facturacion}
                      >
                        {type.nombre_tipo_facturacion}
                      </MenuItem>
                    ))}
                  </Field>
                ) : (
                  <div>
                    <TextField
                      label="Tipo de Facturación"
                      fullWidth
                      required
                      value={"    "}
                      select
                    >
                      <MenuItem value={"    "}> </MenuItem>
                    </TextField>
                  </div>
                )}
              </Grid>
            </Grid>

            <Grid item>
              {type_payments.length !== 0 ? (
                <Field
                  component={TextFormField}
                  required
                  label="Forma de pago entidad"
                  name="cod_forma_de_pago_entidad"
                  fullWidth
                  select
                >
                  {type_payments.map((type, index) => (
                    <MenuItem
                      key={`menu-payments-${index}`}
                      value={type.cod_forma_de_pago_entidad}
                    >
                      {type.nombre_forma_de_pago_entidad}
                    </MenuItem>
                  ))}
                </Field>
              ) : (
                <div>
                  <TextField
                    label="Forma de pago entidad"
                    fullWidth
                    required
                    value={"    "}
                    select
                  >
                    <MenuItem value={"    "}> </MenuItem>
                  </TextField>
                </div>
              )}
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
