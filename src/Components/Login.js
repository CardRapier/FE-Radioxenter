import { Button, Grid, TextField, makeStyles } from "@material-ui/core";

import { Link } from "react-router-dom";
import React from "react";

const useStyles = makeStyles((theme) => ({
  image: {
    padding: theme.spacing(4, 0, 4),
  },
  grid: {
    minHeight: "80vh",
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "35ch",
    },
  },
}));

export default function Login() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.grid}
      >
        <img
          src="http://radioxenter.com/images/header_logo.png"
          alt="new"
          className={classes.image}
        />

        <Grid item xs={12}>
          <TextField
            required
            id="outlined"
            label="Usuario"
            defaultValue=""
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={3} justify="flex-end">
          <Button
            component={Link}
            to="/Administrador/"
            variant="contained"
            color="primary"
          >
            Ingresar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
