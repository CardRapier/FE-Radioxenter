import { Field, Form, Formik } from "formik";

import BackDropLoading from "../../BackDropLoading";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import TextField from "@material-ui/core/TextField";
import TextFormField from "../../Form/TextFormField";
import Typography from "@material-ui/core/Typography";
import { api_type_document } from "../../../api_app";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(4, 0, 2),
  },
  button: {
    marginRight: 4,
  },
  marginT: {
    marginTop: theme.spacing(3),
  },
}));

export default function ReceiptKinship() {
  const classes = useStyles();
  const [type_document, setTypeDocument] = React.useState([]);
  React.useEffect(() => {
    api_type_document.get("/").then((res) => {
      setTypeDocument(res.data.respuesta);
    });
  }, []);

  return (
    <React.Fragment>
      <Formik
        enableReinitialize
        onSubmit={(values, { setSubmitting, resetForm }) => {}}
      >
        {({ resetForm, isSubmitting, values }) => (
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
                  Parentesco
                </Typography>
              </Grid>

              <Grid item container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Field
                    required
                    label="Nombre"
                    name="nombre"
                    component={TextFormField}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    required
                    label="Apellidos"
                    name="apellidos"
                    component={TextFormField}
                  />
                </Grid>
              </Grid>
              <Grid item container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Field
                    required
                    label="Documento"
                    name="documento"
                    component={TextFormField}
                    type="number"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextFormField}
                    required
                    label="Tipo de documento"
                    name="cod_tipo_documento"
                    fullWidth
                    select
                  >
                    {type_document.map((type) => (
                      <MenuItem
                        key={type.cod_tipo_documento}
                        value={type.cod_tipo_documento}
                      >
                        {type.nombre_tipo_documento}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
              </Grid>
              <Grid item container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="kinship"
                    required
                    fullWidth
                    label="Parentesco"
                  />
                </Grid>
              </Grid>

              <Grid
                container
                item
                justify="flex-end"
                className={classes.marginT}
              >
                <Button
                  className={classes.button}
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  Cancelar
                </Button>

                <Button
                  className={classes.button}
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  Limpiar
                </Button>

                <Button
                  component={Link}
                  to="/Empleado/Consentimiento"
                  className={classes.button}
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  Crear
                </Button>
              </Grid>
            </Grid>
            <BackDropLoading isSubmitting={isSubmitting} />
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
}
