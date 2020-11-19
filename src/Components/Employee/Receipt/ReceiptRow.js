import Button from "@material-ui/core/Button";
import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";

const useRowStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
}));

export default function ReceiptRow(props) {
  const { row } = props;
  const classes = useRowStyles();
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell component="th" scope="row">
          {row.code}
        </TableCell>
        <TableCell>{row.document}</TableCell>
        <TableCell>{row.date}</TableCell>
        <TableCell>

            <Button color="primary" className={classes.button}>
              Ver Factura
            </Button>|
            <Button color="primary">Crear nota credito</Button>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
