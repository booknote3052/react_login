import * as React from "react";

import Box from "@mui/material/Box";
import CustomBreadcrumbs1 from "../../component/breadcrumbs1.js";
import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Header from "../../component/header.js";

import Sidebar from "../../component/sidebar.js";
import Steppers from "../../component/stepper";

import Contactinfo from "../../component/contactinfo";

function Space() {
  return (
    <Toolbar
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        px: [2],
      }}
    ></Toolbar>
  );
}

export default function Casecontactinfo() {
  const [stepper, setStepper] = React.useState(1);

  function Setstep(step) {
    setStepper(step);
  }

  return (
    <Box component="div" sx={{ display: "flex" }}>
      <Header />
      <Sidebar />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 2,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Space />
        <Space />

        <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flexGrow: 2 }}>
          <Grid container>
            <Grid item sx={{ width: "100%" }}>
              <CustomBreadcrumbs1 />
              <Typography variant="h4" margin={1}></Typography>
              <Paper sx={{ display: "flex", flexDirection: "column" }}>
                <Steppers data={stepper} />
                <Divider />

                <Contactinfo setStep={Setstep} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
