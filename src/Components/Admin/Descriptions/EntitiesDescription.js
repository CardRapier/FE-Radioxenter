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
  const { row } = props;
  return (
    <Grid container direction="column" justify="center" alignItems="strech">
      <Grid item container className={classes.row}>
        <Grid item xs={6}>
          <InputLabel htmlFor="component-disabled">Forma de pago</InputLabel>
          <Input
            fullWidth
            disabled
            id="component-disabled"
            value={row.method_payment}
          />
        </Grid>

        <Grid item xs={6}>
          <InputLabel htmlFor="component-disabled">
            Tipo de facturacion
          </InputLabel>
          <Input
            fullWidth
            disabled
            id="component-disabled"
            value={row.type_receipt}
          />
        </Grid>
      </Grid>
      <Grid item container className={classes.row}>
        <Grid item xs={6}>
          <InputLabel htmlFor="component-disabled">
            Nombre Representante
          </InputLabel>
          <Input
            fullWidth
            disabled
            id="component-disabled"
            value={row.agent_name}
          />
        </Grid>

        <Grid item xs={6}>
          <InputLabel htmlFor="component-disabled">
            Cedula Representante
          </InputLabel>
          <Input
            fullWidth
            disabled
            id="component-disabled"
            value={row.agent_document}
          />
        </Grid>
      </Grid>

      <Grid item container className={classes.row}>
        <Grid item xs={6}>
          <InputLabel htmlFor="component-disabled">
            Telefono Representante
          </InputLabel>
          <Input
            fullWidth
            disabled
            id="component-disabled"
            value={row.agent_telephone}
          />
        </Grid>

        <Grid item xs={6}>
          <InputLabel htmlFor="component-disabled">
            Correo Representante
          </InputLabel>
          <Input
            fullWidth
            disabled
            id="component-disabled"
            value={row.agent_email}
          />
        </Grid>
      </Grid>
      <Grid item container className={classes.row}>
        <Grid item xs={6}>
          <InputLabel htmlFor="component-disabled">Nombre Contacto</InputLabel>
          <Input
            fullWidth
            disabled
            id="component-disabled"
            value={row.contact_name}
          />
        </Grid>

        <Grid item xs={6}>
          <InputLabel htmlFor="component-disabled">Cedula Contacto</InputLabel>
          <Input
            fullWidth
            disabled
            id="component-disabled"
            value={row.contact_document}
          />
        </Grid>
      </Grid>

      <Grid item container className={classes.row}>
        <Grid item xs={6}>
          <InputLabel htmlFor="component-disabled">
            Telefono Contacto
          </InputLabel>
          <Input
            fullWidth
            disabled
            id="component-disabled"
            value={row.contact_telephone}
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel htmlFor="component-disabled">Correo Contacto</InputLabel>
          <Input
            fullWidth
            disabled
            id="component-disabled"
            value={row.contact_email}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
