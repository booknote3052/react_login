import * as React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";

import LockIcon from "@mui/icons-material/Lock";
import HistoryIcon from "@mui/icons-material/History";
import sso from "../sso.png";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";

export default function Header() {
  var [data1, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openhistory, setOpenhistory] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [password, setPassword] = React.useState();
  const [fname, setFname] = React.useState();
  const [lname, setLname] = React.useState();
  const [date, setDate] = React.useState(new Date());
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenhistory = (scrollType) => () => {
    setOpenhistory(true);
    setScroll(scrollType);
  };

  const handleClosehistory = () => {
    setOpenhistory(false);
  };
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (openhistory) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openhistory]);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000 * 30);
    return () => {
      clearInterval(timer);
    };
  }, []);
  React.useEffect(() =>  {
    setFname(localStorage.getItem('fname'));
    setLname(localStorage.getItem('lname'));
    const jsonData1 = {
      id: localStorage.getItem("id"),
      
    };
    async function postJSON1(jsonData1) {
      const response = await fetch("http://localhost:3333/gettimestamp", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData1),
      });

      const data = await response.json();
      setData(data);
      console.log(data1);
    }

    postJSON1(jsonData1);
    
  }, []);
  const day = date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const time = date.toLocaleString("th-TH", {
    hour: "numeric",
    minute: "numeric",
  });
  function handleChange(event) {
    setPassword(event.target.value);
  }

  function Logout(event) {
    const jsonData1 = {
      id: localStorage.getItem("id"),
      status: " ออกจากระบบ",
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
      if(data.status==='ok')
      {
        window.location='/login'
      }
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      localStorage.removeItem("fname");
      localStorage.removeItem("lname");
    }

    postJSON1(jsonData1);
  
  }


  const handleSubmit = (event) => {
    var id = localStorage.getItem("id");

    const jsonData = {
      password: password,
      id: id,
    };
    async function postJSON(jsonData) {
      try {
        const response = await fetch("http://localhost:3333/updatepassword", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        });

        const result = await response.json();
        console.log(result);
        if (result.status === "ok") {
          alert("เปลี่ยนรหัสผ่านสำเร็จ");
        }
      } catch (err) {}
    }
    postJSON(jsonData);
  };
 
  return (
    <AppBar potion="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar variant="dense">
        <Typography variant="body2">{day}</Typography>

        <Divider
          orientation="vertical"
          flexItem="true"
          variant="middle"
          light
          sx={{ margin: 2 }}
        />

        <Typography sx={{ flexGrow: 1 }} variant="body2">
          {" "}
          {time} น.
        </Typography>
        <IconButton color="inherit" onClick={()=>{handleClickOpen();
       }}>
          <LockIcon />
          <Typography variant="body2">เปลี่ยนรหัสผ่าน</Typography>
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>เปลี่ยนรหัสผ่าน</DialogTitle>
        <DialogContent>
          
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="รหัสผ่านใหม่"
            type="password"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ยกเลิก</Button>
          <Button onClick={()=>{handleClose(); handleSubmit();}}>เปลี่ยนรหัสผ่าน</Button>
        </DialogActions>
      </Dialog>
        <Divider
          orientation="vertical"
          flexItem="true"
          variant="middle"
          light
          sx={{ margin: 2 }}
        />
        <IconButton color="inherit" onClick={handleClickOpenhistory('paper')}>
          <HistoryIcon />
          <Typography variant="body2">ประวัติการใช้งานระบบ</Typography>
        </IconButton>
        <Dialog
        open={openhistory}
        onClose={handleClosehistory}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>วันที่</TableCell>
                  <TableCell>เวลา</TableCell>
                  <TableCell>สถานะ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {data1.map((row) => (
            <TableRow
              key={row.name}
             
            >
              
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
        
            </TableRow>
          ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosehistory}>Cancel</Button>
          <Button onClick={handleClosehistory}>Subscribe</Button>
        </DialogActions>
      </Dialog>
      </Toolbar>

      <Toolbar
        variant="dense"
        sx={{
          backgroundColor: "#ffffff",
        }}
      >
        {" "}
        <img src={sso} width="70" height="70" />
        <Box sx={{ flexGrow: 1 }}>
          <Typography color="black">ระบบรับเรื่องร้องเรียน</Typography>
          <Typography color="gray" variant="subtitle2">
            สำนักงานประกันสังคม
          </Typography>
        </Box>
        <Box sx={{ p: 1 }}>
          <Typography color="black" align="right">
          {fname}{" "}{lname}
          </Typography>
          <IconButton edge="end" onClick={Logout}>
            <LogoutIcon />
            <Typography variant="subtitle2">ออกจากระบบ</Typography>
          </IconButton>
        </Box>
        <Avatar sx={{ width: 56, height: 56 }}>
          <PersonIcon />
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}
