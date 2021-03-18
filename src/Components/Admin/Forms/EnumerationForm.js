import { Field } from "formik";
import Grid from "@material-ui/core/Grid";
import React from "react";
import TextFormField from "../../Form/TextFormField";

export default function EnumerationForm(props) {
  const { enumerationName, name } = props;
  return (
    <React.Fragment>
      <Grid container item xs={3} alignContent="center" alignItems="center">
        {`${enumerationName}`}
      </Grid>
      <Grid item xs={2}>
        <Field
          label="Inicial"
          name={`${name}.numeracion_inicial`}
          type="number"
          component={TextFormField}
        />
      </Grid>
      <Grid item xs={2}>
        <Field
          label="Final"
          name={`${name}.numeracion_final`}
          type="number"
          component={TextFormField}
        />
      </Grid>
      <Grid item xs={2}>
        <Field
          label="Aumento"
          name={`${name}.numeracion_aumento`}
          type="number"
          component={TextFormField}
        />
      </Grid>
      <Grid item xs={2}>
        <Field
          disabled
          label="Actual"
          name={`${name}.numeracion_actual`}
          type="number"
          component={TextFormField}
        />
      </Grid>
    </React.Fragment>
  );
}
