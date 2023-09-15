// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
export default function Personinfo() {
  
  const [tambon, setTambon] = useState([]);
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
            window.location = "/casecontactinfo";
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
        setTambon(data1[0].tambon_id);
      }
    }
    getJSON();
  };
  return (
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
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="IDnumber"
              label="เลขบัตรประชาชน"
              name="IDnumber"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
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
  );
}
