// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const [Provice1, setProvice] = React.useState("");

  const [amphpur1, setAmphur] = React.useState("");
  const [provice, setData] = useState([]);
  const [tambon, setData1] = useState([]);
  useEffect(() => {
    async function getJSON() {
      const response = await fetch("http://localhost:3333/getprovice", {
        method: "GET", // or 'PUT'
      });

      const data = await response.json();

      setData(data);
    }
    getJSON();
  }, []);

  //console.log(provice,amphur);*/
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    localStorage.setItem("IDnumber", data.get("IDnumber"));

    const jsonData = {
      IDnumber: data.get("IDnumber"),
      

      postcode: data.get("postcode"),
    };
    console.log(jsonData);
    if (tambon.length === 0) {
      alert("รหัสไปรษณีย์ไม่ถูกต้อง");
    } else {
      async function postJSON(jsonData) {
        try {
          const response = await fetch("http://localhost:3333/register", {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),
          });

          const result = await response.json();
          console.log("Success:", result);
          if (result.status === "ok") {
            //localStorage.setItem('token',result.token)
            window.location = "/table1";
            // alert('regsiter ok')
          } else {
            window.location = "/register";
            //alert('lregsiter fail')
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }

      postJSON(jsonData);
    }
  };

  const handleChange1 = (event) => {
    event.preventDefault();
    const data = event.target.value;
    async function getJSON() {
      const response = await fetch("http://localhost:3333/gettambon/" + data, {
        method: "GET", // or 'PUT'
      });

      const data1 = await response.json();

      if (data1.length === 0) {
        console.log(data1.length);
      } else {
        console.log("data1", data1);
        localStorage.setItem("tambon_id", data1[0].tambon_id);
        setData1(data1[0].tambon_id);
      }
    }
    getJSON();
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            ข้อมูลส่วนตัว
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="IDnumber"
                  label="เลขบัตรประชาชน"
                  name="IDnumber"
                  autoComplete=""
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="ชื่อ"
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="สกุล"
                  name="lastName"
               
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="nation"
                  label="สัญชาติ"
                  name="nation"
                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="status"
                  label="สถานะ"
                  name="status"
                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="tel"
                  label="เบอร์โทร"
                  name="tel"
                  
                />
              </Grid>
            <Grid item xs={12}>
            <FormControl fullWidth>
        <InputLabel >จังหวัด</InputLabel>
        <Select label="province" id="province" name="province" value={Provice1}  onChange={handleChange} >
          {provice.map((row) => (
            <MenuItem key={row.id} value={row.name_th}>
              {row.name_th}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
            </Grid>
            <Grid item xs={12}>
            <FormControl fullWidth>
        <InputLabel >อำเภอ</InputLabel>
        <Select label="amphur" id="amphur" name="amphur"value={amphpur1}    onChange={handleChange1} >
          {amphur.map((row) => (
            <MenuItem key={row.id} value={row.name_th}>
              {row.name_th}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
            </Grid> */}
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange1}
                  fullWidth
                  id="postcode"
                  label="รหัสไปรษณีย์"
                  name="postcode"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ยืนยัน
            </Button>
            <Grid container justifyContent="flex-end"></Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
