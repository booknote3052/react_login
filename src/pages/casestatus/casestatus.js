import * as React from "react";

import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Footer from "../../component/footer";
import Tablecase from "../../component/tablecase";

import Header from "../../component/header";
import Sidebar from "../../component/sidebar";

import CustomBreadcrumbs from "../../component/breadcrumbs";

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

export default function Casestatus() {
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    async function postJSON() {
      try {
        const response = await fetch("http://localhost:3333/authen", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });

        const result = await response.json();
        console.log("Success:", result);
        if (result.status === "ok") {
          //alert('authen ok')
        } else {
          alert("authen fail");
          localStorage.removeItem("token");
          window.location = "/login";
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    postJSON();
  }, []);
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

          <Container
            maxWidth="false"
            position="relative"
            sx={{ my: 4, flexGrow: 3 }}
          >
            <Grid>
              <Grid item sx={{ width: "100%" }}>
                <CustomBreadcrumbs />
                <Typography variant="h4" margin={1}>
                  ติดต่อสอบถาม
                </Typography>
                <Paper sx={{ display: "static" }}>
                  <Tablecase />
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
