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
  const { row, fetched_data, city_department } = props;
  return (
    <React.Fragment>
      <Grid container direction="column">
        <Grid item container className={classes.dataRow}>
          <Grid item xs={4}>
            <InputLabel htmlFor="component-address">Dirección</InputLabel>
            <Input
              disabled
              id="component-address"
              value={row.direccion_usuario}
            />
          </Grid>

          <Grid item xs={4}>
            <InputLabel htmlFor="component-ocupation">Ocupación</InputLabel>
            <Input
              disabled
              id="component-ocupation"
              value={row.ocupacion_usuario}
            />
          </Grid>

          <Grid item xs={4}>
            <InputLabel htmlFor="component-birthday">
              Fecha Nacimiento
            </InputLabel>
            <Input
              disabled
              id="component-birthday"
              value={row.fecha_nacimiento_usuario}
            />
          </Grid>
        </Grid>
        <Grid item container className={classes.dataRow}>
          <Grid item xs={4}>
            <InputLabel htmlFor="component-telephone">Teléfono</InputLabel>
            <Input
              disabled
              id="component-telephone"
              value={row.telefono_usuario}
            />
          </Grid>

          <Grid item xs={4}>
            <InputLabel htmlFor="component-type_document">
              Tipo Documento
            </InputLabel>
            <Input
              disabled
              id="component-type_document"
              value={
                fetched_data.data.type_document.find(
                  (element) =>
                    element.cod_tipo_documento === row.cod_tipo_documento
                ).nombre_tipo_documento
              }
            />
          </Grid>

          <Grid item xs={4}>
            <InputLabel htmlFor="component-cities">Ciudad</InputLabel>
            <Input
              disabled
              id="component-cities"
              value={
                city_department.Ciudads.find(
                  (element) => element.cod_ciudad === row.cod_ciudad
                ).nom_ciudad
              }
            />
          </Grid>
        </Grid>
        <Grid item container className={classes.dataRow}>
          <Grid item xs={4}>
            <InputLabel htmlFor="component-sex">Sexo</InputLabel>
            <Input
              disabled
              id="component-sex"
              value={
                fetched_data.data.sex.find(
                  (element) => element.cod_sexo === row.cod_sexo
                ).nombre_sexo
              }
            />
          </Grid>

          <Grid item xs={4}>
            <InputLabel htmlFor="component-shipment">Pref. Entrega</InputLabel>
            <Input
              disabled
              id="component-shipment"
              value={
                fetched_data.data.type_shipment.find(
                  (element) =>
                    element.cod_tipo_pref_entrega === row.cod_tipo_pref_entrega
                ).nombre_tipo_pref_entrega
              }
            />
          </Grid>
          <Grid item xs={4}>
            <InputLabel htmlFor="component-department">Departamento</InputLabel>
            <Input
              disabled
              id="component-departments"
              value={city_department.nom_departamento}
            />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
