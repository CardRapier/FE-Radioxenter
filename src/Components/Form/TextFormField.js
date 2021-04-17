import React from "react";
import { TextField } from "@material-ui/core";
import { getIn } from "formik";
import Tooltip from "@material-ui/core/Tooltip";

export default function TextFormField(props) {
  const { form, field, tooltip } = props;
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);
  return (
    <React.Fragment>
      <Tooltip title={tooltip !== undefined ? `${tooltip}` : ""}>
        <TextField
          fullWidth
          margin="dense"
          helperText={errorText}
          error={!!errorText}
          {...field}
          {...props}
        />
      </Tooltip>
    </React.Fragment>
  );
}
