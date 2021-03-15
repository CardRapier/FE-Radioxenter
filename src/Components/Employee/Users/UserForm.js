import { Field, Form, Formik } from "formik";
import { api_process, api_users } from "../../../api_app";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import BackDropLoading from "../../BackDropLoading";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormButtons from "../../FormButtons";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import { KeyboardDatePicker } from "formik-material-ui-pickers";
import MenuItem from "@material-ui/core/MenuItem";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import React from "react";
import { Redirect } from "react-router-dom";
import { Switch } from "formik-material-ui";
import TextFormField from "../../Form/TextFormField";
import Typography from "@material-ui/core/Typography";
import { give_error_message } from "../../../utils";
import { useSnackbar } from "notistack";
import { useStyles } from "../Forms/styles";
import { user_initial_values } from "../Forms/initial_values_employee";
import { user_schema } from "../Forms/validation_schemas_employee";

export default function UserForm(props) {
  const classes = useStyles();
  let fetched_data = undefined;
  let data = undefined;
  let receipt = false;
  const [redirect, setRedirect] = React.useState({
    redirect: false,
    tutor: false,
  });
  const { enqueueSnackbar } = useSnackbar();

  if (props.location.hasOwnProperty("data")) {
    data = props.location.data;
  }
  if (props.location.hasOwnProperty("receipt")) {
    receipt = props.location.receipt;
  }
  if (props.location.hasOwnProperty("fetched_data")) {
    fetched_data = props.location.fetched_data;
  }

  let { departments, sex, type_document, type_shipment } = fetched_data.data;

  const renderRedirect = (values) => {
    if (redirect.redirect === true) {
      if (redirect.tutor === true) {
        return (
          <Redirect
            to={{
              pathname: "/Empleado/Tutor",
              data: values,
            }}
          />
        );
      } else {
        return (
          <Redirect
            to={{
              pathname: "/Empleado/CrearFactura",
              data: values,
            }}
          />
        );
      }
    }
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Formik
        enableReinitialize
        validationSchema={user_schema}
        initialValues={
          data === undefined
            ? user_initial_values
            : { ...data, esNuevo: false, tutor: false }
        }
        onSubmit={(values, { setSubmitting, resetForm }) => {
          values.documento_usuario = `${values.documento_usuario}`;
          let send_values = { ...values };
          delete send_values.cod_departamento;

          if (data === undefined) {
            setSubmitting(true);
            api_process
              .post("crearUsuario", { ...send_values, cod_usuario: null })
              .then(function (response) {
                setSubmitting(false);
                enqueueSnackbar("Se ha agregado el usuario exitososamente!", {
                  variant: "success",
                });
                setRedirect({ redirect: true, tutor: values.tutor });
              })
              .catch(function (error) {
                setSubmitting(false);
                enqueueSnackbar(give_error_message(error.response), {
                  variant: "error",
                });
              });
          } else {
            delete send_values.createdAt;
            delete send_values.updatedAt;
            if (receipt === true) {
              setSubmitting(true);
              api_process
                .post("crearUsuario", send_values)
                .then(function (response) {
                  setSubmitting(false);
                  enqueueSnackbar("Los cambios han sido exitosos!", {
                    variant: "success",
                  });
                  setRedirect({ redirect: true, tutor: values.tutor });
                })
                .catch(function (error) {
                  setSubmitting(false);
                  enqueueSnackbar(give_error_message(error.response), {
                    variant: "error",
                  });
                });
            } else {
              delete send_values.esNuevo;
              delete send_values.tutor;
              setSubmitting(true);
              api_users
                .put("/", send_values)
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
          }
        }}
      >
        {({ resetForm, isSubmitting, values, setFieldValue }) => (
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
                  {data === undefined ? "Crear" : "Editar"} Usuario
                </Typography>
              </Grid>
              <Grid item container spacing={3}>
                <Grid item xs={6}>
                  <Field
                    required
                    label="Nombres"
                    name="nombres_usuario"
                    component={TextFormField}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    required
                    label="Apellidos"
                    name="apellidos_usuario"
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
                  {type_document !== undefined ? (
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
                  ) : (
                    <Field
                      component={TextFormField}
                      required
                      label="Tipo de documento"
                      name="cod_tipo_documento"
                      fullWidth
                    />
                  )}
                </Grid>

                <Grid item xs={6}>
                  <Field
                    required
                    label="Documento"
                    name="documento_usuario"
                    component={TextFormField}
                    type="number"
                  />
                </Grid>
              </Grid>

              <Grid item container spacing={3} alignItems="center">
                <Grid item xs={6}>
                  <Field
                    required
                    format="DD/MM/yyyy"
                    component={KeyboardDatePicker}
                    label="Fecha de nacimiento"
                    name="fecha_nacimiento_usuario"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  {type_shipment !== undefined ? (
                    <Field
                      component={TextFormField}
                      required
                      label="Preferencia de entrega"
                      name="cod_tipo_pref_entrega"
                      fullWidth
                      select
                    >
                      {type_shipment.map((type) => (
                        <MenuItem
                          key={type.cod_tipo_pref_entrega}
                          value={type.cod_tipo_pref_entrega}
                        >
                          {type.nombre_tipo_pref_entrega}
                        </MenuItem>
                      ))}
                    </Field>
                  ) : (
                    <Field
                      component={TextFormField}
                      required
                      label="Preferencia de entrega"
                      name="cod_tipo_pref_entrega"
                      fullWidth
                    />
                  )}
                </Grid>
              </Grid>

              <Grid item container spacing={3} alignItems="center">
                <Grid item xs={6}>
                  {type_shipment !== undefined ? (
                    type_shipment.find(
                      (type) =>
                        values.cod_tipo_pref_entrega ===
                        type.cod_tipo_pref_entrega
                    ).nombre_tipo_pref_entrega === "Correo" ? (
                      <Field
                        label="Correo"
                        required
                        name="correo_usuario"
                        component={TextFormField}
                      />
                    ) : (
                      <Field
                        label="Correo"
                        name="correo_usuario"
                        component={TextFormField}
                      />
                    )
                  ) : (
                    <Field
                      label="Correo"
                      name="correo_usuario"
                      component={TextFormField}
                    />
                  )}
                </Grid>

                <Grid item xs={6}>
                  {receipt === true ? (
                    <FormControlLabel
                      control={
                        <Field
                          component={Switch}
                          type="checkbox"
                          color="primary"
                          name="tutor"
                        />
                      }
                      label="Tutor"
                    />
                  ) : (
                    ""
                  )}
                </Grid>
              </Grid>

              <Accordion classes={{ root: classes.expandedPanel }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel-content"
                  id="panel1a-header"
                >
                  <Typography variant="h6">
                    Información complementaria
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container direction="column">
                    <Grid item container spacing={3}>
                      <Grid item xs={6}>
                        <Field
                          label="Telefono"
                          name="telefono_usuario"
                          component={TextFormField}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Field
                          component={TextFormField}
                          label="Celular"
                          name="celular_usuario"
                        />
                      </Grid>
                    </Grid>

                    <Grid item container spacing={3}>
                      <Grid item xs={6}>
                        <Field
                          label="Ocupación"
                          name="ocupacion_usuario"
                          component={TextFormField}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Field
                          label="Genero"
                          name="genero_usuario"
                          component={TextFormField}
                        />
                      </Grid>
                    </Grid>
                    <Grid item container spacing={3}>
                      <Grid item xs={12}>
                        <Field
                          label="Dirección"
                          name="direccion_usuario"
                          component={TextFormField}
                        />
                      </Grid>
                    </Grid>

                    <Grid item container spacing={3}>
                      <Grid item xs={6}>
                        {departments !== undefined ? (
                          <Field
                            component={TextFormField}
                            label="Departamento"
                            name="cod_departamento"
                            fullWidth
                            onChange={(e) => {
                              let cod_departamento = e.target.value;
                              setFieldValue(
                                "cod_departamento",
                                cod_departamento
                              );
                              setFieldValue(
                                "cod_ciudad",
                                departments.find(
                                  (e) => e.cod_departamento === cod_departamento
                                ).Ciudads[0].cod_ciudad
                              );
                            }}
                            select
                          >
                            {departments.map((department) => (
                              <MenuItem
                                key={department.cod_departamento}
                                value={department.cod_departamento}
                              >
                                {department.nom_departamento}
                              </MenuItem>
                            ))}
                          </Field>
                        ) : (
                          ""
                        )}

                        {departments !== undefined ? (
                          <Field
                            component={TextFormField}
                            label="Ciudad"
                            name="cod_ciudad"
                            fullWidth
                            select
                          >
                            {departments
                              .find(
                                (department) =>
                                  department.cod_departamento ===
                                  values.cod_departamento
                              )
                              .Ciudads.map((city) => (
                                <MenuItem
                                  key={city.cod_ciudad}
                                  value={city.cod_ciudad}
                                >
                                  {city.nom_ciudad}
                                </MenuItem>
                              ))}
                          </Field>
                        ) : (
                          ""
                        )}
                      </Grid>

                      <Grid item xs={6}>
                        {sex !== undefined ? (
                          <Field
                            component={TextFormField}
                            label="Sexo"
                            name="cod_sexo"
                            fullWidth
                            select
                          >
                            {sex.map((element) => (
                              <MenuItem
                                key={element.cod_sexo}
                                value={element.cod_sexo}
                              >
                                {element.nombre_sexo}
                              </MenuItem>
                            ))}
                          </Field>
                        ) : (
                          ""
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Grid item container spacing={3}>
                <Grid
                  item
                  container
                  justify="flex-end"
                  spacing={3}
                  className={classes.buttons}
                >
                  <FormButtons
                    to={"/Empleado"}
                    data={data}
                    isSubmitting={isSubmitting}
                    resetForm={() => resetForm}
                  />
                </Grid>
              </Grid>
            </Grid>
            <BackDropLoading isSubmitting={isSubmitting} />
            {renderRedirect(values)}
          </Form>
        )}
      </Formik>
    </MuiPickersUtilsProvider>
  );
}
