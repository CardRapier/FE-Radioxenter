import { Form, Formik } from "formik";
import { give_error_message, omitPropertyFromJson } from "../../../utils";

import BackDropLoading from "../../BackDropLoading";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import EnumerationForm from "./EnumerationForm";
import FormButtons from "../../FormButtons";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { api_numerations } from "../../../api_app";
import axios from "axios";
import { enumeration_initial_values } from "./initial_values_admin";
import { enumerations_schema } from "./validation_schemas_admin";
import { useSnackbar } from "notistack";

export default function EnumerationContainer() {
  const [numeration, setNumeration] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    api_numerations.get("/").then((res) => setNumeration(res.data.respuesta));
  }, []);
  return (
    <Formik
      enableReinitialize
      validationSchema={enumerations_schema}
      initialValues={
        numeration.length === 0
          ? {
              formA: enumeration_initial_values,
              formB: enumeration_initial_values,
              formC: enumeration_initial_values,
              formD: enumeration_initial_values,
            }
          : {
              formA: omitPropertyFromJson(numeration[0], [
                "createdAt",
                "updatedAt",
              ]),
              formB: omitPropertyFromJson(numeration[1], [
                "createdAt",
                "updatedAt",
              ]),
              formC: omitPropertyFromJson(numeration[2], [
                "createdAt",
                "updatedAt",
              ]),
              formD: omitPropertyFromJson(numeration[3], [
                "createdAt",
                "updatedAt",
              ]),
            }
      }
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        axios
          .all([
            api_numerations.put("/", values.formA),
            api_numerations.put("/", values.formB),
            api_numerations.put("/", values.formC),
            api_numerations.put("/", values.formD),
          ])
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
        setSubmitting(false);
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
              <CardHeader title="Enumeración" />
              <CardContent>
                <Grid item container spacing={3}>
                  <EnumerationForm
                    enumerationName={values.formA.numeracion_nombre}
                    name={"formA"}
                  />
                </Grid>
                <Grid item container spacing={3}>
                  <EnumerationForm
                    enumerationName={values.formB.numeracion_nombre}
                    name={"formB"}
                  />
                </Grid>
                <Grid item container spacing={3}>
                  <EnumerationForm
                    enumerationName={values.formC.numeracion_nombre}
                    name={"formC"}
                  />
                </Grid>
                <Grid item container spacing={3}>
                  <EnumerationForm
                    enumerationName={values.formD.numeracion_nombre}
                    name={"formD"}
                  />
                </Grid>
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
        </Form>
      )}
    </Formik>
  );
}
