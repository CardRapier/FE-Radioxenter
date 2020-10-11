import Paper from "@material-ui/core/Paper"
import React from "react";
import Row from "./Row";
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableFooter from "@material-ui/core/TableFooter"
import TableHead from "@material-ui/core/TableHead"
import TablePagination from "@material-ui/core/TablePagination"
import TablePaginationActions from "../TablePaginationActions";
import TableRow from "@material-ui/core/TableRow"

function createData(
  code,
  name,
  telephone,
  address,
  document,
  type_document,
  ocupation,
  birth,
  city,
  sex,
  email,
  gender,
  cellphone,
  pref_shipment
) {
  return {
    code,
    name,
    telephone,
    address,
    document,
    type_document,
    ocupation,
    birth,
    city,
    sex,
    email,
    gender,
    cellphone,
    pref_shipment,
    history: [
      { date: "2020-01-05", customerId: "Paquete 1", price: 3 },
      { date: "2020-01-02", customerId: "Paquete 2", price: 1 },
    ],
  };
}

const rows = [
  createData(
    1,
    "Sanrtiago Guzman",
    "3102068794",
    "Calle 157a#98a - 54",
    "101947849",
    "CC",
    "Studen",
    "27/02/199",
    "Bogota",
    "Masculine",
    "CARDRAPIER@HOTMAIL.COM",
    "Masculine",
    "3102068794",
    "Emaul"
  ),
  createData(
    2,
    "Leonardo Alegre",
    "3102068784",
    "Calle 157a#98a - 54",
    "101947849",
    "CC",
    "Studen",
    "27/02/1999",
    "Bogota",
    "Masculine",
    "leo@HOTMAIL.COM",
    "Masculine",
    "3102068784",
    "Emaul"
  ),
  createData(
    3,
    "Sanrtiago Correa",
    "31020687",
    "Calle 157a#98a - 54",
    "101947849",
    "CC",
    "Studen",
    "27/02/199",
    "Bogota",
    "Masculine",
    "CARDR@HOTMAIL.COM",
    "Masculine",
    "31020687",
    "Emaul"
  ),
  createData(
    4,
    "Fabian TIrado",
    "3102068794",
    "Calle 157a#98a - 54",
    "101947849",
    "CC",
    "Student",
    "27/02/199",
    "Bogota",
    "Masculine",
    "CA@HOTMAIL.COM",
    "Masculine",
    "3102068794",
    "Emaul"
  ),
  createData(
    5,
    "Juanes Gomez",
    "3102068794",
    "Calle 157a#98a - 54",
    "101947849",
    "CC",
    "Studen",
    "27/02/2020",
    "Bogota",
    "Masculine",
    "CARDRAPIER@HOTMAIL.COM",
    "Masculine",
    "3102068794",
    "Emaul"
  ),
  createData(
    6,
    "Santiago Guzman",
    "3102068794",
    "Calle 157a#98a - 54",
    "101947849",
    "CC",
    "Studen",
    "27/02/199",
    "Bogota",
    "Masculine",
    "CARDRAPIER@gmail.COM",
    "Masculine",
    "3102068794",
    "Emaul"
  ),
];

export default function DataTableUser() {
  const [page, setPage] = React.useState(0);
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

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Documento</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Correo</TableCell>
            <TableCell align="right">Celular</TableCell>
            <TableCell align="right">Genero</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <Row key={row.code} row={row} />
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
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
