import AdminRow from "./AdminRow";
import Paper from "@material-ui/core/Paper";
import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TablePaginationActions from "../TablePaginationActions";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 750,
  },
  smallTableCell: {
    width: 50,
  },
}));

function createDataServices(code, name, price, iva, description) {
  return {
    code,
    name,
    price,
    iva,
    description,
  };
}

function createDataPackages(code, name, price, services) {
  return {
    code,
    name,
    price,
    services,
  };
}

const rowsServices = [
  createDataServices(1, "Periapical", 12000, 0, "Periapical"),
  createDataServices(2, "Coronal", 12000, 0, "Coronal"),
  createDataServices(3, "Oclusal", 25000, 0, "Oclusal"),
  createDataServices(4, "Carpograma", 25000, 0, "Carpograma"),
];

const rowsPackages = [
  createDataPackages(1, "Orto 2 Completo", 80000, [
    rowsServices[0],
    rowsServices[2],
    rowsServices[3],
  ]),
  createDataPackages(2, "Orto 3 Completo", 90000, [
    rowsServices[0],
    rowsServices[1],
    rowsServices[2],
    rowsServices[3],
  ]),
];

export default function AdminDataTable(props) {
  const classes = useStyles();
  const data = props.data;
  const [rows, setRows] = React.useState([])
  React.useEffect(()=>{
    if (data.title === 'Servicios') {
      setRows(rowsServices)
    }
    else if (data.title === 'Paquetes') {
      setRows(rowsPackages)
    }
  })
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.smallTableCell} />
            {data.header.map((head) => (
              <TableCell align="center">{head}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => {
            switch (data.title) {
              case "Paquetes":
                return (
                  <AdminRow
                    key={row.code}
                    tableCells={[row.name, row.price]}
                    row={row}
                    data={data}
                  />
                );
              default:
                return (
                  <AdminRow
                    key={row.code}
                    tableCells={[row.name, row.price, row.iva]}
                    row={row}
                    data={data}
                  />
                );
            }
          })}

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
