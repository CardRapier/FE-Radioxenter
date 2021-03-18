import {
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";

import Draggable from "react-draggable";
import React from "react";
import TablePaginationActions from "../../TablePaginationActions";
import TransactionsRow from "./TransactionsRow";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function TransactionsEntity(props) {
  const { stateReceipts, setStateReceipts, row, subdata } = props;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const filter_subdata = () => {
    let data = [...subdata.transactions];
    data = data.filter(
      (aux) =>
        aux.Entidad_doctor !== null &&
        aux.Entidad_doctor.cod_entidad === row.cod_entidad
    );
    return data;
  };

  let data = filter_subdata();

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  console.log(data);

  return (
    <Dialog
      open={stateReceipts}
      onClose={() => setStateReceipts(false)}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        Transacciones - {row.nombre_comercial_entidad}
      </DialogTitle>
      <DialogContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Número</TableCell>
              <TableCell align="center">Documento</TableCell>
              <TableCell align="center">Fecha</TableCell>
              <TableCell align="center">Valor</TableCell>
              <TableCell align="center">Doctor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((row, index) => (
              <TransactionsRow
                key={`${index}-row`}
                row={row}
                subdata={subdata}
              />
            ))}

            {emptyRows > 0 && emptyRows !== 5 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "Fila por pagina" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
