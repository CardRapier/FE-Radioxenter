import { Grid, Input, InputLabel } from "@material-ui/core";

import React from "react";

export default function UserData(props) {
  const { row } = props;

  return (
    <React.Fragment>
      <Grid container direction="column">
        <Grid item container>
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
        <Grid item container>
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
        <Grid item container>
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
