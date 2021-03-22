import { Field, Form, Formik } from "formik";
import { api_agreements, api_entities, api_services } from "../../../api_app";
import { give_error_message, remove_abbreviations } from "../../../utils";

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
import { KeyboardDatePicker } from "formik-material-ui-pickers";
import MenuItem from "@material-ui/core/MenuItem";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import React from "react";
import { Select } from "formik-material-ui";
import TextFormField from "../../Form/TextFormField";
import { agreements_initial_values } from "./initial_values_admin";
import { agreements_schema } from "./validation_schemas_admin";
import { useSnackbar } from "notistack";
import { useStyles } from "./styles";

export default function AgreementsForm(props) {
  const classes = useStyles();
  const [data, setData] = React.useState(undefined);
  const [services, setServices] = React.useState([]);
  const [entities, setEntities] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();
  React.useEffect(() => {
    api_services
      .get("/", {
        params: {
          excludeConvenios: true,
        },
      })
      .then((res) => {
        setServices(remove_abbreviations(res.data.respuesta, ["SE-", "PA-"]));
      })
      .catch((error) => {
        enqueueSnackbar(
          "No hay servicios en el sistema, para crear un convenio, agregue un nuevo servicio",
          {
            variant: "warning",
          }
        );
      });

    api_entities
      .get("/")
      .then((res) => {
        setEntities(res.data.respuesta);
      })
      .catch((error) => {
        enqueueSnackbar(
          "No hay entidades en el sistema, para crear un convenio, agregue una entidad",
          {
            variant: "warning",
          }
        );
      });
  }, [enqueueSnackbar]);

  React.useEffect(() => {
    if (props.location.hasOwnProperty("data")) {
      setData(props.location.data);
    }
  }, [props.location]);
  console.log(entities);
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Formik
        enableReinitialize
        validationSchema={agreements_schema}
        initialValues={
          data === undefined
            ? agreements_initial_values
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
                nom_entidad: data.razon_social_entidad,
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
                })
                .catch(function (error) {
                  setSubmitting(false);
                  enqueueSnackbar(give_error_message(error.response), {
                    variant: "error",
                  });
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
                enqueueSnackbar(give_error_message(error.response), {
                  variant: "error",
                });
              });
          }
        }}
      >
        {({ resetForm, isSubmitting, errors, values }) => (
          <Form>
            <Grid container direction="column">
              <Container
                className="form-paper"
                elevation={3}
                component={Card}
                fixed
              >
                <CardHeader
                  title={
                    data === undefined ? "Crear Convenio" : "Editar Convenio"
                  }
                />
                <CardContent>
                  <Grid item container>
                    {entities.length !== 0 ? (
                      <Field
                        required
                        label="Entidad"
                        name="cod_entidad"
                        select
                        component={TextFormField}
                      >
                        {entities.map((entity, index) => (
                          <MenuItem
                            key={`entity-${index}`}
                            value={entity.cod_entidad}
                          >
                            {entity.razon_social_entidad}
                          </MenuItem>
                        ))}
                      </Field>
                    ) : (
                      <Field
                        required
                        label="Entidad"
                        name="cod_entidad"
                        select
                        disabled
                        component={TextFormField}
                      >
                        <MenuItem value=""></MenuItem>
                      </Field>
                    )}
                  </Grid>

                  <Grid
                    item
                    container
                    className={classes.paddingTop3}
                    spacing={3}
                  >
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
                      {services.length !== 0 ? (
                        <div>
                          <InputLabel id="servicios_label">
                            Servicios
                          </InputLabel>
                          <Field
                            name={"cod_servicios"}
                            component={Select}
                            multiple
                            required
                            fullWidth
                            renderValue={(selected) => (
                              <div className={classes.chips}>
                                {selected.map((value, index) => (
                                  <Chip
                                    key={`chips-${index}`}
                                    label={services
                                      .filter(
                                        (service) =>
                                          service.cod_servicio === value
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
                                  <MenuItem
                                    key={`menu-${index}`}
                                    value={service.cod_servicio}
                                  >
                                    {service.nombre_servicio}
                                  </MenuItem>
                                ))
                              : ""}
                          </Field>
                          <FormHelperText>{errors.servicios}</FormHelperText>
                        </div>
                      ) : (
                        <Field
                          required
                          label="Servicios"
                          name="cod_servicios"
                          select
                          disabled
                          component={TextFormField}
                        >
                          <MenuItem value=""></MenuItem>
                        </Field>
                      )}
                    </Grid>

                    <Grid item xs={12}>
                      {values.cod_servicios.map((code, index) => {
                        return (
                          <Field
                            key={`prices-${index}`}
                            required
                            label={`Precio ${services
                              .filter(
                                (service) => service.cod_servicio === code
                              )
                              .map((x) => x.nombre_servicio)}`}
                            name={`precios_servicios.${index}`}
                            component={TextFormField}
                            type={"number"}
                          />
                        );
                      })}
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions disableSpacing>
                  <FormButtons
                    to={"/Administrador/Convenios"}
                    data={data}
                    isSubmitting={isSubmitting}
                    resetForm={() => resetForm}
                  />
                </CardActions>
              </Container>
            </Grid>

            <BackDropLoading isSubmitting={isSubmitting} />
          </Form>
        )}
      </Formik>
    </MuiPickersUtilsProvider>
  );
}
