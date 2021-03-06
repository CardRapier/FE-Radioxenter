import { Field, Form, Formik } from "formik";
import { Link, Redirect } from "react-router-dom";
import {
  api_doctors,
  api_entities,
  api_process,
  api_services,
} from "../../../api_app";

import AddIcon from "@material-ui/icons/Add";
import AutocompleteForm from "../../Form/AutocompleteForm";
import BackDropLoading from "../../BackDropLoading";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/Button";
import { KeyboardDatePicker } from "formik-material-ui-pickers";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MuiTextField from "@material-ui/core/TextField";
import React from "react";
import ReceiptServiceTable from "./ReceiptServiceTable";
import Typography from "@material-ui/core/Typography";
import { give_error_message } from "../../../utils";
import { makeStyles } from "@material-ui/core/styles";
import publicIp from "public-ip";
import { receipt_initial_values } from "../Forms/initial_values_employee";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(4, 0, 2),
  },
  pading: {
    marginTop: 14,
  },
  paddingBot: {
    paddingBottom: theme.spacing(1),
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
  const [ipv4, setIpv4] = React.useState(undefined);
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
    let array = [...servicesSelected];
    setServicesSelected(array.filter((service) => service.cod_servicio !== id));
  }

  function filter_services(services, abbreviation) {
    let filtered_services = services.filter((service) =>
      service.nombre_servicio.includes(abbreviation)
    );

    for (let i in filtered_services) {
      filtered_services[i].nombre_servicio = filtered_services[
        i
      ].nombre_servicio.replace(abbreviation, "");
    }

    return filtered_services;
  }

  function evaluate_total_value() {
    let sum = 0;
    for (let i in servicesSelected) {
      sum = sum + servicesSelected[i].precio_servicio;
    }

    return sum;
  }

  const evaluate_entity_doctor = (entity, doctor) => {
    let doctor_entity =
      entity !== null && doctor !== null
        ? doctor.Entidad_doctors.find(
            (element) => element.cod_entidad === entity.cod_entidad
          )
        : null;
    return doctor_entity;
  };

  const handleChange = (e) => {
    setMotive(e.target.value);
  };

  const filter_entities = (doctor) => {
    let filtered_entities = doctor.Entidad_doctors.map((entity_doctor) =>
      entitiesAgreements.find(
        (entity) => entity.cod_entidad === entity_doctor.cod_entidad
      )
    );

    return filtered_entities;
  };

  const filter_agreements = (entity) => {
    let entity_agreement = [];

    if (entity != null) {
      let agreements_codes = entity.Convenios.map(
        (element) => element.cod_servicio
      );

      for (var i in agreements_codes) {
        let code = agreements_codes[i];
        let aux_service = agreements.find(
          (element) => element.cod_servicio === code
        );
        let service = Object.assign({}, aux_service);
        entity_agreement.push(service);
        entity_agreement[i].precio_servicio = entity.Convenios.find(
          // eslint-disable-next-line
          (e) => e.cod_servicio === entity_agreement[i].cod_servicio
        ).valor_servicio;
      }
    }

    return entity_agreement;
  };

  const validate_selected_services = () => {
    let response = false;
    if (servicesSelected.length !== 0) {
      response = true;
    }
    return response;
  };

  React.useEffect(
    () => {
      publicIp.v4().then((e) => setIpv4(e));

      api_services.get("/").then((res) => {
        setServices(filter_services(res.data.respuesta, "SE-"));
        setPackages(filter_services(res.data.respuesta, "PA-"));
        setAgreements(res.data.respuesta);
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
  //TODO: revisar la ip 4
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Formik
        enableReinitialize
        initialValues={{ ...receipt_initial_values }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          if (validate_selected_services() === true) {
            let petitionData = { ...values };
            let final_data = {
              ...petitionData,
              documento_usuario: data.documento_usuario,
              valor_transaccion: evaluate_total_value(),
              cod_entidad_doctor:
                values.entity !== null && values.doctor !== null
                  ? evaluate_entity_doctor(values.entity, values.doctor)
                      .cod_entidad_doctor
                  : null,
              motivo: motive,
              ipv4: ipv4,
              servicios: servicesSelected,
            };

            delete final_data.doctor;
            delete final_data.entity;
            delete final_data.service;

            api_process
              .post("agregarTransaccion", final_data)
              .then(function (response) {
                setSubmitting(false);
                enqueueSnackbar(
                  "Se ha agregado la transaccion exitososamente!",
                  {
                    variant: "success",
                  }
                );
                setRedirect(true);
              })
              .catch(function (error) {
                setSubmitting(false);
                enqueueSnackbar(give_error_message(error.response), {
                  variant: "error",
                });
              });
          } else {
            setSubmitting(false);
            enqueueSnackbar("Se deben seleccionar servicios ", {
              variant: "error",
            });
          }
        }}
      >
        {({ resetForm, isSubmitting, values }) => (
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
                    <Grid
                      item
                      container
                      spacing={3}
                      justify="flex-start"
                      alignItems="flex-start"
                    >
                      <Grid item xs={12} sm={6}>
                        <MuiTextField
                          id="user"
                          disabled
                          value={
                            data !== undefined && tutor === undefined
                              ? `${data.nombres_usuario} ${data.apellidos_usuario}`
                              : tutor !== undefined
                              ? `${tutor.nombres_tutor} ${tutor.apellidos_tutor}`
                              : "Lmao"
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
                          disableClearable
                          component={AutocompleteForm}
                          options={doctors}
                          getOptionLabel={(option) =>
                            `${option.nombres_doctor} ${option.apellidos_doctor}`
                          }
                          onChange={(value, setFieldValue) => {
                            let entity = entitiesAgreements.find(
                              (e) =>
                                e.cod_entidad ===
                                value.Entidad_doctors[0].cod_entidad
                            );
                            setFieldValue("entity", entity);
                            if (values.tipo_compra === "Convenio") {
                              setFieldValue(
                                "service",
                                filter_agreements(entity)[0]
                              );
                            }
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Field
                          name="entity"
                          label={"Entidad"}
                          required
                          component={AutocompleteForm}
                          disableClearable
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

                    <Grid
                      item
                      container
                      spacing={3}
                      className={classes.paddingBot}
                    >
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
                        <Field
                          name="tipo_compra"
                          label={"Tipo de Compra"}
                          required
                          disableClearable
                          component={AutocompleteForm}
                          options={
                            values.entity !== null &&
                            values.entity.Convenios !== undefined &&
                            values.entity.Convenios.length !== 0
                              ? ["Servicio", "Paquete", "Convenio"]
                              : ["Servicio", "Paquete"]
                          }
                          onChange={(value, setFieldValue) => {
                            if (value === "Servicio") {
                              setFieldValue("service", services[0]);
                            } else if (value === "Paquete") {
                              setFieldValue("service", packages[0]);
                            } else {
                              setFieldValue(
                                "service",
                                filter_agreements(values.entity)[0]
                              );
                            }
                          }}
                        />
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
                  component={Link}
                  to={"/Empleado/"}
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Volver
                </Button>

                <Button
                  size="small"
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={() => resetForm({})}
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
