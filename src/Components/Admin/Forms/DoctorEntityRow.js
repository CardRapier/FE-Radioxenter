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
  let { row, doctors } = props;
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
              (e) => e.cod_doctor === row.cod_doctor
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
