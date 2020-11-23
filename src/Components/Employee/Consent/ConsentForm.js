import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { Text } from "./ConsentText.js";
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
        <Grid container direction="row-reverse" item spacing={4}>
          <Typography variant="body1">{text}</Typography>

          <Grid item>
            <div id="imageBox" className={classes.signature}></div>
          </Grid>
        </Grid>
        <Grid
          container
          className={classes.buttons}
          direction="row-reverse"
          item
          spacing={4}
        >
          <Grid item>
            <Button variant="contained" color="primary">
              Continuar
            </Button>
          </Grid>
          <Grid item>
            {/*onClick={window.wizardEventController.start_stop}*/}
            <Button
              variant="contained"
              color="primary"
              id="btnStartStopWizard"
              value="Start Wizard"
            >
              Firmar
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary">
              Volver
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
