import Button from "@material-ui/core/Button";
import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

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
  console.log(row);
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell align="center" component="th" scope="row">
          {row.numero_factura}
        </TableCell>
        <TableCell align="center">{row.documento_usuario}</TableCell>
        <TableCell align="center">
          {moment(row.fecha_factura).format("YYYY-MM-DD HH:mm:ss")}
        </TableCell>
        <TableCell align="center">{row.resumen_factura}</TableCell>
        <TableCell align="center">{row.valor_total_factura}</TableCell>
        <TableCell align="center">
          <Button
            color="primary"
            href={row.ruta_factura}
            className={classes.button}
          >
            Ver Factura
          </Button>
          |<Button color="primary">Crear nota credito</Button>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
