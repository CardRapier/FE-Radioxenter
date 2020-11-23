import { Button, Grid } from "@material-ui/core";

import { Link } from "react-router-dom";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginTop: theme.spacing(3),
  },
}));

export default function FormButtons(props) {
  const classes = useStyles();
  const { data, resetForm, isSubmitting, to } = props;

  return (
    <React.Fragment>
      <Grid
        item
        container
        justify="flex-end"
        spacing={3}
        className={classes.buttons}
      >
        <Grid item>
          <Button
            component={Link}
            to={to}
            variant="contained"
            color="primary"
            size="small"
          >
            Volver
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={resetForm({})}
          >
            Limpiar
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="small"
            type="submit"
            disabled={isSubmitting}
          >
            {data === undefined ? "Crear" : "Guardar"}
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
