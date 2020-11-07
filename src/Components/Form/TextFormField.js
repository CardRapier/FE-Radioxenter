import React from "react";
import { TextField } from "@material-ui/core";
import { getIn } from "formik";

export default function TextFormField(props) {
  const { form, field } = props;
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);
  return (
    <TextField
      fullWidth
      margin="normal"
      helperText={errorText}
      error={!!errorText}
      {...field}
      {...props}
    />
  );
}
