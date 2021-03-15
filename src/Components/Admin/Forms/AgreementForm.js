import { Field, Form, Formik } from "formik";

import BackDropLoading from "../../BackDropLoading";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import FormButtons from "../../FormButtons";
import Grid from "@material-ui/core/Grid";
import { KeyboardDatePicker } from "formik-material-ui-pickers";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import React from "react";
import TextFormField from "../../Form/TextFormField";
import { agreement_initial_values } from "./initial_values_admin";
import { agreement_schema } from "./validation_schemas_admin";
import { api_agreements } from "../../../api_app";
import { give_error_message } from "../../../utils";
import { useSnackbar } from "notistack";
import { useStyles } from "./styles";

export default function AgreementForm(props) {
  const classes = useStyles();
  const [data, setData] = React.useState(undefined);
  const { enqueueSnackbar } = useSnackbar();
  React.useEffect(() => {
    if (props.location.hasOwnProperty("data")) {
      setData(props.location.data);
    }
  }, [props.location]);

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Formik
        enableReinitialize
        validationSchema={agreement_schema}
        initialValues={
          data === undefined
            ? agreement_initial_values
            : {
                nom_servicio: data.nom_servicio,
                nom_entidad: data.nom_entidad,
                valor_servicio: data.valor_servicio,
                fecha_inicial_convenio: data.fecha_inicial_convenio,
                fecha_final_convenio: data.fecha_final_convenio,
              }
        }
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          api_agreements
            .put("", {
              fecha_inicial_convenio: values.fecha_inicial_convenio,
              fecha_final_convenio: values.fecha_final_convenio,
              valor_servicio: values.valor_servicio,
              cod_servicio: data.cod_servicio,
              cod_entidad: data.cod_entidad,
              cod_convenio: data.cod_convenio,
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
                <CardHeader title="Editar Convenio" />

                <CardContent>
                  <Grid item container>
                    <Field
                      disabled
                      label="Razon Social"
                      name="nom_entidad"
                      component={TextFormField}
                    />
                  </Grid>

                  <Grid item container>
                    <Field
                      disabled
                      label="Servicio"
                      name="nom_servicio"
                      component={TextFormField}
                    />
                  </Grid>

                  <Grid item container>
                    <Field
                      required
                      type={"number"}
                      label="Valor del servicio"
                      name="valor_servicio"
                      component={TextFormField}
                    />
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
