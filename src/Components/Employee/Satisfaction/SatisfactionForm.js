import { Field, Form, Formik } from "formik";

import BackDropLoading from "../../BackDropLoading";
import Button from "@material-ui/core/Button";
import { Checkbox } from "formik-material-ui";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import { RadioGroup } from "formik-material-ui";
import React from "react";
import SatisfactionRadioForm from "./SatisfactionRadioForm";
import TextFormField from "../../Form/TextFormField";
import Typography from "@material-ui/core/Typography";
import { api_satisfaction } from "../../../api_app";
import { give_error_message } from "../../../utils";
import { satisfaction_initial_values } from "../Forms/initial_values_employee";
import { useSnackbar } from "notistack";

export default function SatisfactionForm(props) {
  const { data, setSurvey } = props;

  const { enqueueSnackbar } = useSnackbar();
  return (
    <React.Fragment>
      <Formik
        enableReinitialize
        initialValues={satisfaction_initial_values}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          api_satisfaction
            .post("/", { ...values, documento_usuario: data.documento_usuario })
            .then((res) => {
              setSubmitting(false);
              setSurvey(false);
              enqueueSnackbar("Se ha enviado el formulario exitosamente!", {
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
        {({ isSubmitting, values }) => (
          <Form>
            <Grid container direction="column">
              <Grid container item>
                <Grid item>
                  <SatisfactionRadioForm
                    name={"experiencia_satisfaccion"}
                    text={
                      "1. ¿Cómo calificaría su experiencia global respecto a los servicios que ha recibido en RADIOXENTER?"
                    }
                  />
                </Grid>
                <Grid item>
                  <SatisfactionRadioForm
                    name={"amabilidad_atencion_satisfaccion"}
                    text={"2. Amabilidad en atención al usuario:"}
                  />
                </Grid>
                <Grid item>
                  <SatisfactionRadioForm
                    name={"amabilidad_radiologo_satisfaccion"}
                    text={"3. Amabilidad por el radiólogo:"}
                  />
                </Grid>
                <Grid item>
                  <SatisfactionRadioForm
                    name={"presentacion_satisfaccion"}
                    text={"4. Presentación del personal:"}
                  />
                </Grid>
                <Grid item>
                  <SatisfactionRadioForm
                    name={"tiempo_espera_satisfaccion"}
                    text={"5. Tiempo de espera:"}
                  />
                </Grid>
                <Grid item>
                  <SatisfactionRadioForm
                    name={"tiempo_entrega_satisfaccion"}
                    text={"6. Tiempo entre la toma y entrega de exámenes:"}
                  />
                </Grid>
                <Grid item>
                  <SatisfactionRadioForm
                    name={"indicacion_satisfaccion"}
                    text={
                      "7. Indicación previa a la toma de Rx – fotos - modelos:"
                    }
                  />
                </Grid>
                <Grid item>
                  <SatisfactionRadioForm
                    name={"privacidad_satisfaccion"}
                    text={
                      "8. Privacidad de la atención y manejo de resultados:"
                    }
                  />
                </Grid>
                <Grid item>
                  <Field
                    component={RadioGroup}
                    name="recomendacion_satifasfaccion"
                  >
                    <Typography>
                      ¿Recomendaría a sus familiares y amigos esta IPS?
                    </Typography>
                    <Grid container>
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Probablemente no"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="Definitivamente no"
                      />
                      <FormControlLabel
                        value="3"
                        control={<Radio />}
                        label="Probablemente si"
                      />
                      <FormControlLabel
                        value="4"
                        control={<Radio />}
                        label="Definitivamente si"
                      />
                    </Grid>
                  </Field>
                </Grid>
                <Grid item>
                  <SatisfactionRadioForm
                    name={"ubicacion_satisfaccion"}
                    text={"9. Ubicación, facilidad de acceso a la sede:"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container alignItems="center">
                    <Typography>
                      10, Se realizo la entrega de las recomendaciones por toma
                      de la RX
                    </Typography>
                    <Field
                      component={Checkbox}
                      type="checkbox"
                      name="entrega_recomendacion_satisfaccion"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    Si tiene alguna felicitacion queja o reclamo puede
                    describirlo a continuaciòn:
                  </Typography>
                  <Field
                    multiline
                    fullWidth
                    name="sugerencias_satisfaccion"
                    component={TextFormField}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container item justify="flex-end" alignItems="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="small"
              >
                Enviar
              </Button>
            </Grid>
            <BackDropLoading isSubmitting={isSubmitting} />
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
}
