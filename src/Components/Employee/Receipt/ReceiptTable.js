import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import React from "react";
import ReceiptRow from "./ReceiptRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TablePaginationActions from "../../TablePaginationActions";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 900,
  },
  smallTableCell: {
    width: 50,
  },
}));

export default function ReceiptTable(props) {
  const { receipts, filter } = props;
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, receipts.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center">Número</TableCell>
            <TableCell align="center">Documento</TableCell>
            <TableCell align="center">Fecha</TableCell>
            <TableCell align="center">Resumen</TableCell>
            <TableCell align="center">Valor</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {receipts.length === 0 ? (
            <TableRow>
              <TableCell key={"single-row"} colSpan={6}>
                <Grid container justify="center" alignItems="center">
                  No hay datos para mostrar
                </Grid>
              </TableCell>
            </TableRow>
          ) : (
            (rowsPerPage > 0
              ? receipts
                  .filter((row) =>
                    row["documento_usuario"]
                      .toString()
                      .toLowerCase()
                      .includes(filter.query.toLowerCase())
                  )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : receipts
            ).map((row, index) => <ReceiptRow key={`${index}-row`} row={row} />)
          )}

          {emptyRows > 0 && emptyRows !== 5 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              count={receipts.length}
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
    </TableContainer>
  );
}
