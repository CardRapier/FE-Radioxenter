import { Field, Form, Formik } from "formik";
import {
  api_doctors,
  api_entities,
  api_type_payment,
  api_type_receipt,
} from "../../../api_app";

import BackDropLoading from "../../BackDropLoading";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Chip from "@material-ui/core/Chip";
import Container from "@material-ui/core/Container";
import FormButtons from "../../FormButtons";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import { Select } from "formik-material-ui";
import TextField from "@material-ui/core/TextField";
import TextFormField from "../../Form/TextFormField";
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

  const [doctors, setDoctors] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    api_type_receipt.get("/").then((res) => {
      setTypeReceipts(res.data.respuesta);
    });

    api_type_payment.get("/").then((res) => {
      setTypePayments(res.data.respuesta);
    });

    api_doctors
      .get("/")
      .then((res) => {
        setDoctors(res.data.respuesta);
      })
      .catch((error) => {
        enqueueSnackbar(
          "No hay doctores en el sistema, para relacionarlos a esta entidad, por favor cree un nuevo doctor",
          {
            variant: "warning",
          }
        );
      });
  }, [enqueueSnackbar]);
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
          : data.Entidad_doctors !== undefined
          ? {
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
              doctores_entidad: data.Entidad_doctors.map((e) => e.cod_doctor),
            }
          : entity_initial_values
      }
      onSubmit={(values, { setSubmitting, resetForm }) => {
        values.cedula_representante = `${values.cedula_representante}`;
        values.cedula_contacto = `${values.cedula_contacto}`;
        let send_values = { ...values };
        let doctores_entidad = [...values.doctores_entidad];
        delete send_values.doctores_entidad;

        if (data === undefined) {
          setSubmitting(true);
          api_entities
            .post("/", send_values)
            .then(function (response) {
              let entities = [];
              api_entities.get("/").then((res) => {
                entities = res.data.respuesta;
              });
              let entity = entities.filter(
                (e) => e.nit_entidad === values.nit_entidad
              );
              api_entities.put(`${entity.cod_entidad}/doctores`, {
                doctores_entidad: doctores_entidad,
              });
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
            .put("/", send_values)
            .then(function (response) {
              api_entities
                .put(`${data.cod_entidad}/doctores`, {
                  doctores_entidad: doctores_entidad,
                })
                .then(function (response) {
                  setSubmitting(false);
                  enqueueSnackbar("Los cambios han sido exitosos!", {
                    variant: "success",
                  });
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
      {({ resetForm, isSubmitting, values, errors }) => (
        <Form>
          <Grid container direction="column">
            <Container
              className="form-paper"
              elevation={3}
              component={Card}
              fixed
            >
              <CardHeader
                title={data === undefined ? "Crear Entidad" : "Editar Entidad"}
              />
              <CardContent>
                <Grid item container spacing={3}>
                  <Grid item xs={6}>
                    <Field
                      required
                      label="Razón Social"
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
                      label="Dirección"
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
                      label="Teléfono"
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
                      label="Teléfono representante"
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
                      label="Teléfono Contacto"
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
                  justify="center"
                  className={classes.services}
                >
                  <Grid item xs={12}>
                    {doctors.length !== 0 ? (
                      <div>
                        <InputLabel id="doctors_label">Doctores</InputLabel>
                        <Field
                          name={`doctores_entidad`}
                          type="select"
                          component={Select}
                          label_id="doctors_label"
                          multiple
                          fullWidth
                          renderValue={(selected) => (
                            <div className={classes.chips}>
                              {selected.map((value, index) => (
                                <Chip
                                  key={`${value}-${index}`}
                                  label={doctors
                                    .filter(
                                      (doctor) => doctor.cod_doctor === value
                                    )
                                    .map(
                                      (x) =>
                                        `${x.nombres_doctor} ${x.apellidos_doctor}`
                                    )}
                                  className={classes.chip}
                                />
                              ))}
                            </div>
                          )}
                        >
                          {doctors.map((doctor, index) => (
                            <MenuItem
                              key={`menu-${index}`}
                              value={doctor.cod_doctor}
                            >
                              {`${doctor.nombres_doctor} ${doctor.apellidos_doctor}`}
                            </MenuItem>
                          ))}
                        </Field>
                        <FormHelperText>
                          {errors.doctores_entidad}
                        </FormHelperText>
                      </div>
                    ) : (
                      ""
                    )}
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
                    to={"/Administrador/Entidades"}
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
