import React, { useRef } from "react";
import {
  api_agreements,
  api_doctors,
  api_employees,
  api_entities,
  api_packages,
  api_services,
  api_type_document,
  api_type_employee,
} from "../../api_app";

import AdminRow from "./AdminRow";
import Paper from "@material-ui/core/Paper";
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

export default function AdminDataTable(props) {
  const classes = useStyles();
  const { data, filter } = props;
  const [rows, setRows] = React.useState([]);
  const [subdata, setSubData] = React.useState(undefined);
  const [example, setExample] = React.useState(undefined);
  React.useEffect(() => {
    if (data.title === "Servicios") {
      api_services.get("/").then((res) => {
        setRows(res.data.respuesta);
      });
    } else if (data.title === "Paquetes") {
      api_packages.get("/").then((res) => {
        setRows(res.data.respuesta);
      });
    } else if (data.title === "Entidades") {
      api_entities.get("/").then((res) => {
        setRows(res.data.respuesta);
      });
    } else if (data.title === "Convenios") {
      api_agreements.get("/").then((res) => {
        setRows(res.data.respuesta);
        setExample(res.data.respuesta);
        api_entities.get("/").then((res) => {
          let entities = res.data.respuesta;
          setRows((row) =>
            row.map((element) => ({
              ...element,
              razon_social_entidad: entities.find(
                (entity) => entity.cod_entidad === element.cod_entidad
              ).razon_social_entidad,
            }))
          );

          api_services.get("/").then((res) => {
            setSubData((subdata) => ({
              ...subdata,
              services: res.data.respuesta,
            }));
          });
        });
      });
    } else if (data.title === "Empleados") {
      api_type_employee.get("/").then((res) => {
        setSubData({ type_employees: res.data.respuesta });
        api_type_document.get("/").then((res) => {
          setSubData((subdata) => ({
            ...subdata,
            type_documents: res.data.respuesta,
          }));
          api_employees.get("/").then((res) => {
            setRows(res.data.respuesta);
          });
        });
      });
    } else if (data.title === "Doctores") {
      api_doctors.get("/").then((res) => {
        setRows(res.data.respuesta);
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

  return (rows !== undefined && subdata !== undefined) ||
    data.title !== "Convenios" ? (
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
                    key={row.cod_convenio}
                    tableCells={[
                      row.razon_social_entidad,
                      subdata !== undefined && subdata.services !== undefined
                        ? subdata.services
                            .filter(
                              (element) =>
                                element.cod_servicio === row.cod_servicio
                            )
                            .map((service, index) => {
                              if (index > 0) {
                                return service.nombre_servicio + " - ";
                              } else {
                                return service.nombre_servicio;
                              }
                            })
                        : "",
                    ]}
                    row={row}
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
                      row.iva_servicio,
                    ]}
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
              rowsPerPageOptions={[5, 10, 25, { label: "Todas", value: -1 }]}
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
  ) : (
    ""
  );
}
