import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Draggable from "react-draggable";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TablePaginationActions from "../../TablePaginationActions";
import TableRow from "@material-ui/core/TableRow";
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
            {data.length === 0 ? (
              <TableRow>
                <TableCell key={"single-row"} colSpan={6}>
                  <Grid container justify="center" alignItems="center">
                    No hay transacciones
                  </Grid>
                </TableCell>
              </TableRow>
            ) : (
              (rowsPerPage > 0
                ? data.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data
              ).map((row, index) => (
                <TransactionsRow
                  key={`${index}-row`}
                  row={row}
                  subdata={subdata}
                />
              ))
            )}

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
                labelRowsPerPage="Filas por página"
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
