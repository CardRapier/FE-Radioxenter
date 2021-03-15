import { Field, Form, Formik } from "formik";
import { api_packages, api_services } from "../../../api_app";
import { give_error_message, remove_abbreviation } from "../../../utils.js";

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
import TextFormField from "../../Form/TextFormField";
import { package_initial_values } from "./initial_values_admin";
import { package_schema } from "./validation_schemas_admin";
import { useSnackbar } from "notistack";
import { useStyles } from "./styles";

export default function ServiceForm(props) {
  const classes = useStyles();
  const [data, setData] = React.useState(undefined);
  const [services, setServices] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();
  React.useEffect(() => {
    if (props.location.hasOwnProperty("data")) {
      setData(props.location.data);
    }
  }, [props.location]);

  React.useEffect(() => {
    if (props.location.hasOwnProperty("data")) {
      api_packages
        .get(`/${props.location.data.cod_paquete}/servicios`)
        .then((res) => {
          setData((data) => ({
            ...data,
            packages: res.data.respuesta.map((element) => element.cod_servicio),
          }));
        });
    }
  }, [props.location]);

  React.useEffect(() => {
    api_services
      .get("/", {
        params: {
          excludeConvenios: true,
          excludePaquetes: true,
        },
      })
      .then((res) => {
        setServices(remove_abbreviation(res.data.respuesta, "SE-"));
      })
      .catch((error) => {
        enqueueSnackbar(
          "No hay servicios en el sistema, por favor agregue un servicio antes de crear paquetes.",
          {
            variant: "warning",
          }
        );
      });
  }, [enqueueSnackbar]);

  return (
    <Formik
      enableReinitialize
      validationSchema={package_schema}
      initialValues={
        data === undefined
          ? package_initial_values
          : data.packages !== undefined
          ? {
              nombre_paquete: data.nombre_paquete,
              precio_paquete: data.precio_paquete,
              servicios: data.packages,
              valor_antiguo: data.nombre_paquete,
            }
          : package_initial_values
      }
      onSubmit={(values, { setSubmitting, resetForm }) => {
        if (data === undefined) {
          setSubmitting(true);
          api_packages
            .post("/", {
              nombre_paquete: values.nombre_paquete,
              precio_paquete: values.precio_paquete,
            })
            .then(function (response) {
              let id_package = response.data.respuesta.cod_paquete;
              values.servicios.map((servicio) =>
                api_packages.post(`/${id_package}/servicios/`, {
                  cod_servicio: servicio,
                })
              );

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
          api_packages
            .put("/", {
              cod_paquete: data.cod_paquete,
              nombre_paquete: values.nombre_paquete,
              precio_paquete: values.precio_paquete,
              valor_antiguo: values.valor_antiguo,
            })
            .then(function (response) {
              let id_package = data.cod_paquete;
              api_packages.put(`/${id_package}/servicios/`, {
                servicios_paquete: values.servicios,
              });
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
                title={data === undefined ? "Crear Paquete" : "Editar Paquete"}
              />

              <CardContent>
                <Grid item container>
                  <Field
                    required
                    label="Nombre del Paquete"
                    name="nombre_paquete"
                    component={TextFormField}
                  />
                </Grid>
                <Grid item container>
                  <Field
                    required
                    type="number"
                    label="Precio"
                    name="precio_paquete"
                    component={TextFormField}
                  />
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
                        <InputLabel id="servicios_label">Servicios</InputLabel>
                        <Field
                          name={`servicios`}
                          type="select"
                          component={Select}
                          label_id="servicios_label"
                          multiple
                          required
                          fullWidth
                          renderValue={(selected) => (
                            <div className={classes.chips}>
                              {selected.map((value, index) => (
                                <Chip
                                  key={`${value}-${index}`}
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
                          {services.map((service, index) => (
                            <MenuItem
                              key={`menu-${index}`}
                              value={service.cod_servicio}
                            >
                              {service.nombre_servicio}
                            </MenuItem>
                          ))}
                        </Field>
                        <FormHelperText>{errors.servicios}</FormHelperText>
                      </div>
                    ) : (
                      <Field
                        required
                        label="Servicios"
                        name="servicios"
                        select
                        disabled
                        component={TextFormField}
                      >
                        <MenuItem value=""></MenuItem>
                      </Field>
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
                    to={"/Administrador/Paquetes"}
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
