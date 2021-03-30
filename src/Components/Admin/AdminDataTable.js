import {
  api_doctors,
  api_doctors_entities,
  api_employees,
  api_entities,
  api_packages,
  api_services,
  api_transactions,
  api_type_document,
  api_type_employee,
} from "../../api_app";

import AdminRow from "./AdminRow";
import BackDropLoading from "../BackDropLoading";
import Grid from "@material-ui/core/Grid";
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
import { remove_abbreviation } from "../../utils";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 900,
  },
  smallTableCell: {
    width: 50,
  },
}));

export default function AdminDataTable(props) {
  const classes = useStyles();
  const [loaded, setLoaded] = React.useState(false);
  const { data, filter } = props;
  const [rows, setRows] = React.useState([]);
  const [subdata, setSubData] = React.useState(undefined);
  React.useEffect(() => {
    if (data.title === "Servicios") {
      api_services
        .get("/", {
          params: {
            excludeConvenios: true,
            excludePaquetes: true,
          },
        })
        .then((res) => {
          setRows(remove_abbreviation(res.data.respuesta, "SE-"));
          setLoaded(true);
        })
        .catch((error) => {
          setLoaded(true);
        });
    } else if (data.title === "Paquetes") {
      api_packages
        .get("/")
        .then((res) => {
          setRows(res.data.respuesta);
          setLoaded(true);
        })
        .catch((error) => {
          setLoaded(true);
        });
    } else if (data.title === "Entidades") {
      api_entities
        .get("/convenios")
        .then((res) => {
          setRows(res.data.respuesta);
          api_transactions
            .get("/")
            .then((res) => setSubData({ transactions: res.data.respuesta }))
            .catch((error) => setLoaded(true));

          api_doctors_entities
            .get("/")
            .then((res) => {
              setSubData((subdata) => ({
                ...subdata,
                doctor_entity: res.data.respuesta,
              }));
              setLoaded(true);
            })
            .catch((error) => setLoaded(true));
        })
        .catch((error) => {
          setLoaded(true);
        });
    } else if (data.title === "Convenios") {
      api_entities
        .get("/convenios")
        .then((res) => {
          setRows(res.data.respuesta);
          api_services
            .get("/")
            .then((res) => {
              setSubData((subdata) => ({
                ...subdata,
                services: res.data.respuesta,
              }));
              setLoaded(true);
            })
            .catch((error) => {
              setLoaded(true);
            });
        })
        .catch((error) => {
          setLoaded(true);
        });
    } else if (data.title === "Empleados") {
      api_type_employee.get("/").then((res) => {
        setSubData({ type_employees: res.data.respuesta });
        api_type_document.get("/").then((res) => {
          setSubData((subdata) => ({
            ...subdata,
            type_documents: res.data.respuesta,
          }));
          api_employees
            .get("/")
            .then((res) => {
              setRows(res.data.respuesta);
              setLoaded(true);
            })
            .catch((error) => {
              setLoaded(true);
            });
        });
      });
    } else if (data.title === "Doctores") {
      api_doctors
        .get("/")
        .then((res) => {
          setRows(res.data.respuesta);
          setLoaded(true);
        })
        .catch((error) => {
          setLoaded(true);
        });
    }
  }, [data.title]);

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
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.smallTableCell} />
            {data.header.map((head, index) => (
              <TableCell align="center" key={index}>
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell key={"single-row"} colSpan={10}>
                <Grid container justify="center" alignItems="center">
                  No hay servicios seleccionados
                </Grid>
              </TableCell>
            </TableRow>
          ) : (
            (rowsPerPage > 0
              ? rows
                  .filter((row) =>
                    row[filter.id]
                      .toString()
                      .toLowerCase()
                      .includes(filter.query.toLowerCase())
                  )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => {
              switch (data.title) {
                case "Entidades":
                  return (
                    <AdminRow
                      key={row.cod_entidad}
                      tableCells={[
                        row.razon_social_entidad,
                        row.nombre_comercial_entidad,
                        row.nit_entidad,
                        row.direccion_entidad,
                        row.telefono_entidad,
                      ]}
                      subdata={subdata}
                      row={row}
                      data={data}
                    />
                  );
                case "Paquetes":
                  return (
                    <AdminRow
                      key={row.cod_paquete}
                      tableCells={[row.nombre_paquete, row.precio_paquete]}
                      row={row}
                      data={data}
                    />
                  );
                case "Convenios":
                  return (
                    <AdminRow
                      key={row.cod_entidad}
                      tableCells={[
                        row.razon_social_entidad,
                        subdata !== undefined && subdata.services !== undefined
                          ? row.Convenios.map(
                              (element, index) =>
                                subdata.services.find(
                                  (service) =>
                                    service.cod_servicio ===
                                    element.cod_servicio
                                ).nombre_servicio
                            ).join(" - ")
                          : "",
                      ]}
                      row={row}
                      subdata={subdata}
                      data={data}
                    />
                  );
                case "Empleados":
                  return (
                    <AdminRow
                      key={row.cod_empleado}
                      tableCells={[
                        row.nombres_empleado + " " + row.apellidos_empleado,
                        row.documento_empleado,
                        subdata !== "undefined" &&
                        subdata.type_documents !== "undefined"
                          ? subdata.type_documents.find(
                              (element) =>
                                element.cod_tipo_documento ===
                                row.cod_tipo_documento
                            ).nombre_tipo_documento
                          : row.cod_tipo_documento,
                        row.usuario_empleado,
                        subdata !== "undefined" &&
                        subdata.type_employees !== "undefined"
                          ? subdata.type_employees.find(
                              (element) =>
                                element.cod_tipo_empleado ===
                                row.cod_tipo_empleado
                            ).nombre_tipo_empleado
                          : row.cod_tipo_empleado,
                      ]}
                      row={row}
                      data={data}
                    />
                  );

                case "Doctores":
                  return (
                    <AdminRow
                      key={row.cod_doctor}
                      tableCells={[
                        row.nombres_doctor + " " + row.apellidos_doctor,
                        row.telefono_doctor,
                        row.correo_doctor,
                      ]}
                      row={row}
                      data={data}
                    />
                  );

                default:
                  return (
                    <AdminRow
                      key={row.cod_servicio}
                      tableCells={[
                        row.nombre_servicio,
                        row.precio_servicio,
                        row.iva_servicio + "%",
                      ]}
                      row={row}
                      data={data}
                    />
                  );
              }
            })
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
              count={rows.length}
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
      <BackDropLoading isSubmitting={!loaded} />
    </TableContainer>
  );
}
