import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MomentUtils from "@date-io/moment";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

const optionsTypeDocument = ["CI", "TI", "CC", "DNI"];
const optionsSex = ["Masculino", "Femenino"];
const optionsGender = ["Masculino", "Femenino", "Ninguno"];
const optionsCity = [
  "Bogota",
  "Medellin",
  "Barranquillas",
  "Cali",
  "Cartagena",
];

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(4, 0, 2),
  },
  citypadding: {
    padding: theme.spacing(2, 0, 0),
  },
  button: {
    marginRight: 4,
  },
  buttons: {
    marginTop: theme.spacing(4),
  },
}));

export default function CreateUser() {
  const classes = useStyles();

  const [typeDocument, settypeDocument] = React.useState("");
  const [inputTypeDocument, setInputTypeDocument] = React.useState("");
  const [sex, setSex] = React.useState("");
  const [inputSex, setInputSex] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [inputGender, setInputGender] = React.useState("");
  const [city, setCity] = React.useState("");
  const [inputCity, setInputCity] = React.useState("");
  const [date, setDate] = React.useState(moment());

  const handleDateChange = (date) => {
    setDate(date);
  };

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
              Crear Usuario
            </Typography>
          </Grid>
        </Grid>

        <Grid container item>
          <Grid container direction="column">
            <Grid item container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField id="name" required fullWidth label="Nombres" />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="last-name"
                  required
                  fullWidth
                  label="Apellidos"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField id="address" required fullWidth label="Direccion" />
              </Grid>
            </Grid>

            <Grid item container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField id="telephone" required fullWidth label="Telefono" />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField id="cellphone" required fullWidth label="Celular" />
              </Grid>
            </Grid>
            <Grid item container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="ocupation"
                  required
                  fullWidth
                  label="Ocupacion"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField id="email" required fullWidth label="Correo" />
              </Grid>
            </Grid>

            <Grid item container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField id="document" required fullWidth label="Documento" />
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
            </Grid>
            <Grid item container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  value={sex}
                  onChange={(event, newValue) => {
                    setSex(newValue);
                  }}
                  inputValue={inputSex}
                  onInputChange={(event, newInputValue) => {
                    setInputSex(newInputValue);
                  }}
                  id="controllable-states-demo"
                  options={optionsSex}
                  style={{ fullWidth: true }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Sexo"
                      id="sex"
                      required
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  value={gender}
                  onChange={(event, newValue) => {
                    setGender(newValue);
                  }}
                  inputValue={inputGender}
                  onInputChange={(event, newInputValue) => {
                    setInputGender(newInputValue);
                  }}
                  id="controllable-states-demo"
                  options={optionsGender}
                  style={{ fullWidth: true }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Genero"
                      id="gender"
                      required
                      fullWidth
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid item container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  value={city}
                  onChange={(event, newValue) => {
                    setCity(newValue);
                  }}
                  inputValue={inputCity}
                  onInputChange={(event, newInputValue) => {
                    setInputCity(newInputValue);
                  }}
                  id="controllable-states-demo"
                  options={optionsCity}
                  style={{ fullWidth: true }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Ciudad"
                      id="city"
                      required
                      fullWidth
                    />
                  )}
                  className={classes.citypadding}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <Grid container>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="DD/MM/yyyy"
                      margin="normal"
                      id="date"
                      label="Fecha Nacimiento"
                      value={date}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>

            <Grid container item justify="flex-end" className={classes.buttons}>
              <Button
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
