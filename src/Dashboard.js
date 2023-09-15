import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";
import  Divider  from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Case from './case'
import Header from "./component/header.js";
import CustomizedBreadcrumbs from "./component/breadcrumbs.js";
import SignUp from "./register";
import Sidebar from "./component/sidebar.js";
import Steppers from "./component/stepper";
import Personinfo from "./component/personinfo";
import Contactinfo from "./component/contactinfo";
import Table1 from "./table1";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

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
    
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 2 }}>
       
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper
                sx={{ p: 2, display: "flex", flexDirection: "column" }}
              >
                <Steppers/>
                <Divider />
              
               {/* <Personinfo/> */}
               <Contactinfo/>
               {/* <Table1/> */}
              </Paper>
            </Grid>
          </Grid>
          
        </Container>
      </Box>
    </Box>
  );
}
