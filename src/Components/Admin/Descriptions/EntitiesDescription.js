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

export default function EntitiesDescription(props) {
  const classes = useStyles();
  const { row, data } = props;
  return (
    <Grid container direction="column" justify="center" alignItems="strech">
      <Grid item container className={classes.row}>
        <Grid item xs={1} />
        <Grid item xs={5}>
          <InputLabel htmlFor="component-disabled">Forma de pago</InputLabel>
          <Input
            fullWidth
            disabled
            id="component-disabled"
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
          <InputLabel htmlFor="component-disabled">
            Tipo de facturacion
          </InputLabel>
          <Input
            fullWidth
            disabled
            id="component-disabled"
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
          <InputLabel htmlFor="component-disabled">
            Nombre Representante
          </InputLabel>
          <Input
            fullWidth
            disabled
            id="component-disabled"
            value={row.nombre_representante}
          />
        </Grid>

        <Grid item xs={5}>
          <InputLabel htmlFor="component-disabled">
            Cedula Representante
          </InputLabel>
          <Input
            fullWidth
            disabled
            id="component-disabled"
            value={row.cedula_representante}
          />
        </Grid>
        <Grid item xs={1} />
      </Grid>

      <Grid item container className={classes.row}>
        <Grid item xs={1} />
        <Grid item xs={5}>
          <InputLabel htmlFor="component-disabled">
            Telefono Representante
          </InputLabel>
          <Input
            fullWidth
            disabled
            id="component-disabled"
            value={row.telefono_representante}
          />
        </Grid>

        <Grid item xs={5}>
          <InputLabel htmlFor="component-disabled">
            Correo Representante
          </InputLabel>
          <Input
            fullWidth
            disabled
            id="component-disabled"
            value={row.correo_representante}
          />
        </Grid>
        <Grid item xs={1} />
      </Grid>
      <Grid item container className={classes.row}>
        <Grid item xs={1} />
        <Grid item xs={5}>
          <InputLabel htmlFor="component-disabled">Nombre Contacto</InputLabel>
          <Input
            fullWidth
            disabled
            id="component-disabled"
            value={row.nombre_contacto}
          />
        </Grid>

        <Grid item xs={5}>
          <InputLabel htmlFor="component-disabled">Cedula Contacto</InputLabel>
          <Input
            fullWidth
            disabled
            id="component-disabled"
            value={row.cedula_contacto}
          />
        </Grid>
        <Grid item xs={1} />
      </Grid>

      <Grid item container className={classes.row}>
        <Grid item xs={1} />
        <Grid item xs={5}>
          <InputLabel htmlFor="component-disabled">
            Telefono Contacto
          </InputLabel>
          <Input
            fullWidth
            disabled
            id="component-disabled"
            value={row.telefono_contacto}
          />
        </Grid>
        <Grid item xs={5}>
          <InputLabel htmlFor="component-disabled">Correo Contacto</InputLabel>
          <Input
            fullWidth
            disabled
            id="component-disabled"
            value={row.correo_contacto}
          />
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </Grid>
  );
}
