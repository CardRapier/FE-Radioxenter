import { api_nota_credito, api_receipts } from "../../../api_app";

import Button from "@material-ui/core/Button";
import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { give_error_message } from "../../../utils";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { useSnackbar } from "notistack";

const useRowStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
}));

export default function ReceiptRow(props) {
  const { row, fetch_receipts, setLoaded } = props;
  const classes = useRowStyles();
  const { enqueueSnackbar } = useSnackbar();

  const create_nota_credito = async () => {
    setLoaded(false);
    api_nota_credito
      .post("/", { cod_factura: row.cod_factura })
      .then((res) => {
        fetch_receipts();
        setLoaded(true);
        enqueueSnackbar("Se ha creado exitosamente!", {
          variant: "success",
        });
      })
      .catch((error) => {
        setLoaded(true);
        enqueueSnackbar(give_error_message(error.response), {
          variant: "error",
        });
      });
  };

  const send_receipt_email = async () => {
    setLoaded(false);

    api_receipts
      .post("/sendEmail", {
        cod_factura: row.cod_factura,
        documento_usuario: row.documento_usuario,
      })
      .then((res) => {
        setLoaded(true);
        enqueueSnackbar("Se ha enviado exitosamente!", {
          variant: "success",
        });
      })
      .catch((error) => {
        setLoaded(true);
        enqueueSnackbar(give_error_message(error.response), {
          variant: "error",
        });
      });
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell align="center" component="th" scope="row">
          {row.numero_factura}
        </TableCell>
        <TableCell align="center">{row.documento_usuario}</TableCell>
        <TableCell align="center">
          {moment(row.fecha_factura).format("DD-MM-YYYY HH:mm:ss")}
        </TableCell>
        <TableCell align="center">{row.resumen_factura}</TableCell>
        <TableCell align="center">{row.valor_total_factura}</TableCell>
        <TableCell align="center">
          <Button
            color="primary"
            size="small"
            href={`${
              process.env.REACT_APP_API_ROUTE
            }/files/pdf/facturas/${row.ruta_factura.split("/").pop()}`}
            target="_blank"
            className={classes.button}
          >
            Ver Factura
          </Button>
          |
          <Button
            color="primary"
            size="small"
            onClick={() => send_receipt_email()}
          >
            Enviar Correo
          </Button>
          |
          {row.Nota_Creditos.length === 0 ? (
            <Button color="primary" onClick={() => create_nota_credito()}>
              Crear N.Crédito
            </Button>
          ) : (
            row.Nota_Creditos.map((element, index) => (
              <Button
                key={`button-notacredito-${index}`}
                color="primary"
                size="small"
                href={`${
                  process.env.REACT_APP_API_ROUTE
                }/files/pdf/notaCredito/${element.ruta_nota_credito
                  .split("/")
                  .pop()}`}
                target="_blank"
              >
                Ver N.Crédito
              </Button>
            ))
          )}
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
