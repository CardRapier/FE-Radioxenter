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
    <Grid container direction="column" justify="center" alignItems="stretch">
      <Grid item container className={classes.row}>
        <Grid item xs={1} />
        <Grid item xs={5}>
          <InputLabel>Dirección</InputLabel>
          <Input fullWidth disabled value={row.direccion_empleado} />
        </Grid>
        <Grid item xs={5}>
          <InputLabel>Fecha Nacimiento</InputLabel>
          <Input fullWidth disabled value={row.fnacimiento_empleado} />
        </Grid>
      </Grid>
      <Grid item container className={classes.row}>
        <Grid item xs={1} />
        <Grid item xs={5}>
          <InputLabel>Teléfono</InputLabel>
          <Input fullWidth disabled value={row.telefono_empleado} />
        </Grid>
        <Grid item xs={5}>
          <InputLabel>Correo</InputLabel>
          <Input fullWidth disabled value={row.correo_empleado} />
        </Grid>
      </Grid>
    </Grid>
  );
}
