import { Grid, TextField, Typography } from "@material-ui/core";

import React from "react";

export default function ProcessShipmentData(props) {
  const { row, type_pref_shipment, doctorEntities, type_shipment } = props;
  const [doctor, setDoctor] = React.useState({});

  React.useEffect(() => {
    setDoctor(
      doctorEntities.find(
        (doctor) =>
          row.transaccion.cod_entidad_doctor ===
          doctorEntities.cod_entidad_doctor
      )
    );
  }, [doctorEntities, row.transaccion.cod_entidad_doctor]);
  return (
    <Grid direction="column" container spacing={3}>
      <Grid item container justify="center" alignItems="center">
        <Grid item xs={4}>
          <Typography>Preferencia de entrega del usuario:</Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField disabled value={`${type_pref_shipment}`} />
        </Grid>
        <Grid item xs={3}>
          <TextField disabled fullWidth value={`${row.data.correo_usuario}`} />
        </Grid>
      </Grid>
      {doctor !== undefined && doctor.hasOwnProperty("Doctor") ? (
        <Grid item container justify="center" alignItems="center">
          <Grid item xs={4}>
            <Typography>Preferencia de entrega del doctor:</Typography>
          </Grid>
          <Grid item xs={3}>
            <TextField
              disabled
              value={`${
                type_shipment.find(
                  (type) =>
                    doctor.Doctor.cod_tipo_pref_entrega ===
                    type.cod_tipo_pref_entrega
                ).nombre_tipo_pref_entrega
              }`}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              disabled
              fullWidth
              value={`${doctor.Doctor.correo_doctor}`}
            />
          </Grid>
        </Grid>
      ) : (
        ""
      )}
    </Grid>
  );
}
