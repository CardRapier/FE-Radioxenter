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
import Container from "@material-ui/core/Container";
import FormButtons from "../../FormButtons";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import TextField from "@material-ui/core/TextField";
import TextFormField from "../../Form/TextFormField";
import { entity_initial_values } from "./initial_values_admin";
import { entity_schema } from "./validation_schemas_admin";
import { give_error_message } from "../../../utils.js";
import { useSnackbar } from "notistack";
import { useStyles } from "./styles";
import DoctorEntityTable from "./DoctorEntityTable.js";
import AutocompleteForm from "../../Form/AutocompleteForm";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

export default function EntityForm(props) {
  const classes = useStyles();
  var data = undefined;
  const [type_payments, setTypePayments] = React.useState([]);
  const [type_receipts, setTypeReceipts] = React.useState([]);
  const [query, setQuery] = React.useState("");
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

  const add_doctor = (doctor, doctors, setChange) => {
    if (doctor !== null) {
      let doctor_aux = doctors.filter(
        (element) => element.cod_doctor === doctor.cod_doctor
      );

      doctor_aux.length === 0
        ? setChange("doctores_entidad", [
            ...doctors,
            { ...doctor, activo: true },
          ])
        : enqueueSnackbar("No puede seleccionar un doctor mas de una vez", {
            variant: "error",
          });
    } else {
      enqueueSnackbar("Seleccione un doctor para poder agregarlo", {
        variant: "error",
      });
    }
  };

  return (
    <Formik
      enableReinitialize
      validationSchema={entity_schema}
      initialValues={
        data === undefined
          ? entity_initial_values
          : data.Entidad_doctors !== undefined && doctors.length !== 0
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
              doctor: doctors[0],
              doctores_entidad: data.Entidad_doctors.map((e) => {
                let doctor_aux = doctors.find(
                  (el) => el.cod_doctor === e.cod_doctor
                );
                doctor_aux.activo = e.activo;
                return doctor_aux;
              }),
            }
          : entity_initial_values
      }
      onSubmit={(values, { setSubmitting, resetForm }) => {
        values.cedula_representante = `${values.cedula_representante}`;
        values.cedula_contacto = `${values.cedula_contacto}`;
        let send_values = { ...values };
        delete send_values.doctor;
        if (data === undefined) {
          delete send_values.doctores_entidad;
          setSubmitting(true);
          api_entities
            .post("/", send_values)
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
          let doctores = send_values.doctores_entidad;
          delete send_values.doctores_entidad;
          setSubmitting(true);
          api_entities
            .put("/", send_values)
            .then(function (response) {
              api_entities
                .put(`${data.cod_entidad}/doctores`, {
                  doctores_entidad: doctores,
                })
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
      {({ resetForm, isSubmitting, values, setFieldValue }) => (
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

                {data !== undefined && doctors.length !== 0 && (
                  <div>
                    <Grid item container spacing={3}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Filtro"
                          value={query}
                          size="small"
                          type="search"
                          onChange={(event) => setQuery(event.target.value)}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <Field
                          name="doctor"
                          label="Doctor"
                          component={AutocompleteForm}
                          options={doctors}
                          getOptionLabel={(option) =>
                            `${option.nombres_doctor} ${option.apellidos_doctor}`
                          }
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <IconButton
                          onClick={() =>
                            add_doctor(
                              values.doctor,
                              values.doctores_entidad,
                              setFieldValue
                            )
                          }
                        >
                          <AddIcon></AddIcon>
                        </IconButton>
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      container
                      justify="center"
                      className={classes.services}
                    >
                      <Grid item xs={12}>
                        <DoctorEntityTable
                          doctors={values.doctores_entidad}
                          query={query}
                          handleChange={setFieldValue}
                        />
                      </Grid>
                    </Grid>
                  </div>
                )}
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
