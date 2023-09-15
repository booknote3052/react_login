import * as React from "react";

import Box from "@mui/material/Box";
import Footer from "../../component/footer.js";
import Toolbar from "@mui/material/Toolbar";
import CustomBreadcrumbs1 from "../../component/breadcrumbs1.js";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Header from "../../component/header.js";

import Sidebar from "../../component/sidebar.js";
import Steppers from "../../component/stepper.js";

import Personinfo from "../../component/personinfo.js";
var stepper = 0;
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

// TODO remove, this demo shouldn't need to reset the theme.

export default function Casepersoninfo() {
  return (
    <>
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
            <Grid>
              <Grid item sx={{ width: "100%" }}>
                <CustomBreadcrumbs1 />
                <Typography variant="h4" margin={1}></Typography>
                <Paper sx={{ display: "flex", flexDirection: "column" }}>
                  <Steppers data={stepper} />
                  <Divider />

                  <Personinfo />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
