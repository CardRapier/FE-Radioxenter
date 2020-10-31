import React from "react";
import Typography from "@material-ui/core/Typography";

export default function ServiceDescription(props) {
  const { row } = props;
  return (
    <Typography variant="h6" gutterBottom component="div">
      {row.description}
    </Typography>
  );
}
