import Paper from "@material-ui/core/Paper";
import ProcessRow from "./ProcessRow";
import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TablePaginationActions from "../../TablePaginationActions";
import TableRow from "@material-ui/core/TableRow";
import socket from "../Socket";

function createData(code, name, document, date, pref_shipment) {
  return {
    code,
    name,
    document,
    date,
    pref_shipment,
    services: ["panoramica", "carpograma", "senos paranasales"],
  };
}

const rows = [
  createData(1, "Santiago Guzman", "1019147849", "10:50", "Correo"),
  createData(2, "Santiago Correa", "52159357", "10:55", "Fisicamente"),
  createData(3, "Leonardo Alegre", "55891566", "10:56", "Correo"),
];

export default function ProcessTable() {
  let aux = {};
  const [page, setPage] = React.useState(0);
  const [data, setData] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    socket.on("data", (msg) => {
      setData(msg);
    });
  }, []);

  const send_process = (cod_proceso) => {
    socket.emit("finalizar_proceso", {
      documento_usuario: data.data.documento_usuario,
      cod_proceso: cod_proceso,
    });
  };

  const send_shipment = (cod_proceso) => {
    socket.emit("entrega_resultado", {
      documento_usuario: data.data.documento_usuario,
      cod_proceso: cod_proceso,
    });
  };

  console.log(data);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Nombre</TableCell>
            <TableCell>Documento</TableCell>
            <TableCell>Hora</TableCell>
            <TableCell>Preferencia de Entrega</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <ProcessRow key={row.code} row={row} />
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}></TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
