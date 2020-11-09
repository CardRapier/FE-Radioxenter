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
}));

export default function UserShow() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container direction={"column"}>
        <Grid container item className={classes.titlebutton} spacing={4}>
          <Grid item xs={3}></Grid>
          <Grid item xs={4}>
            <Typography
              component="h1"
              variant="h5"
              align="left"
              color="textPrimary"
              gutterBottom
            >
              Usuarios
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Button
              component={Link}
              to="/Empleado/CrearUsuario"
              variant="contained"
              color="primary"
            >
              Crear
            </Button>
          </Grid>
        </Grid>

        <Grid container item spacing={4}>
          <Grid item xs={2}></Grid>
          <Grid item xs={5}>
            <TextField id="documento" label="Documento" variant="outlined" />
          </Grid>
          <Grid item xs={5}>
            <TextField id="nombre" label="Nombre" variant="outlined" />
          </Grid>
        </Grid>
        <Grid container item spacing={4} justify="center" alignItems="center">
          <Grid item className={classes.margintop4}>
            <UserDatatable />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
