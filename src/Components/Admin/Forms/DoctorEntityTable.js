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
import DoctorEntityRow from "./DoctorEntityRow";

export default function UserDatatable(props) {
  const [page, setPage] = React.useState(0);
  let { doctors, query, handleChange } = props;
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, doctors.length - page * rowsPerPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table size={"small"}>
        <TableHead>
          <TableRow>
            <TableCell align="center">Documento</TableCell>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Correo</TableCell>
            <TableCell align="center">Activo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {doctors.length === 0 ? (
            <TableRow>
              <TableCell key={"single-row"} colSpan={6}>
                <Grid container justify="center" alignItems="center">
                  No hay usuarios seleccionados
                </Grid>
              </TableCell>
            </TableRow>
          ) : (
            (rowsPerPage > 0
              ? doctors
                  .filter((row) =>
                    `${row.nombres_doctor} ${row.apellidos_doctor} ${row.documento_doctor}`
                      .toString()
                      .toLowerCase()
                      .includes(query.toLowerCase())
                  )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : doctors
            ).map((row, index) => (
              <DoctorEntityRow
                key={`${index}-doctor`}
                row={row}
                doctors={doctors}
                handleChange={handleChange}
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
              rowsPerPageOptions={[5, 10, 25, { label: "Todas", value: -1 }]}
              count={doctors.length}
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
