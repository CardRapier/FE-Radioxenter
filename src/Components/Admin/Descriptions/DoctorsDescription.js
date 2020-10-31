import Grid from '@material-ui/core/Grid'
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import React from "react"
import {makeStyles} from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    row: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
  }));

export default function DoctorsDescription (props) {
    const { row } = props;
    const classes = useStyles();

    return (
        <Grid container direction="column" justify="center" alignItems="strech">
      <Grid item container className={classes.row}>
        <Grid item xs={1} />
        <Grid item xs={5}>
          <InputLabel htmlFor="component-disabled">Preferencia Entrega</InputLabel>
          <Input
            fullWidth
            disabled
            id="component-disabled"
            value={row.type_pref_shipment}
          />
        </Grid>
        <Grid item xs={5}>
          <InputLabel htmlFor="component-disabled">Dirección</InputLabel>
          <Input
            fullWidth
            disabled
            id="component-disabled"
            value={row.address}
          />
        </Grid>
      </Grid>
      <Grid item container className={classes.row}>
        <Grid item xs={1} />
        <Grid item xs={5}>
          <InputLabel htmlFor="component-disabled">Documento</InputLabel>
          <Input
            fullWidth
            disabled
            id="component-disabled"
            value={row.document}
          />
        </Grid>
        <Grid item xs={5}>
          <InputLabel htmlFor="component-disabled">Tipo Documento</InputLabel>
          <Input fullWidth disabled id="component-disabled" value={row.type_document} />
        </Grid>
      </Grid>
    </Grid>
    )
}