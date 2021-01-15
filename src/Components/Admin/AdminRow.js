import {
  api_packages,
  api_period_payments,
  api_type_document,
  api_type_receipt,
  api_type_shipment,
} from "../../api_app";

import AgreementsDescription from "./Descriptions/AgreementsDescription";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import DoctorsDescription from "./Descriptions/DoctorsDescription";
import EmployeesDescription from "./Descriptions/EmployeesDescription";
import EntitiesDescription from "./Descriptions/EntitiesDescription";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Link } from "react-router-dom";
import PackageDescription from "./Descriptions/PackageDescription";
import React from "react";
import ServiceDescription from "./Descriptions/ServiceDescription";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  tableRow: {
    marginTop: theme.spacing(2),
    marginBottom: 2,
  },

  actionsPadding: {
    margin: 4,
  },
}));

export default function AdminRow(props) {
  const { tableCells, row, data, subdata } = props;
  const classes = useStyles();
  const [fetchData, setFetchData] = React.useState();
  React.useEffect(() => {
    if (data.title === "Entidades") {
      api_period_payments.get("/").then((res) => {
        setFetchData({ periods: res.data.respuesta });
        api_type_receipt.get("/").then((res) => {
          setFetchData((fetchData) => ({
            ...fetchData,
            type_receipts: res.data.respuesta,
          }));
        });
      });
    } else if (data.title === "Paquetes") {
      api_packages.get(`/${row.cod_paquete}/servicios`).then((res) => {
        setFetchData({ packages: res.data.respuesta });
      });
    } else if (data.title === "Doctores") {
      api_type_shipment.get("/").then((res) => {
        setFetchData({ type_shipments: res.data.respuesta });
        api_type_document.get("/").then((res) => {
          setFetchData((fetchData) => ({
            ...fetchData,
            type_documents: res.data.respuesta,
          }));
        });
      });
    }
  }, [data.title, row.cod_paquete]);

  const [open, setOpen] = React.useState(false);
  console.log(row);
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {tableCells.map((data, index) => (
          <TableCell align="center" key={index}>
            {data}
          </TableCell>
        ))}
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              {() => {
                switch (data.title) {
                  case "Servicios":
                    return <ServiceDescription row={row} />;

                  case "Paquetes":
                    return <PackageDescription row={row} data={fetchData} />;

                  case "Entidades":
                    return <EntitiesDescription row={row} data={fetchData} />;

                  case "Convenios":
                    return <AgreementsDescription row={row} data={subdata} />;

                  case "Empleados":
                    return <EmployeesDescription row={row} />;

                  case "Doctores":
                    return <DoctorsDescription row={row} data={fetchData} />;

                  default:
                    return "";
                }
              }}
            </Box>
            <Divider />
            <Box margin={1}>
              <Grid
                container
                justify="flex-end"
                alignItems="center"
                className={classes.tableRow}
                spacing={4}
              >
                {data.actions.map((action, index) => (
                  <Button
                    component={Link}
                    key={index}
                    to={{
                      pathname: action.action,
                      data: row,
                    }}
                    variant="contained"
                    color="primary"
                    size={"small"}
                    className={classes.actionsPadding}
                  >
                    {action.name}
                  </Button>
                ))}
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
