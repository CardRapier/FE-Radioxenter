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
  const { row } = props;
  const [open, setOpen] = React.useState(false);
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
        <TableCell component="th" scope="row">
          {row.documento_usuario}
        </TableCell>
        <TableCell align="right">
          {row.nombres_usuario + " " + row.apellidos_usuario}
        </TableCell>
        <TableCell align="right">{row.correo_usuario}</TableCell>
        <TableCell align="right">{row.telefono_usuario}</TableCell>
        <TableCell align="right">{row.genero_usuario}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <UserData row={row} />
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
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Editar
                </Button>
                <Button
                  component={Link}
                  to={{ pathname: "/Empleado/CrearFactura", data: row }}
                  variant="contained"
                  color="primary"
                >
                  Facturar
                </Button>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
