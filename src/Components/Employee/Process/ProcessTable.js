import { api_type_document, api_type_shipment } from "./../../../api_app";

import Grid from "@material-ui/core/Grid";
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
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 900,
  },
  smallTableCell: {
    width: 50,
  },
}));

export default function ProcessTable(props) {
  const {
    rows,
    handleChangeServiceStatus,
    handleChangeShipmentStatus,
    filter,
  } = props;
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const [type_document, setType_document] = React.useState([]);
  const [type_shipment, setType_shipment] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    api_type_document.get("/").then((response) => {
      setType_document(response.data.respuesta);
    });
    api_type_shipment.get("/").then((response) => {
      setType_shipment(response.data.respuesta);
    });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Nombre</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Documento</TableCell>
            <TableCell>Pref. Entrega</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell key={"single-row"} colSpan={5}>
                <Grid container justify="center" alignItems="center">
                  No hay datos para mostrar
                </Grid>
              </TableCell>
            </TableRow>
          ) : (
            (rowsPerPage > 0
              ? rows
                  .filter((row) =>
                    row["documento_usuario"]
                      .toString()
                      .toLowerCase()
                      .includes(filter.query.toLowerCase())
                  )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, index) => (
              <ProcessRow
                key={`${index}-row`}
                row={row}
                type_document={
                  type_document.length !== 0
                    ? type_document.find(
                        (element) =>
                          element.cod_tipo_documento ===
                          row.data.cod_tipo_documento
                      ).nombre_tipo_documento
                    : ""
                }
                type_pref_shipment={
                  type_shipment.length !== 0
                    ? type_shipment.find(
                        (element) =>
                          element.cod_tipo_pref_entrega ===
                          row.data.cod_tipo_pref_entrega
                      ).nombre_tipo_pref_entrega
                    : ""
                }
                changeServices={handleChangeServiceStatus}
                changeShipments={handleChangeShipmentStatus}
              />
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
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              labelRowsPerPage="Filas por pagina"
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
