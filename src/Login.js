import * as React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";

import sso from "./sso.png";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { InputAdornment } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
function Footer(props) {
  return (
    <Typography variant="body1" color="black" align="center" {...props}>
      สำนักงานประกันสังคม สำนักงานใหญ่
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignInSide() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      users: data.get("users"),
      password: data.get("password"),
    };
    async function postJSON(jsonData) {
      try {
        const response = await fetch("http://localhost:3333/login", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        });

        const result = await response.json();
        console.log("Success:", result);
        if (result.status === "ok") {
          localStorage.setItem("token", result.token);
          localStorage.setItem("id", result.admin);
          localStorage.setItem("fname", result.fname);
          localStorage.setItem("lname", result.lname);
          // console.log(result)

          window.location = "/casestatus";
          //alert('login ok')
        } else {
          //window.location='/login'
          console.log(result);
          alert("login fail");
        }
      } catch (errr) {}
    }
    postJSON(jsonData);
    const jsonData1 = {
      id: localStorage.getItem("id"),
      status: "เข้าสู่ระบบ",
    };
    async function postJSON1(jsonData1) {
      const response = await fetch("http://localhost:3333/timestamp", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData1),
      });

      const data = await response.json();
      console.log("Success:", data);
    }

    postJSON1(jsonData1);
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        backgroundColor: "#gray",
      }}
    >
      <CssBaseline />

      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={sso} width="100" height="100" />

          <Typography component="h3" variant="subtitle1">
            ระบบรับเรื่องร้องเรียน
          </Typography>
          <Typography component="h6" color="gray" variant="subtitle2">
            สำนักงานประกันสังคม
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1, backgroundColor: "#ffffff", padding: "24px" }}
          >
            <Typography
              component="h4"
              variant="h6"
              gutterBottom="true"
              sx={{ textAlign: "center" }}
            >
              เข้าสู่ระบบ
            </Typography>
            <Typography
              component="h4"
              variant="body2"
              sx={{ textAlign: "left" }}
            >
              ชื่อผู้ใช้(Username)
            </Typography>
            <TextField
              margin="normal"
              fullWidth
              id="users"
              name="users"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              placeholder="ชื่อผู้ใช้"
            />
            <Typography
              component="h4"
              variant="body2"
              sx={{ textAlign: "left" }}
            >
              รหัสผ่าน(Password)
            </Typography>
            <TextField
              type={showPassword ? "text" : "password"}
              margin="normal"
              fullWidth
              id="password"
              name="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              placeholder="รหัสผ่าน"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              เข้าสู่ระบบ
            </Button>
          </Box>
          <Footer sx={{ mt: 5 }} />
          <Typography variant="body1" color="gray" align="center">
            เลขที่ 88/8 หมู่ 4 ถนนติวานนท์
          </Typography>
          <Typography variant="body1" color="gray" align="center">
            ตำบลตลาดขวัญ อำเภอเมือง จังหวัดนนทบุรี รหัสไปษณย์ 11000
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          backgroundImage:
            "url(https://scontent.fbkk28-1.fna.fbcdn.net/v/t1.15752-9/373357468_320278623863470_6670975841632662273_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeHT-WE0iMnfdMgBHkt4k3uHp231LZhzG-KnbfUtmHMb4mmyyKuzWU14ITFKtgt728iSyIW9LZXq0X2rOAMHKI3j&_nc_ohc=BvxcRo-ZGqsAX8Tf4_g&_nc_ht=scontent.fbkk28-1.fna&oh=03_AdSgw-37asq2kHzb2ontXDAunbRhTZWXDngV7NnaoVLjzw&oe=6520F4F9)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "right",
        }}
      />
    </Grid>
  );
}
