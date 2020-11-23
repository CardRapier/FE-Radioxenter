import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  row: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));

export default function EmployeesDescription(props) {
  const { row } = props;
  const classes = useStyles();
  return (
    <Grid container direction="column" justify="center" alignItems="strech">
      <Grid item container className={classes.row}>
        <Grid item xs={1} />
        <Grid item xs={5}>
          <InputLabel htmlFor="component-disabled">Dirección</InputLabel>
          <Input
            fullWidth
            disabled
            id="component-disabled"
            value={row.direccion_empleado}
          />
        </Grid>
        <Grid item xs={5}>
          <InputLabel htmlFor="component-disabled">Fecha Nacimiento</InputLabel>
          <Input
            fullWidth
            disabled
            id="component-disabled"
            value={row.fnacimiento_empleado}
          />
        </Grid>
      </Grid>
      <Grid item container className={classes.row}>
        <Grid item xs={1} />
        <Grid item xs={5}>
          <InputLabel htmlFor="component-disabled">Telefono</InputLabel>
          <Input
            fullWidth
            disabled
            id="component-disabled"
            value={row.telefono_empleado}
          />
        </Grid>
        <Grid item xs={5}>
          <InputLabel htmlFor="component-disabled">Correo</InputLabel>
          <Input
            fullWidth
            disabled
            id="component-disabled"
            value={row.correo_empleado}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
