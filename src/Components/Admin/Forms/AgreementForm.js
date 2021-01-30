import { Field, Form, Formik } from "formik";
import { api_agreements, api_entities, api_services } from "../../../api_app";

import BackDropLoading from "../../BackDropLoading";
import Chip from "@material-ui/core/Chip";
import FormButtons from "../../FormButtons";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import { KeyboardDatePicker } from "formik-material-ui-pickers";
import MenuItem from "@material-ui/core/MenuItem";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import React from "react";
import { Select } from "formik-material-ui";
import TextFormField from "../../Form/TextFormField";
import Typography from "@material-ui/core/Typography";
import { agreement_initial_values } from "./initial_values_admin";
import { agreement_schema } from "./validation_schemas_admin";
import { useSnackbar } from "notistack";
import { useStyles } from "./styles";

export default function AgreementForm(props) {
  const classes = useStyles();
  const [data, setData] = React.useState(undefined);
  const [services, setServices] = React.useState([]);
  const [entities, setEntities] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();
  React.useEffect(() => {
    api_services.get("/").then((res) => {
      setServices(res.data.respuesta);
    });

    api_entities.get("/").then((res) => {
      setEntities(res.data.respuesta);
    });
  }, []);

  React.useEffect(() => {
    if (props.location.hasOwnProperty("data")) {
      setData(props.location.data);
    }
  }, [props.location]);

  console.log(data);

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Formik
        enableReinitialize
        validationSchema={agreement_schema}
        initialValues={
          data === undefined
            ? agreement_initial_values
            : {
                cod_entidad: data.cod_entidad,
                fecha_inicial_convenio:
                  data.Convenios[0].fecha_inicial_convenio,
                fecha_final_convenio: data.Convenios[0].fecha_final_convenio,
                cod_servicios: data.Convenios.map(
                  (element) => element.cod_servicio
                ),
                precios_servicios: data.Convenios.map((element) => [
                  element.valor_servicio,
                ]),
              }
        }
        onSubmit={(values, { setSubmitting, resetForm }) => {
          if (data === undefined) {
            setSubmitting(true);
            values.cod_servicios.map((servicio, index) =>
              api_agreements
                .post("/", {
                  cod_entidad: values.cod_entidad,
                  fecha_inicial_convenio: values.fecha_inicial_convenio,
                  fecha_final_convenio: values.fecha_final_convenio,
                  cod_servicio: servicio,
                  valor_servicio: values.precios_servicios[index],
                })
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
                })
            );
          } else {
            setSubmitting(true);
            api_entities
              .put(`/${data.cod_entidad}/convenios`, {
                fecha_inicial_convenio: values.fecha_inicial_convenio,
                fecha_final_convenio: values.fecha_final_convenio,
                servicios_convenio: values.cod_servicios,
                valores_servicios: values.precios_servicios,
              })
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
        {({ resetForm, isSubmitting, errors, values }) => (
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
                  {data === undefined ? "Crear" : "Editar"} Convenio
                </Typography>
              </Grid>
              <Grid item container>
                <Field
                  required
                  label="Entidad"
                  name="cod_entidad"
                  select
                  component={TextFormField}
                >
                  {entities.map((entity) => (
                    <MenuItem value={entity.cod_entidad}>
                      {entity.razon_social_entidad}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>

              <Grid item container className={classes.paddingTop3} spacing={3}>
                <Grid item xs={6}>
                  <Field
                    required
                    format="DD/MM/yyyy"
                    component={KeyboardDatePicker}
                    label="Fecha Inicial"
                    name="fecha_inicial_convenio"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    required
                    format="DD/MM/yyyy"
                    component={KeyboardDatePicker}
                    label="Fecha Final"
                    name="fecha_final_convenio"
                    fullWidth
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
                  <InputLabel id="servicios_label">Servicios</InputLabel>
                  <Field
                    name={"cod_servicios"}
                    component={Select}
                    multiple
                    fullWidth
                    renderValue={(selected) => (
                      <div className={classes.chips}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={services
                              .filter(
                                (service) => service.cod_servicio === value
                              )
                              .map((x) => x.nombre_servicio)}
                            className={classes.chip}
                          />
                        ))}
                      </div>
                    )}
                  >
                    {services !== undefined
                      ? services.map((service, index) => (
                          <MenuItem key={index} value={service.cod_servicio}>
                            {service.nombre_servicio}
                          </MenuItem>
                        ))
                      : ""}
                  </Field>
                  <FormHelperText>{errors.servicios}</FormHelperText>
                </Grid>

                <Grid item xs={12}>
                  {values.cod_servicios.map((code, index) => {
                    return (
                      <Field
                        required
                        label={`Precio ${services
                          .filter((service) => service.cod_servicio === code)
                          .map((x) => x.nombre_servicio)}`}
                        name={`precios_servicios.${index}`}
                        component={TextFormField}
                        type={"number"}
                      />
                    );
                  })}
                </Grid>
              </Grid>
              <pre>{JSON.stringify(values, null, 2)}</pre>
              <FormButtons
                to={"/Administrador/Convenios"}
                data={data}
                isSubmitting={isSubmitting}
                resetForm={() => resetForm}
              />
            </Grid>
            <BackDropLoading isSubmitting={isSubmitting} />
          </Form>
        )}
      </Formik>
    </MuiPickersUtilsProvider>
  );
}
