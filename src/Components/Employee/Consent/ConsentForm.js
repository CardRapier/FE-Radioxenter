import { Text, Text1, Text2, Text3 } from "./ConsentText.js";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(4, 0, 4),
  },
  buttons: {
    padding: theme.spacing(4, 0, 4),
  },
  border: {
    border: "1px solid",
  },
  signature: {
    height: "45mm",
    width: "120mm",
    border: "1px solid #d3d3d3",
    backgroundColor: "#FFFFFF ",
  },
}));

export default function ConsentForm() {
  const classes = useStyles();

  const text = Text;
  const text1 = Text1;
  const text2 = Text2;
  const text3 = Text3;

  return (
    <React.Fragment>
      <Grid container direction="column">
        <Grid container className={classes.title} item spacing={4}>
          <Grid item>
            <Typography
              component="h1"
              variant="h5"
              align="left"
              color="textPrimary"
              gutterBottom
            >
              Documento de Consentimiento
            </Typography>
          </Grid>
        </Grid>
        {/*//TODO: Añadir diferentes formas de mostrar el consentimiento*/}
        <Grid container item spacing={4}>
          <Typography variant="h6">
            Yo, Fabian Ricardo Alfonso Tirado
          </Typography>
          <Typography variant="body1">{text}</Typography>
          <Typography variant="body1">{text1}</Typography>
          <Typography variant="body1">{text2}</Typography>
          <Typography variant="body1">{text3}</Typography>
          {/*//TODO: Añadir datos del usuario que firmara*/}
          <Grid container item justify="flex-end">
            <Grid item>
              <div id="imageBox" className={classes.signature}></div>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          className={classes.buttons}
          justify="flex-end"
          item
          spacing={1}
        >
          <Grid item>
            <Button variant="contained" color="primary" size="small">
              Volver
            </Button>
          </Grid>
          <Grid item>
            {/*onClick={window.wizardEventController.start_stop}*/}
            <Button
              variant="contained"
              color="primary"
              id="btnStartStopWizard"
              value="Start Wizard"
              size="small"
            >
              Firmar
            </Button>
          </Grid>

          <Grid item>
            <Button
              component={Link}
              to="/Empleado/CrearFactura"
              className={classes.button}
              variant="contained"
              size="small"
              color="primary"
            >
              Continuar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
