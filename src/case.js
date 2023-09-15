import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Button,
  TableRow,
  TableCell,
  TableHead,
 
  Table,
} from "@mui/material";


import { Link } from "react-router-dom";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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



const defaultTheme = createTheme();

function gototable() {
  window.Location = "/login";
}

var count = 2;
export  default function Case() {
  // console.log(id);
  var [data1, setData] = useState([]);
  const [data2, setData2] = useState([]);
  var admin;

  useEffect(() => {
    const id = localStorage.getItem("id");
    const admin_id = localStorage.getItem("id");
    async function getJSON() {
      const response = await fetch("http://localhost:3333/getinfoadmin/" + id, {
        method: "GET", // or 'PUT'
      });

      const data = await response.json();
      admin = data;
      setData(data);
      console.log(data);
    }
    getJSON();

    async function getJSON1() {
      const response = await fetch("http://localhost:3333/getinfocase/" + admin_id,
        {
          method: "GET", // or 'PUT'
        }
      );

      const case_status = await response.json();

      //console.log(data3);
      setData2(case_status);
    }

    getJSON1();
  }, []);
  // console.log(data1);

  console.log("admin", data1);
  console.log(data2);
  return (
    <React.Fragment>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xl">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {" "}
          {data1.map((admin) => (
            <Typography>
              {"ชื่อพนักงาน : "}
              {admin.fname} {admin.lname}
            </Typography>
          ))}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">รหัสเคส</TableCell>
                <TableCell align="center">สถานะเคส</TableCell>
                <TableCell align="center">คำถาม</TableCell>
                <TableCell align="center">คำตอบ</TableCell>
                <TableCell align="center">อื่นๆ</TableCell>
                <TableCell align="center">รหัสบัตรปชช</TableCell>
                <TableCell align="center">รหัสตำบล</TableCell>
              </TableRow>
            </TableHead>
            {data2.map((row) => (
              <TableRow hover tabIndex={-1}>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">{row.question}</TableCell>
                <TableCell align="center">{row.answer}</TableCell>
                <TableCell align="center">{row.other}</TableCell>
                <TableCell align="center">{row.IDnumber}</TableCell><
                  TableCell align="center">{row.tambon_id}</TableCell>

              </TableRow>
            ))}
          </Table>
          <div>
            <Link to="/register">
              <Button variant="contained" onClick={gototable()}>
                เปิดเคส
              </Button>
            </Link>
          </div>
        </Box>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
        </React.Fragment>
  );
}


