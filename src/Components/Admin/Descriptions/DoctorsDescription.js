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

export default function DoctorsDescription(props) {
  const { row, data } = props;
  const classes = useStyles();

  return (
    <Grid container direction="column" justify="center" alignItems="stretch">
      <Grid item container className={classes.row}>
        <Grid item xs={1} />
        <Grid item xs={5}>
          <InputLabel>Preferencia Entrega</InputLabel>
          <Input
            fullWidth
            disabled
            value={
              data !== undefined && data.type_shipments !== undefined
                ? data.type_shipments.find(
                    (element) =>
                      element.cod_tipo_pref_entrega ===
                      row.cod_tipo_pref_entrega
                  ).nombre_tipo_pref_entrega
                : row.cod_tipo_pref_entrega
            }
          />
        </Grid>
        <Grid item xs={5}>
          <InputLabel>Dirección</InputLabel>
          <Input fullWidth disabled value={row.direccion_doctor} />
        </Grid>
      </Grid>
      <Grid item container className={classes.row}>
        <Grid item xs={1} />
        <Grid item xs={5}>
          <InputLabel>Documento</InputLabel>
          <Input fullWidth disabled value={row.documento_doctor} />
        </Grid>
        <Grid item xs={5}>
          <InputLabel>Tipo Documento</InputLabel>
          <Input
            fullWidth
            disabled
            value={
              data !== undefined && data.type_documents !== undefined
                ? data.type_documents.find(
                    (element) =>
                      element.cod_tipo_documento === row.cod_tipo_documento
                  ).nombre_tipo_documento
                : row.cod_tipo_documento
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
