import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const optionsTypeDocument = ["CI", "TI", "CC", "DNI"];

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

  const [typeDocument, settypeDocument] = React.useState("");
  const [inputTypeDocument, setInputTypeDocument] = React.useState("");

  return (
    <React.Fragment>
      <Grid container direction={"column"}>
        <Grid container item className={classes.title} spacing={4}>
          <Grid item>
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

          <Grid container item>
            <Grid container direction={"column"}>
              <Grid item container spacing={3}>
                <Grid item xs={12} sm={6} spacing={3}>
                  <TextField
                    id="companion"
                    disabled
                    value={"Edilberto"}
                    fullWidth
                    label="Nombre"
                  />
                </Grid>

                <Grid item xs={12} sm={6} spacing={3}>
                  <TextField
                    id="companion"
                    disabled
                    value={"Guzman Beltran"}
                    fullWidth
                    label="Apellidos"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    id="document"
                    required
                    fullWidth
                    label="Documento"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    value={typeDocument}
                    onChange={(event, newValue) => {
                      settypeDocument(newValue);
                    }}
                    inputValue={inputTypeDocument}
                    onInputChange={(event, newInputValue) => {
                      setInputTypeDocument(newInputValue);
                    }}
                    id="controllable-states-demo"
                    options={optionsTypeDocument}
                    style={{ fullWidth: true }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Tipo Documento"
                        id="type_document"
                        required
                        fullWidth
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    id="kinship"
                    required
                    fullWidth
                    label="Parentesco"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container item justify="flex-end" className={classes.marginT}>
              <Button
                component={Link}
                to="/Empleado/CrearFactura"
                className={classes.button}
                variant="contained"
                color="primary"
              >
                Crear
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
              >
                Limpiar
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
