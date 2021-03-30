import { Field, Form, Formik } from "formik";

import BackDropLoading from "../../BackDropLoading";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { CheckboxWithLabel } from "formik-material-ui";
import Container from "@material-ui/core/Container";
import FormButtons from "../../FormButtons";
import Grid from "@material-ui/core/Grid";
import React from "react";
import TextFormField from "../../Form/TextFormField";
import { api_type_consent } from "../../../api_app";
import axios from "axios";
import { give_error_message } from "../../../utils";
import { useSnackbar } from "notistack";

export default function TypeConsentForm() {
  const [typeConsent, setTypeConsent] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    api_type_consent
      .get("/all")
      .then((res) => {
        setTypeConsent({ ...res.data.respuesta });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar(error.data.error, {
          variant: "error",
        });
      });
  }, [enqueueSnackbar]);
  return (
    <Formik
      enableReinitialize
      initialValues={typeConsent}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        axios
          .all(
            Object.keys(typeConsent).map((element) =>
              api_type_consent.put("/", values[element])
            )
          )
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
          <Grid container direction="column">
            <Container
              className="form-paper"
              elevation={3}
              component={Card}
              fixed
            >
              <CardHeader title="Tipos de consentimientos" />
              <CardContent>
                {Object.keys(typeConsent).map((element, index) => (
                  <Grid
                    key={`consent-${index}`}
                    item
                    container
                    alignItems="flex-end"
                  >
                    <Grid item xs={5}>
                      <Field
                        disabled
                        label="Nombre"
                        name={`${element}.nombre_tipo_consentimiento`}
                        component={TextFormField}
                      />
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={5}>
                      <Field
                        component={CheckboxWithLabel}
                        type="checkbox"
                        name={`${element}.activo`}
                        Label={{ label: "Estado" }}
                      />
                    </Grid>
                  </Grid>
                ))}
              </CardContent>
              <CardActions disableSpacing>
                <Grid item container justify="flex-end" spacing={3}>
                  <FormButtons
                    to={"/Administrador"}
                    data="Crear"
                    isSubmitting={isSubmitting}
                    resetForm={() => resetForm}
                  />
                </Grid>
              </CardActions>
            </Container>
          </Grid>
          <BackDropLoading isSubmitting={isSubmitting} />
          <BackDropLoading isSubmitting={loading} />
        </Form>
      )}
    </Formik>
  );
}
