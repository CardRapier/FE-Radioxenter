import { Field, Form, Formik } from "formik";
import { give_error_message } from "../../../utils";

import BackDropLoading from "../../BackDropLoading";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import FormButtons from "../../FormButtons";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { api_report } from "../../../api_app";
import { useSnackbar } from "notistack";
import { KeyboardDatePicker } from "formik-material-ui-pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";

export const ReportForm = () => {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      enableReinitialize
      initialValues={{ fecha_inicial: moment(), fecha_final: moment() }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        api_report
          .post("generarReporte", values)
          .then((response) => {
            setSubmitting(false);
            enqueueSnackbar("Se ha actualizado exitosamente!", {
              variant: "success",
            });
          })
          .catch((error) => {
            setSubmitting(false);
            enqueueSnackbar(give_error_message(error.response), {
              variant: "error",
            });
          });
      }}
    >
      {({ values, isSubmitting, resetForm }) => (
        <Form>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Grid container direction="column">
              <Container
                className="form-paper"
                elevation={3}
                component={Card}
                fixed
              >
                <CardHeader title="Reporte" />
                <CardContent>
                  <Grid item container spacing={3}>
                    <Grid item xs={6}>
                      <Field
                        fullWidth
                        format="DD/MM/yyyy"
                        component={KeyboardDatePicker}
                        label="label"
                        name="fecha_inicial"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        fullWidth
                        format="DD/MM/yyyy"
                        component={KeyboardDatePicker}
                        label="label"
                        name="fecha_final"
                      />
                    </Grid>
                  </Grid>
                </CardContent>

                <CardActions disableSpacing>
                  <Grid item container justify="flex-end" spacing={3}>
                    <FormButtons
                      to={"/Empleado/"}
                      data="Guardar"
                      isSubmitting={isSubmitting}
                      resetForm={() => resetForm}
                    />
                  </Grid>
                </CardActions>
              </Container>
            </Grid>
            <BackDropLoading isSubmitting={isSubmitting} />
          </MuiPickersUtilsProvider>
        </Form>
      )}
    </Formik>
  );
};
