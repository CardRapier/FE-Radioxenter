import ConsentCovid from "./ConsentFormats/ConsentCovid";
import ConsentCovidSwitchs from "./ConsentFormats/ConsentCovidSwitchs";
import ConsentExtraOral from "./ConsentFormats/ConsentExtraOral";
import ConsentIntraOral from "./ConsentFormats/ConsentIntraOral";
import Grid from "@material-ui/core/Grid";
import React from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Grid>{children}</Grid>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `consent-tab-${index}`,
    "aria-controls": `consent-tabpanel-${index}`,
  };
}

export default function ConsentContent(props) {
  let {
    tutor,
    data,
    transaction,
    conditions,
    setConditions,
    covid,
    setCovid,
  } = props;
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const validated_consent = (name) => {
    if (name === "Consentimiento Covid") {
      return (
        <ConsentCovidSwitchs
          covid={covid}
          setCovid={setCovid}
          tutor={tutor}
          data={data}
        />
      );
    } else if (name === "Consentimiento Intraoral") {
      return (
        <ConsentIntraOral
          tutor={tutor}
          data={data}
          conditions={conditions}
          setConditions={setConditions}
        />
      );
    } else if (name === "Consentimiento Extraoral") {
      return (
        <ConsentExtraOral
          tutor={tutor}
          data={data}
          conditions={conditions}
          setConditions={setConditions}
        />
      );
    }
  };

  return (
    <Grid container item spacing={4}>
      <Grid item>
        <Tabs
          value={value}
          onChange={(event, value) => setValue(value)}
          indicatorColor="primary"
          textColor="primary"
          scrollButtons="on"
          variant="scrollable"
          className={classes.root}
        >
          {transaction !== undefined
            ? transaction.map((element, index) => (
                <Tab
                  key={`tab-${index}`}
                  label={`${element.nombre_tipo_consentimiento.replace(
                    "Consentimiento ",
                    ""
                  )}`}
                  {...a11yProps(index)}
                />
              ))
            : ""}
        </Tabs>

        {transaction !== undefined
          ? transaction.map((element, index) => (
              <TabPanel key={`tab-panel-${index}`} value={value} index={index}>
                {validated_consent(element.nombre_tipo_consentimiento)}
              </TabPanel>
            ))
          : ""}
      </Grid>
    </Grid>
  );
}
