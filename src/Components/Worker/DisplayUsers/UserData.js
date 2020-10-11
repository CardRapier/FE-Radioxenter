import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  dataRow: {
    marginTop: theme.spacing(2),
  },
}));

export default function UserData(props) {
  const classes = useStyles();
  const { row } = props;

  return (
    <React.Fragment>
      <Grid container direction="column">
        <Grid item container className={classes.dataRow}>
          <Grid item xs={4}>
            <InputLabel htmlFor="component-disabled">Direccion</InputLabel>
            <Input disabled id="component-disabled" value={row.address} />
          </Grid>

          <Grid item xs={4}>
            <InputLabel htmlFor="component-disabled">Ocupacion</InputLabel>
            <Input disabled id="component-disabled" value={row.ocupation} />
          </Grid>

          <Grid item xs={4}>
            <InputLabel htmlFor="component-disabled">
              Fecha Nacimiento
            </InputLabel>
            <Input disabled id="component-disabled" value={row.birth} />
          </Grid>
        </Grid>
        <Grid item container className={classes.dataRow}>
          <Grid item xs={4}>
            <InputLabel htmlFor="component-disabled">Telefono</InputLabel>
            <Input disabled id="component-disabled" value={row.telephone} />
          </Grid>

          <Grid item xs={4}>
            <InputLabel htmlFor="component-disabled">Tipo Documento</InputLabel>
            <Input disabled id="component-disabled" value={row.type_document} />
          </Grid>

          <Grid item xs={4}>
            <InputLabel htmlFor="component-disabled">Ciudad</InputLabel>
            <Input disabled id="component-disabled" value={row.city} />
          </Grid>
        </Grid>
        <Grid item container className={classes.dataRow}>
          <Grid item xs={4}>
            <InputLabel htmlFor="component-disabled">Sexo</InputLabel>
            <Input disabled id="component-disabled" value={row.sex} />
          </Grid>

          <Grid item xs={4}>
            <InputLabel htmlFor="component-disabled">Pref. Entrega</InputLabel>
            <Input disabled id="component-disabled" value={row.pref_shipment} />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
