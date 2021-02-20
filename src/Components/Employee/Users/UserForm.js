import { Field, Form, Formik } from "formik";
import {
  api_departments,
  api_process,
  api_sex,
  api_type_document,
  api_type_shipment,
  api_users,
} from "../../../api_app";

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
import { useSnackbar } from "notistack";
import { useStyles } from "../Forms/styles";
import { user_initial_values } from "../Forms/initial_values_employee";
import { user_schema } from "../Forms/validation_schemas_employee";

export default function UserForm(props) {
  const classes = useStyles();
  const [data, setData] = React.useState(undefined);
  const [redirect, setRedirect] = React.useState({
    redirect: false,
    tutor: false,
  });
  const [type_shipment, setTypeShipment] = React.useState([]);
  const [type_document, setTypeDocument] = React.useState([]);
  const [sex, setSex] = React.useState([]);
  const [departments, setDepartments] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();
  React.useEffect(() => {
    api_type_shipment.get("/").then((res) => {
      setTypeShipment(res.data.respuesta);
    });

    api_type_document.get("/").then((res) => {
      setTypeDocument(res.data.respuesta);
    });

    api_sex.get("/").then((res) => {
      setSex(res.data.respuesta);
    });
    api_departments.get("/").then((res) => {
      setDepartments(res.data.respuesta);
    });
  }, []);
  React.useEffect(() => {
    if (props.location.hasOwnProperty("data")) {
      setData(props.location.data);
    }
  }, [props.location]);
  //TODO: Filter users by document and name
  //TODO: SEND es_nuevo
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Formik
        enableReinitialize
        validationSchema={user_schema}
        initialValues={data === undefined ? user_initial_values : data}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          if (data === undefined) {
            setSubmitting(true);
            let send_values = { ...values };
            delete send_values.cod_departamento;
            api_process
              .post("crearUsuario", send_values)
              .then(function (response) {
                setSubmitting(false);
                enqueueSnackbar("Se ha agregado el usuario exitososamente!", {
                  variant: "success",
                });
                setRedirect({ redirect: true, tutor: values.tutor });
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
          } else {
            setSubmitting(true);
            api_users
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
                  {type_document.length !== 0 ? (
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
                  {type_shipment.length !== 0 ? (
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
                  {type_shipment.length !== 0 ? (
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
                        {departments.length !== 0 ? (
                          <Field
                            component={TextFormField}
                            label="Departamento"
                            name="cod_departamento"
                            fullWidth
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
                        {departments.length !== 0 ? (
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
                        {sex.length !== 0 ? (
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
            {redirect.redirect === true ? (
              redirect.tutor === true ? (
                <Redirect
                  to={{
                    pathname: "/Empleado/Tutor",
                    data: values,
                  }}
                />
              ) : (
                <Redirect
                  to={{
                    pathname: "/Empleado/CrearFactura",
                    data: values,
                  }}
                />
              )
            ) : (
              ""
            )}
          </Form>
        )}
      </Formik>
    </MuiPickersUtilsProvider>
  );
}
