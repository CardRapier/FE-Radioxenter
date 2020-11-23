import { Field, Form, Formik } from "formik";
import {
  api_employees,
  api_register,
  api_type_document,
  api_type_employee,
} from "../../../api_app";

import BackDropLoading from "../../BackDropLoading";
import FormButtons from "../../FormButtons";
import Grid from "@material-ui/core/Grid";
import { KeyboardDatePicker } from "formik-material-ui-pickers";
import { MenuItem } from "@material-ui/core";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import React from "react";
import TextFormField from "../../Form/TextFormField";
import Typography from "@material-ui/core/Typography";
import { employee_initial_values } from "./initial_values_admin";
import { employee_schema } from "./validation_schemas_admin";
import { useSnackbar } from "notistack";
import { useStyles } from "./styles";

export default function EmployeeForm(props) {
  const classes = useStyles();
  const [data, setData] = React.useState(undefined);
  const [type_employee, setTypeEmployee] = React.useState([]);
  const [type_document, setTypeDocument] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();
  React.useEffect(() => {
    api_type_employee.get("/").then((res) => {
      setTypeEmployee(res.data.respuesta);
      api_type_document.get("/").then((res) => {
        setTypeDocument(res.data.respuesta);
      });
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
      validationSchema={employee_schema}
      initialValues={data === undefined ? employee_initial_values : data}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        if (data === undefined) {
          setSubmitting(true);
          api_register
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
          delete values.createdAt;
          delete values.updatedAt;
          setSubmitting(true);
          api_employees
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
                {data === undefined ? "Crear" : "Editar"} Empleado
              </Typography>
            </Grid>
            <Grid item container spacing={3}>
              <Grid item xs={6}>
                <Field
                  required
                  label="Nombres"
                  name="nombres_empleado"
                  component={TextFormField}
                />
              </Grid>

              <Grid item xs={6}>
                <Field
                  required
                  label="Apellidos"
                  name="apellidos_empleado"
                  component={TextFormField}
                />
              </Grid>
            </Grid>

            <Grid item container spacing={3}>
              <Grid item xs={6}>
                <Field
                  required
                  label="Dirección"
                  name="direccion_empleado"
                  component={TextFormField}
                />
              </Grid>

              <Grid item xs={6}>
                <Field
                  required
                  label="Telefono"
                  name="telefono_empleado"
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
                  component={TextFormField}
                  required
                  label="Tipo de documento"
                  name="cod_tipo_documento"
                  fullWidth
                  select
                >
                  {type_document.map((type) => (
                    <MenuItem value={type.cod_tipo_documento}>
                      {type.nombre_tipo_documento}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>

              <Grid item xs={6}>
                <Field
                  required
                  label="Documento"
                  name="documento_empleado"
                  component={TextFormField}
                  type="number"
                />
              </Grid>
            </Grid>

            <Grid item container spacing={3}>
              <Grid item xs={6}>
                <Field
                  required
                  label="Usuario del Empleado"
                  name="usuario_empleado"
                  component={TextFormField}
                />
              </Grid>

              <Grid item xs={6}>
                <Field
                  required
                  label="Contraseña del empleado"
                  type="password"
                  name="contrasenia_empleado"
                  component={TextFormField}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={3}>
              <Grid item xs={6}>
                <Field
                  component={TextFormField}
                  required
                  label="Tipo de empleado"
                  name="cod_tipo_empleado"
                  fullWidth
                  select
                >
                  {type_employee.map((type) => (
                    <MenuItem value={type.cod_tipo_empleado}>
                      {type.nombre_tipo_empleado}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>

              <Grid item xs={6}>
                <Field
                  required
                  label="Correo"
                  name="correo_empleado"
                  component={TextFormField}
                />
              </Grid>
            </Grid>

            <Grid item container spacing={3}>
              <Grid item xs={false}></Grid>
              <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <Field
                    required
                    format="DD/MM/yyyy"
                    component={KeyboardDatePicker}
                    label="Fecha de nacimiento"
                    name="fnacimiento_empleado"
                    fullWidth
                  />
                </MuiPickersUtilsProvider>
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
                to={"/Administrador/Empleados"}
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
