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
            <Input
              disabled
              id="component-disabled"
              value={row.direccion_usuario}
            />
          </Grid>

          <Grid item xs={4}>
            <InputLabel htmlFor="component-disabled">Ocupacion</InputLabel>
            <Input
              disabled
              id="component-disabled"
              value={row.ocupacion_usuario}
            />
          </Grid>

          <Grid item xs={4}>
            <InputLabel htmlFor="component-disabled">
              Fecha Nacimiento
            </InputLabel>
            <Input
              disabled
              id="component-disabled"
              value={row.fecha_nacimiento_usuario}
            />
          </Grid>
        </Grid>
        <Grid item container className={classes.dataRow}>
          <Grid item xs={4}>
            <InputLabel htmlFor="component-disabled">Telefono</InputLabel>
            <Input
              disabled
              id="component-disabled"
              value={row.telefono_usuario}
            />
          </Grid>

          <Grid item xs={4}>
            <InputLabel htmlFor="component-disabled">Tipo Documento</InputLabel>
            <Input
              disabled
              id="component-disabled"
              value={row.cod_tipo_documento}
            />
          </Grid>

          <Grid item xs={4}>
            <InputLabel htmlFor="component-disabled">Ciudad</InputLabel>
            <Input disabled id="component-disabled" value={row.cod_ciudad} />
          </Grid>
        </Grid>
        <Grid item container className={classes.dataRow}>
          <Grid item xs={4}>
            <InputLabel htmlFor="component-disabled">Sexo</InputLabel>
            <Input disabled id="component-disabled" value={row.cod_sexo} />
          </Grid>

          <Grid item xs={4}>
            <InputLabel htmlFor="component-disabled">Pref. Entrega</InputLabel>
            <Input
              disabled
              id="component-disabled"
              value={row.cod_tipo_pref_entrega}
            />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
