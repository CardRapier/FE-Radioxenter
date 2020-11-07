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
import { api_services } from "../../api_app";
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

function createDataEntity(
  code,
  social_name,
  commercial_name,
  nit,
  address,
  telephone,
  method_payment,
  type_receipt,
  agent_name,
  agent_document,
  agent_telephone,
  agent_email,
  contact_name,
  contact_document,
  contact_telephone,
  contact_email
) {
  return {
    code,
    social_name,
    commercial_name,
    nit,
    address,
    telephone,
    method_payment,
    type_receipt,
    agent_name,
    agent_document,
    agent_telephone,
    agent_email,
    contact_name,
    contact_document,
    contact_telephone,
    contact_email,
  };
}

function createAgreements(code, entity, services, dates) {
  return {
    code,
    entity,
    services,
    dates,
  };
}

function createEmployees(
  code,
  name,
  document,
  address,
  birth_date,
  telephone,
  employee_type,
  email,
  user,
  type_document
) {
  return {
    code,
    name,
    document,
    address,
    birth_date,
    telephone,
    employee_type,
    email,
    user,
    type_document,
  };
}

function createDoctors(
  code,
  name,
  address,
  telephone,
  document,
  type_document,
  type_pref_shipment,
  email
) {
  return {
    code,
    name,
    address,
    telephone,
    document,
    type_document,
    type_pref_shipment,
    email,
  };
}

const rowsServices = [
  createDataServices(1, "Periapical", 12000, 0, "Periapical"),
  createDataServices(2, "Coronal", 12000, 0, "Coronal"),
  createDataServices(3, "Oclusal", 25000, 0, "Oclusal"),
  createDataServices(4, "Carpograma", 25000, 0, "Carpograma"),
  createDataServices(5, "Orto 3 Completo", 90000, 0, "Orto 3 Completo"),
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

const rowsEntities = [
  createDataEntity(
    1,
    "Compensar",
    "Compensar",
    "12340020-300",
    "Ak 68 ## 49A - 47",
    "3077001",
    "Mensual",
    "Electronica",
    "Carlos Mauricio Vasques Paez",
    "79'541.640",
    "3077001",
    "compensar@compensar.com",
    "Carlos Mauricio Vasques Paez",
    "79'541.640",
    "3077001",
    "compensar@compensar.com"
  ),
];

const rowsAgreements = [
  createAgreements(
    1,
    rowsEntities[0],
    [rowsServices[1], rowsServices[4]],
    [
      { initial: "27/02/2021", final: "28/02/2022" },
      { initial: "27/02/2021", final: "28/02/2022" },
    ]
  ),
];

const rowsEmployees = [
  createEmployees(
    1,
    "Carlos Santana",
    "52159357",
    "Calle 159 a 12c",
    "30/12/2000",
    "310789456",
    "Administrador",
    "carlosSantana@gmail.com",
    "CSantana",
    "CC"
  ),
];

const rowsDoctors = [
  createDoctors(
    1,
    "Wilson Vargas",
    "Calle 123c 56 - 51",
    "4895126",
    "10123155",
    "CC",
    "Correo",
    "oswall@gmail.com"
  ),
];

export default function AdminDataTable(props) {
  const classes = useStyles();
  const data = props.data;
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    if (data.title === "Servicios") {
      api_services.get("/").then((res) => {
        setRows(res.data.respuesta);
      });
    } else if (data.title === "Paquetes") {
      setRows(rowsPackages);
    } else if (data.title === "Entidades") {
      setRows(rowsEntities);
    } else if (data.title === "Convenios") {
      setRows(rowsAgreements);
    } else if (data.title === "Empleados") {
      setRows(rowsEmployees);
    } else if (data.title === "Doctores") {
      setRows(rowsDoctors);
    }
  }, [data.title]);

  console.log(rows);
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
          {(rows !== undefined && rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => {
            switch (data.title) {
              case "Entidades":
                return (
                  <AdminRow
                    key={row.code}
                    tableCells={[
                      row.social_name,
                      row.commercial_name,
                      row.nit,
                      row.address,
                      row.telephone,
                    ]}
                    row={row}
                    data={data}
                  />
                );
              case "Paquetes":
                return (
                  <AdminRow
                    key={row.code}
                    tableCells={[row.name, row.price]}
                    row={row}
                    data={data}
                  />
                );
              case "Convenios":
                return (
                  <AdminRow
                    key={row.code}
                    tableCells={[
                      row.entity.commercial_name,
                      row.services.map((service) => service.name + " - "),
                    ]}
                    row={row}
                    data={data}
                  />
                );
              case "Empleados":
                return (
                  <AdminRow
                    key={row.code}
                    tableCells={[
                      row.name,
                      row.document,
                      row.type_document,
                      row.user,
                      row.employee_type,
                    ]}
                    row={row}
                    data={data}
                  />
                );

              case "Doctores":
                return (
                  <AdminRow
                    key={row.code}
                    tableCells={[row.name, row.telephone, row.email]}
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
