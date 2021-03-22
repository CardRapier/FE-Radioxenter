import { Field } from "formik";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import { RadioGroup } from "formik-material-ui";
import React from "react";
import Typography from "@material-ui/core/Typography";

export default function SatisfactionRadioForm(props) {
  const { name, text } = props;
  return (
    <Field component={RadioGroup} name={name}>
      <Typography>{text}</Typography>
      <Grid container>
        <FormControlLabel value="1" control={<Radio />} label="Muy mala" />
        <FormControlLabel value="2" control={<Radio />} label="Mala" />
        <FormControlLabel value="3" control={<Radio />} label="Regular" />
        <FormControlLabel value="4" control={<Radio />} label="Buena" />
        <FormControlLabel value="5" control={<Radio />} label="Muy Buena" />
      </Grid>
    </Field>
  );
}
