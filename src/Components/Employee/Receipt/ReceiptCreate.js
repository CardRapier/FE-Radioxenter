import { Button, IconButton } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import AddIcon from "@material-ui/icons/Add";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import MomentUtils from "@date-io/moment";
import React from "react";
import ReceiptServiceTable from "./ReceiptServiceTable"
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

const optionsTypeBuy = ["Servicio", "Paquete"];
const optionsServices = ["Panorámica", "Senos Paranasales", "ATM"];

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(4, 0, 2),
  },
  pading: {
    marginTop: 14,
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
  //const row = props.location.data;
  const classes = useStyles();

  const [date, setDate] = React.useState(moment());
  const [tipoCompra, settipoCompra] = React.useState("");
  const [inputTipoCompra, setInputTipoCompra] = React.useState("");

  const [services, setServices] = React.useState("");
  const [inputServices, setInputServices] = React.useState("");

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
              Facturación
            </Typography>
          </Grid>
        </Grid>

        <Grid container item>
          <Grid container direction="column">
            <Grid item container spacing={3}>
              <Grid item xs={12} sm={6} className={classes.pading}>
                <TextField
                  id="user"
                  disabled
                  value={"Santiago Guzman"}
                  fullWidth
                  label="Usuario"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="DD/MM/yyyy"
                    margin="normal"
                    id="date"
                    label="Fecha"
                    fullWidth
                    value={date}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
            <Grid item container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="doctor"
                  required
                  fullWidth
                  label="Nombre Doctor/Doctora"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="motive"
                  required
                  fullWidth
                  label="Motivo del procedimiento"
                />
              </Grid>
            </Grid>

            <Grid item container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="entity"
                  required
                  fullWidth
                  label="Nombre Entidad"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="pref_shipment"
                  required
                  fullWidth
                  label="Medio de entrega"
                />
              </Grid>
            </Grid>

            <Grid item container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  value={tipoCompra}
                  onChange={(event, newValue) => {
                    settipoCompra(newValue);
                  }}
                  inputValue={inputTipoCompra}
                  onInputChange={(event, newInputValue) => {
                    setInputTipoCompra(newInputValue);
                  }}
                  id="controllable-states-demo"
                  options={optionsTypeBuy}
                  style={{ fullWidth: true }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tipo Compra"
                      id="type"
                      fullWidth
                    />
                  )}
                />
              </Grid>

              <Grid item xs={10} sm={5}>
                <Autocomplete
                  value={services}
                  onChange={(event, newValue) => {
                    setServices(newValue);
                  }}
                  inputValue={inputServices}
                  onInputChange={(event, newInputValue) => {
                    setInputServices(newInputValue);
                  }}
                  id="controllable-states-demo"
                  options={optionsServices}
                  style={{ fullWidth: true }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Buscar servicio"
                      id="services"
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={2} sm={1}>
                <IconButton>
                  <AddIcon></AddIcon>
                </IconButton>
              </Grid>

              <Grid item xs={12}>
                <ReceiptServiceTable />
              </Grid>
            </Grid>

          </Grid>
        </Grid>
        <Grid container item justify="flex-end" className={classes.buttons}>
              <Button
              component={Link}
              to='/Empleado/Consentimiento'
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
    </React.Fragment>
  );
}
