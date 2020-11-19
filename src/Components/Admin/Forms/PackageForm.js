import { Field, Form, Formik } from "formik";

import BackDropLoading from "../../BackDropLoading";
import Chip from "@material-ui/core/Chip";
import FormButtons from "../../FormButtons";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import { Select } from "formik-material-ui";
import TextFormField from "../../Form/TextFormField";
import Typography from "@material-ui/core/Typography";
import { api_services } from "../../../api_app";
import { package_initial_values } from "./initial_values_admin";
import { package_schema } from "./validation_schemas_admin";
import { useStyles } from "./styles";

export default function ServiceForm(props) {
  const classes = useStyles();
  const [data, setData] = React.useState(undefined);
  const [services, setServices] = React.useState([]);

  React.useEffect(() => {
    api_services.get("/").then((res) => {
      setServices(res.data.respuesta);
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
      validationSchema={package_schema}
      initialValues={data === undefined ? package_initial_values : data}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(function () {
          setSubmitting(false);
        }, 2000);
      }}
    >
      {({ resetForm, isSubmitting, errors }) => (
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
                {data === undefined ? "Crear" : "Editar"} Paquete
              </Typography>
            </Grid>
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

            <Grid item container justify="center" className={classes.services}>
              <Grid item xs={12}>
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
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={services
                            .filter((service) => service.cod_servicio === value)
                            .map((x) => x.nombre_servicio)}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )}
                >
                  {services !== undefined
                    ? services.map((service) => (
                        <MenuItem value={service.cod_servicio}>
                          {service.nombre_servicio}
                        </MenuItem>
                      ))
                    : ""}
                </Field>
                <FormHelperText>{errors.servicios}</FormHelperText>
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
                to={"/Administrador/Paquetes"}
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
