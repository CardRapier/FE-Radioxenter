import { Field, Form, Formik } from "formik";
import { MenuItem, TextField } from "@material-ui/core";
import {
  api_doctors,
  api_type_document,
  api_type_shipment,
} from "../../../api_app";

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
import { doctor_initial_values } from "./initial_values_admin";
import { doctor_schema } from "./validation_schemas_admin";
import { give_error_message } from "../../../utils";
import { useSnackbar } from "notistack";
import { useStyles } from "./styles";

export default function DoctorForm(props) {
  const classes = useStyles();
  const [data, setData] = React.useState(undefined);
  const [type_shipment, setTypeShipment] = React.useState([]);
  const [type_document, setTypeDocument] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();
  React.useEffect(() => {
    api_type_shipment.get("/").then((res) => {
      setTypeShipment(res.data.respuesta);
    });

    api_type_document.get("/").then((res) => {
      setTypeDocument(res.data.respuesta);
    });
  }, []);
  React.useEffect(() => {
    if (props.location.hasOwnProperty("data")) {
      setData(props.location.data);
    }
  }, [props.location]);

  return (
    <Formik
      enableReinitialize
      validationSchema={doctor_schema}
      initialValues={
        data === undefined
          ? doctor_initial_values
          : {
              nombres_doctor: data.nombres_doctor,
              apellidos_doctor: data.apellidos_doctor,
              direccion_doctor: data.direccion_doctor,
              telefono_doctor: data.telefono_doctor,
              documento_doctor: data.documento_doctor,
              cod_tipo_documento: data.cod_tipo_documento,
              cod_tipo_pref_entrega: data.cod_tipo_pref_entrega,
              correo_doctor: data.correo_doctor,
              cod_doctor: data.cod_doctor,
            }
      }
      onSubmit={(values, { setSubmitting, resetForm }) => {
        values.documento_doctor = `${values.documento_doctor}`;
        if (data === undefined) {
          setSubmitting(true);
          api_doctors
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
          api_doctors
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
            <Container
              className="form-paper"
              elevation={3}
              component={Card}
              fixed
            >
              <CardHeader
                title={data === undefined ? "Crear Doctor" : "Editar Doctor"}
              />
              <CardContent>
                <Grid item container spacing={3}>
                  <Grid item xs={6}>
                    <Field
                      required
                      label="Nombres"
                      name="nombres_doctor"
                      component={TextFormField}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Field
                      required
                      label="Apellidos"
                      name="apellidos_doctor"
                      component={TextFormField}
                    />
                  </Grid>
                </Grid>

                <Grid item container spacing={3}>
                  <Grid item xs={6}>
                    <Field
                      required
                      label="Dirección"
                      name="direccion_doctor"
                      component={TextFormField}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Field
                      required
                      label="Telefono"
                      name="telefono_doctor"
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
                    {type_document.length !== 0 ? (
                      <Field
                        component={TextFormField}
                        required
                        label="Tipo de documento"
                        name="cod_tipo_documento"
                        fullWidth
                        select
                      >
                        {type_document.map((type, index) => (
                          <MenuItem
                            key={`type-doc-${index}`}
                            value={type.cod_tipo_documento}
                          >
                            {type.nombre_tipo_documento}
                          </MenuItem>
                        ))}
                      </Field>
                    ) : (
                      <div>
                        <TextField
                          label="Tipo de documento"
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

                  <Grid item xs={6}>
                    <Field
                      required
                      label="Documento"
                      name="documento_doctor"
                      component={TextFormField}
                      type="number"
                    />
                  </Grid>
                </Grid>

                <Grid item container spacing={3}>
                  <Grid item xs={6}>
                    {type_shipment.length !== 0 ? (
                      <Field
                        component={TextFormField}
                        required
                        label="Preferencia de entrega"
                        name="cod_tipo_pref_entrega"
                        fullWidth
                        select
                      >
                        {type_shipment.map((type, index) => (
                          <MenuItem
                            key={`type-pref-${index}`}
                            value={type.cod_tipo_pref_entrega}
                          >
                            {type.nombre_tipo_pref_entrega}
                          </MenuItem>
                        ))}
                      </Field>
                    ) : (
                      <div>
                        <TextField
                          label="Preferencia de entrega"
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

                  <Grid item xs={6}>
                    <Field
                      required
                      label="Correo"
                      name="correo_doctor"
                      component={TextFormField}
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
                    to={"/Administrador/Doctores"}
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
