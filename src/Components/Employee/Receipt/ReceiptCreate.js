import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import {
  api_doctors,
  api_entities,
  api_process,
  api_services,
} from "../../../api_app";

import AddIcon from "@material-ui/icons/Add";
import AutocompleteForm from "../../Form/AutocompleteForm";
import BackDropLoading from "../../BackDropLoading";
import Grid from "@material-ui/core/Grid";
import { KeyboardDatePicker } from "formik-material-ui-pickers";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MuiTextField from "@material-ui/core/TextField";
import React from "react";
import ReceiptServiceTable from "./ReceiptServiceTable";
import { Redirect } from "react-router-dom";
import { Select } from "formik-material-ui";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { receipt_initial_values } from "../Forms/initial_values_employee";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(4, 0, 2),
  },
  pading: {
    marginTop: 14,
  },
  button: {
    marginRight: 4,
  },
  buttons: {
    marginTop: theme.spacing(4),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function ReceiptCreate(props) {
  const { data, tutor } = props.location;
  const classes = useStyles();
  const [redirect, setRedirect] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [servicesSelected, setServicesSelected] = React.useState([]);
  const [services, setServices] = React.useState([]);
  const [packages, setPackages] = React.useState([]);
  const [agreements, setAgreements] = React.useState([]);
  const [motive, setMotive] = React.useState("");

  const [doctors, setDoctors] = React.useState([]);
  const [entitiesAgreements, setEntitiesAgreements] = React.useState([]);

  function add_service(service) {
    setServicesSelected(() => [...servicesSelected, service]);
  }

  function remove_service(id) {
    var array = [...servicesSelected];
    setServicesSelected(array.filter((service) => service.cod_servicio !== id));
  }

  function filter_services(services, abbreviation) {
    var filtered_services = services.filter((service) =>
      service.nombre_servicio.includes(abbreviation)
    );

    for (var i in filtered_services) {
      filtered_services[i].nombre_servicio = filtered_services[
        i
      ].nombre_servicio.replace(abbreviation, "");
    }

    return filtered_services;
  }

  function evaluate_total_value() {
    var sum = 0;
    for (var i in servicesSelected) {
      sum = sum + servicesSelected[i].precio_servicio;
    }

    return sum;
  }

  const evaluate_entity_doctor = (entity, doctor) => {
    var doctor_entity = doctor.Entidad_doctors.find(
      (element) => element.cod_entidad === entity.cod_entidad
    );
    console.log(doctor_entity);
    return doctor_entity;
  };

  const handleChange = (e) => {
    setMotive(e.target.value);
  };

  const filter_entities = (doctor) => {
    var filtered_entities = doctor.Entidad_doctors.map((entity_doctor) =>
      entitiesAgreements.find(
        (entity) => entity.cod_entidad === entity_doctor.cod_entidad
      )
    );

    return filtered_entities;
  };

  const filter_agreements = (entity) => {
    var entity_agreement = [];
    var agreements_codes = entity.Convenios.map(
      (element) => element.cod_servicio
    );

    for (var i in agreements_codes) {
      var code = agreements_codes[i];
      entity_agreement.push(
        agreements.find((element) => element.cod_servicio === code)
      );
    }
    return entity_agreement;
  };

  //TODO:Validate
  const validate_doctor_entity = () => {};
  const validate_services_agreements = () => {};
  //TODO: Review if this can be better
  React.useEffect(
    () => {
      api_services.get("/").then((res) => {
        setServices(filter_services(res.data.respuesta, "SE-"));
        setPackages(filter_services(res.data.respuesta, "PA-"));
        setAgreements(filter_services(res.data.respuesta, "CO-"));
      });

      api_doctors.get("/").then((res) => {
        setDoctors(res.data.respuesta);
      });

      api_entities.get("/convenios").then((res) => {
        setEntitiesAgreements(res.data.respuesta);
      });
    },
    [props.location],
    []
  );
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      {/* //TODO: SEND documento_usuario, valor_transaccion, cod_entidad_doctor AND motive*/}
      <Formik
        enableReinitialize
        initialValues={{ ...receipt_initial_values }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          var petitionData = { ...values };
          var final_data = {
            ...petitionData,
            documento_usuario: data.documento_usuario,
            valor_transaccion: evaluate_total_value(),
            cod_entidad_doctor: evaluate_entity_doctor(
              values.entity,
              values.doctor
            ).cod_entidad_doctor,
            motivo: motive,
            servicios: servicesSelected,
          };

          delete final_data.doctor;
          delete final_data.entity;
          delete final_data.service;

          api_process
            .post("agregarTransaccion", final_data)
            .then(function (response) {
              setSubmitting(false);
              enqueueSnackbar("Se ha agregado la transaccion exitososamente!", {
                variant: "success",
              });
              setRedirect(true);
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
        }}
      >
        {({ resetForm, isSubmitting, values, touched, errors }) => (
          <Form>
            <Grid container direction={"column"}>
              <Grid>
                <Grid container item className={classes.title} spacing={4}>
                  <Grid item>
                    <Typography
                      component="h1"
                      variant="h5"
                      align="left"
                      color="textPrimary"
                      gutterBottom
                    >
                      Transacción
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item>
                  <Grid container direction="column">
                    <Grid item container spacing={3}>
                      <Grid item xs={12} sm={6} className={classes.pading}>
                        {/* TODO: Add conditional when the tutor exists */}
                        <MuiTextField
                          id="user"
                          disabled
                          value={
                            data !== undefined && tutor === undefined
                              ? `${data.nombres_usuario} ${data.apellidos_usuario}`
                              : tutor !== undefined
                              ? `${tutor.nombres_tutor} ${tutor.apellidos_tutor}`
                              : ""
                          }
                          fullWidth
                          label="Usuario"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field
                          format="DD/MM/yyyy"
                          component={KeyboardDatePicker}
                          label="Fecha"
                          name="fecha_transaccion"
                          fullWidth
                          disabled
                        />
                      </Grid>
                    </Grid>
                    <Grid item container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Field
                          name="doctor"
                          label={"Nombre Doctor/Doctora"}
                          required
                          component={AutocompleteForm}
                          options={doctors}
                          getOptionLabel={(option) =>
                            `${option.nombres_doctor} ${option.apellidos_doctor}`
                          }
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Field
                          name="entity"
                          label={"Entidad"}
                          required
                          component={AutocompleteForm}
                          options={
                            values.doctor != null
                              ? filter_entities(values.doctor)
                              : entitiesAgreements
                          }
                          getOptionLabel={(option) =>
                            `${option.nombre_comercial_entidad}`
                          }
                        />
                      </Grid>
                    </Grid>

                    <Grid item container spacing={3}>
                      <Grid item xs={12}>
                        <MuiTextField
                          value={motive}
                          required
                          onChange={handleChange}
                          fullWidth
                          label="Motivo del procedimiento"
                          multiline
                        />
                      </Grid>
                    </Grid>

                    <Grid item container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor="type_service">
                            Tipo Compra
                          </InputLabel>
                          <Field
                            component={Select}
                            name="tipo_compra"
                            inputProps={{
                              id: "type_service",
                            }}
                            fullWidth
                          >
                            <MenuItem value={"Servicio"}>Servicio</MenuItem>
                            <MenuItem value={"Paquete"}>Paquete</MenuItem>
                            <MenuItem value={"Convenio"}>Convenio</MenuItem>
                          </Field>
                        </FormControl>
                      </Grid>

                      <Grid item xs={10} sm={5}>
                        <Field
                          name="service"
                          label={(() => {
                            if (values.tipo_compra === "Servicio") {
                              return "Servicios";
                            } else if (values.tipo_compra === "Paquete") {
                              return "Paquetes";
                            } else {
                              return "Convenios";
                            }
                          })()}
                          component={AutocompleteForm}
                          options={(() => {
                            if (values.tipo_compra === "Servicio") {
                              return services;
                            } else if (values.tipo_compra === "Paquete") {
                              return packages;
                            } else {
                              return filter_agreements(values.entity);
                            }
                          })()}
                          getOptionLabel={(option) => option.nombre_servicio}
                        />
                      </Grid>
                      <Grid item xs={2} sm={1}>
                        <IconButton onClick={() => add_service(values.service)}>
                          <AddIcon></AddIcon>
                        </IconButton>
                      </Grid>

                      <Grid item xs={12}>
                        <ReceiptServiceTable
                          servicesSelected={servicesSelected}
                          remove_service={remove_service}
                          evaluate_total_value={evaluate_total_value}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                item
                justify="flex-end"
                className={classes.buttons}
              >
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Cancelar
                </Button>

                <Button
                  size="small"
                  className={classes.button}
                  variant="contained"
                  color="primary"
                >
                  Limpiar
                </Button>
                <Button
                  className={classes.button}
                  variant="contained"
                  size="small"
                  color="primary"
                  type="submit"
                >
                  Crear
                </Button>
              </Grid>
            </Grid>
            <BackDropLoading isSubmitting={isSubmitting} />
            {redirect === true ? (
              <Redirect
                to={{
                  pathname: "/Empleado/Consentimiento",
                  data: data,
                  tutor: tutor,
                  transaccion: values,
                }}
              />
            ) : (
              ""
            )}
          </Form>
        )}
      </Formik>
    </MuiPickersUtilsProvider>
  );
}
