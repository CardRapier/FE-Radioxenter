import {
  api_cities,
  api_sex,
  api_type_document,
  api_type_shipment,
  api_users,
} from "../../../api_app";

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

export default function UserDatatable() {
  const [users, setUsers] = React.useState([]);
  const [data, setData] = React.useState({});
  React.useEffect(() => {
    api_users.get("/").then((res) => {
      setUsers(res.data.respuesta);
    });
    api_type_document.get("/").then((res) => {
      setData((prevState) => ({
        data: {
          ...prevState.data,
          type_document: res.data.respuesta,
        },
      }));
    });
    api_cities.get("/").then((res) => {
      setData((prevState) => ({
        data: {
          ...prevState.data,
          cities: res.data.respuesta,
        },
      }));
    });
    api_sex.get("/").then((res) => {
      setData((prevState) => ({
        data: {
          ...prevState.data,
          sex: res.data.respuesta,
        },
      }));
    });

    api_type_shipment.get("/").then((res) => {
      setData((prevState) => ({
        data: {
          ...prevState.data,
          type_shipment: res.data.respuesta,
        },
      }));
    });
  }, []);
  const [page, setPage] = React.useState(0);
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
            ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : users
          ).map((row) => (
            <UserRow key={row.cod_usuario} row={row} fetched_data={data} />
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
              rowsPerPageOptions={[5, 10, 25, { label: "Todas", value: -1 }]}
              count={users.length}
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
