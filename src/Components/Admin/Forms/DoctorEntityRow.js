import CheckboxMUI from "@material-ui/core/Checkbox";
import update from "immutability-helper";
import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import { Field } from "formik";
import { Checkbox } from "formik-material-ui";

const useRowStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  tableRow: {
    marginTop: theme.spacing(2),
    marginBottom: 2,
  },

  button: {
    marginRight: 2,
  },
}));

export default function UserRow(props) {
  let { row, handleChange, doctors } = props;

  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell align="center" component="th" scope="row">
          {row.documento_doctor}
        </TableCell>
        <TableCell align="center">
          {row.nombres_doctor + " " + row.apellidos_doctor}
        </TableCell>
        <TableCell align="center">{row.correo_doctor}</TableCell>
        <TableCell align="center">
          <Field
            component={Checkbox}
            type="checkbox"
            color="primary"
            name={`doctores_entidad.${doctors.findIndex(
              (e) => e.cod_doctor
            )}.activo`}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={3}
        ></TableCell>
      </TableRow>
    </React.Fragment>
  );
}
