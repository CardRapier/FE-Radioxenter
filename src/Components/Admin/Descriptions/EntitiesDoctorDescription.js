import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TablePaginationActions from "../../TablePaginationActions";
import TableRow from "@material-ui/core/TableRow";

export default function EntitiesDoctorDescription(props) {
  const { subdata } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, subdata.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell align="center">Nombre</TableCell>
          <TableCell align="center">Documento</TableCell>
          <TableCell align="center">Teléfono</TableCell>
          <TableCell align="center">Correo</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {(rowsPerPage > 0
          ? subdata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : subdata
        ).map((row, index) => (
          <TableRow key={`doctor-row-${index}`}>
            <TableCell align="center" component="th" scope="row">
              {`${row.Doctor.nombres_doctor} ${row.Doctor.apellidos_doctor}`}
            </TableCell>
            <TableCell align="center">{row.Doctor.documento_doctor}</TableCell>
            <TableCell align="center">{row.Doctor.telefono_doctor}</TableCell>
            <TableCell align="center">{row.Doctor.correo_doctor}</TableCell>
          </TableRow>
        ))}

        {emptyRows > 0 && emptyRows !== 5 && (
          <TableRow style={{ height: 26 * emptyRows }}>
            <TableCell colSpan={4} />
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            count={subdata.length}
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
  );
}
