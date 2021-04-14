import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ProcessConfirm from "./ProcessConfirm";
import ProcessData from "./ProccesData";
import ProcessShipmentData from "./ProcessShipmentData";
import React from "react";
import SatisfactionModal from "../Satisfaction/SatisfactionModal";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";

const useRowStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
}));

export default function ProcessRow(props) {
  const {
    row,
    handleCompleteProcess,
    type_shipment,
    doctorEntities,
    changeServices,
    changeShipments,
    type_document,
    type_pref_shipment,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [modalState, setModalState] = React.useState(false);
  const [survey, setSurvey] = React.useState(false);
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
        <TableCell>{`${row.data.nombres_usuario} ${row.data.apellidos_usuario}`}</TableCell>
        <TableCell>{type_document}</TableCell>
        <TableCell>{row.data.documento_usuario}</TableCell>
        <TableCell>{type_pref_shipment}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={2}>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <ProcessShipmentData
                    type_shipment={type_shipment}
                    doctorEntities={doctorEntities}
                    row={row}
                    type_pref_shipment={type_pref_shipment}
                    style={{ paddingBottom: 10 }}
                  />
                </Grid>
                <Grid item>
                  <ProcessData
                    document={row.data.documento_usuario}
                    services={row.procesos}
                    changeServices={changeServices}
                    changeShipments={changeShipments}
                  />
                </Grid>
                <Grid container item justify="flex-end" spacing={1}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => setModalState(true)}
                    >
                      Completar
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <ProcessConfirm
        modalState={modalState}
        setModalState={setModalState}
        handleCompleteProcess={handleCompleteProcess}
        document={row.data.documento_usuario}
      />
      <SatisfactionModal
        survey={survey}
        setSurvey={setSurvey}
        data={row.data}
      />
    </React.Fragment>
  );
}
