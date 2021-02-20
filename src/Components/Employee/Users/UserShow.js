import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import UserDatatable from "./UserDatatable";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  titlebutton: {
    padding: theme.spacing(4, 0, 2),
  },
  margintop4: {
    marginTop: theme.spacing(2),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  marginBottom: {
    marginBottom: 2,
  },
}));
//TODO: CUANDO SE VA A FACTURAR, REALIZAR EL MISMO FLUJO
export default function UserShow() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container direction={"column"}>
        <Grid container item className={classes.titlebutton}>
          <Grid item xs={3}></Grid>
          <Grid item xs={5}>
            <Typography
              component="h1"
              variant="h5"
              align="left"
              color="textPrimary"
              gutterBottom
            >
              {`Usuarios`}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Button
              component={Link}
              to="/Empleado/CrearUsuario"
              variant="contained"
              color="primary"
              size="small"
            >
              Crear
            </Button>
          </Grid>
        </Grid>

        <Grid
          container
          item
          spacing={4}
          className={classes.marginBottom}
          justify="flex-start"
          alignItems="center"
        >
          <Grid item xs={3}></Grid>
          <Grid item xs={5}>
            <TextField
              id="documento"
              label="Documento"
              variant="outlined"
              size="small"
            />
          </Grid>
        </Grid>

        <Grid
          container
          item
          spacing={4}
          justify="center"
          alignItems="center"
          className={classes.margintop4}
        >
          <Grid item className={classes.margintop}>
            <Grid item xs>
              <UserDatatable />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
