import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import { Divider } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Link } from "react-router-dom";
import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import UserConsentModal from "./UserConsentModal";
import UserData from "./UserData";
import { makeStyles } from "@material-ui/core/styles";

const useRowStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  tableRow: {
    marginTop: theme.spacing(2),
    marginBottom: 2,
  },

  button: {
    marginRight: 2,
  },
}));

export default function UserRow(props) {
  let { row, fetched_data } = props;
  let city_department = undefined;
  if (
    fetched_data.data !== undefined &&
    fetched_data.data.hasOwnProperty("departments")
  ) {
    city_department = fetched_data.data.departments.find((e) =>
      e.Ciudads.find((element) => element.cod_ciudad === row.cod_ciudad)
    );
    row.cod_departamento = city_department.cod_departamento;
  }
  const [open, setOpen] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const classes = useRowStyles();

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
        <TableCell align="center" component="th" scope="row">
          {row.documento_usuario}
        </TableCell>
        <TableCell align="center">
          {row.nombres_usuario + " " + row.apellidos_usuario}
        </TableCell>
        <TableCell align="center">{row.correo_usuario}</TableCell>
        <TableCell align="center">{row.celular_usuario}</TableCell>
        <TableCell align="center">{row.genero_usuario}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              {city_department !== undefined && (
                <UserData
                  row={row}
                  fetched_data={fetched_data}
                  city_department={city_department}
                />
              )}
            </Box>
            <Divider />
            <Box margin={1}>
              <Grid
                container
                justify="flex-end"
                alignItems="center"
                className={classes.tableRow}
                spacing={1}
              >
                <Grid item>
                  <Button
                    row={row}
                    onClick={() => setModal(true)}
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Consentimientos
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={{
                      pathname: "/Empleado/EditarUsuario",
                      data: row,
                      fetched_data: fetched_data,
                      receipt: false,
                    }}
                    size="small"
                  >
                    Editar
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    component={Link}
                    to={{
                      pathname: "/Empleado/EditarUsuario",
                      data: row,
                      fetched_data: fetched_data,
                      receipt: true,
                    }}
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Facturar
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      {modal && (
        <UserConsentModal modal={modal} setModal={setModal} row={row} />
      )}
    </React.Fragment>
  );
}
