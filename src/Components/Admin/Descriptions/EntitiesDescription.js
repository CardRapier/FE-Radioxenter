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

//TODO: Mostrar doctores de la entidad
export default function EntitiesDescription(props) {
  const classes = useStyles();
  const { row, data } = props;
  return (
    <Grid container direction="column" justify="center" alignItems="stretch">
      <Grid item container className={classes.row}>
        <Grid item xs={1} />
        <Grid item xs={5}>
          <InputLabel>Forma de pago</InputLabel>
          <Input
            fullWidth
            disabled
            value={
              data !== undefined && data.periods !== undefined
                ? data.periods.find(
                    (element) =>
                      element.cod_forma_de_pago_entidad ===
                      row.cod_forma_de_pago_entidad
                  ).nombre_forma_de_pago_entidad
                : row.cod_forma_de_pago_entidad
            }
          />
        </Grid>

        <Grid item xs={5}>
          <InputLabel>Tipo de facturacion</InputLabel>
          <Input
            fullWidth
            disabled
            value={
              data !== undefined && data.type_receipts !== undefined
                ? data.type_receipts.find(
                    (element) =>
                      element.cod_tipo_facturacion === row.cod_tipo_facturacion
                  ).nombre_tipo_facturacion
                : row.cod_tipo_facturacion
            }
          />
        </Grid>
        <Grid item xs={1} />
      </Grid>
      <Grid item container className={classes.row}>
        <Grid item xs={1} />
        <Grid item xs={5}>
          <InputLabel>Nombre Representante</InputLabel>
          <Input fullWidth disabled value={row.nombre_representante} />
        </Grid>

        <Grid item xs={5}>
          <InputLabel>Cedula Representante</InputLabel>
          <Input fullWidth disabled value={row.cedula_representante} />
        </Grid>
        <Grid item xs={1} />
      </Grid>

      <Grid item container className={classes.row}>
        <Grid item xs={1} />
        <Grid item xs={5}>
          <InputLabel>Telefono Representante</InputLabel>
          <Input fullWidth disabled value={row.telefono_representante} />
        </Grid>

        <Grid item xs={5}>
          <InputLabel>Correo Representante</InputLabel>
          <Input fullWidth disabled value={row.correo_representante} />
        </Grid>
        <Grid item xs={1} />
      </Grid>
      <Grid item container className={classes.row}>
        <Grid item xs={1} />
        <Grid item xs={5}>
          <InputLabel>Nombre Contacto</InputLabel>
          <Input
            fullWidth
            disabled
            value={row.nombre_contacto !== undefined ? row.nombre_contacto : ""}
          />
        </Grid>

        <Grid item xs={5}>
          <InputLabel>Cedula Contacto</InputLabel>
          <Input
            fullWidth
            disabled
            value={row.cedula_contacto !== null ? row.cedula_contacto : ""}
          />
        </Grid>
        <Grid item xs={1} />
      </Grid>

      <Grid item container className={classes.row}>
        <Grid item xs={1} />
        <Grid item xs={5}>
          <InputLabel>Telefono Contacto</InputLabel>
          <Input
            fullWidth
            disabled
            value={
              row.telefono_contacto !== undefined ? row.telefono_contacto : ""
            }
          />
        </Grid>
        <Grid item xs={5}>
          <InputLabel>Correo Contacto</InputLabel>
          <Input
            fullWidth
            disabled
            value={row.correo_contacto !== undefined ? row.correo_contacto : ""}
          />
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </Grid>
  );
}
