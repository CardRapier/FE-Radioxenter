import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
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
import UserRow from "./UserRow";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 900,
  },
  smallTableCell: {
    width: 50,
  },
}));

export default function UserDatatable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  let { users, data, filter } = props;
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);
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
            <TableCell className={classes.smallTableCell} />
            <TableCell align="center">Documento</TableCell>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Correo</TableCell>
            <TableCell align="center">Celular</TableCell>
            <TableCell align="center">Género</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell key={"single-row"} colSpan={6}>
                <Grid container justify="center" alignItems="center">
                  No hay usuarios seleccionados
                </Grid>
              </TableCell>
            </TableRow>
          ) : (
            (rowsPerPage > 0
              ? users
                  .filter((row) =>
                    row["documento_usuario"]
                      .toString()
                      .toLowerCase()
                      .includes(filter.query.toLowerCase())
                  )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : users
            ).map((row) => (
              <UserRow key={row.cod_usuario} row={row} fetched_data={data} />
            ))
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
              rowsPerPageOptions={[5, 10, 25, { label: "Todas", value: -1 }]}
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
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
    </TableContainer>
  );
}
