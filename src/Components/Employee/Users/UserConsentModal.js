import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid } from "@material-ui/core";
import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TablePaginationActions from "../../TablePaginationActions";
import TableRow from "@material-ui/core/TableRow";
import UserConsentRow from "./UserConsentRow";
import { api_consents } from "../../../api_app";

function UserConsentModal(props) {
  const { modal, setModal, row } = props;
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  let emptyRows = 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    api_consents
      .get(`/usuario/${row.documento_usuario}`)
      .then((res) => {
        setData(res.data.respuesta);
      })
      .catch((error) => console.log(error));
  }, [row.documento_usuario]);

  if (data.length !== 0) {
    emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
  }

  return (
    <React.Fragment>
      <Dialog
        maxWidth={"md"}
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="dialog-title"
      >
        <DialogTitle id="dialog-title">
          {`Consentimientos Firmados por ${row.nombres_usuario} ${row.apellidos_usuario} - ${row.documento_usuario}`}
        </DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Fecha</TableCell>
                <TableCell align="center">Tipo consentimiento</TableCell>
                <TableCell align="center">Descargar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length !== 0 ? (
                (rowsPerPage > 0
                  ? data.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : data
                ).map((element, index) => (
                  <UserConsentRow
                    key={`${index}-row`}
                    row={element}
                    date={element.Transaccion.fecha_transaccion}
                    consent_name={
                      element.Tipo_Consentimiento.nombre_tipo_consentimiento
                    }
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell key={"single-row"} colSpan={10}>
                    <Grid container justify="center" alignItems="center">
                      No hay servicios seleccionados
                    </Grid>
                  </TableCell>
                </TableRow>
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
                    inputProps: { "aria-label": "Fila por página" },
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
    </React.Fragment>
  );
}

export default UserConsentModal;
