import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Button,
  TableRow,
  TableCell,
  TextField,
  ButtonGroup,
  Table,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import CssBaseline from "@mui/material/CssBaseline";

import Link from "@mui/material/Link";

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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

var count = 2;
export default function Table1() {
  const [arrayques, setQues] = useState([]);
  const id = localStorage.getItem("id");
  const IDnumber = localStorage.getItem("IDnumber");
  const tambon_id = localStorage.getItem("tambon_id");
  const [data1, setData] = useState([]);
  const [data2, setData1] = useState([]);
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [showButton1, setShowButton1] = useState(false);
  const [showButton2, setShowButton2] = useState(false);

  const [status, setstatus] = useState();
  const [showother, setShowother] = useState(false);

  useEffect(() => {
    async function getJSON() {
      const response = await fetch("http://localhost:3333/layer1", {
        method: "GET", // or 'PUT'
      });

      const data = await response.json();

      setData(data);
    }

    getJSON();

    async function getJSON1() {
      const response = await fetch("http://localhost:3333/getstatus", {
        method: "GET", // or 'PUT'
      });

      const data3 = await response.json();

      setData1(data3);
    }

    getJSON1();
  }, []);
  useEffect(() => {
    console.log("arrayques ====>", arrayques);
  }, [arrayques]);

  useEffect(() => {
    console.log("ques ====>", question);
  }, [question]);
  //console.log(data1);
  //console.log(data2);

  function gotolayer(params, params1, params2) {
    console.log("p", params);
    console.log("p1", params1);
    console.log("p2", params2);

    setQues([...arrayques, { params2 }]);

    count++;
    const jsonData = {
      id_header: params1,
    };
    async function postJSON(jsonData) {
      const response = await fetch("http://localhost:3333/getlayer" + params, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      const data = await response.json();
      console.log(data);
      setData(data);
      if (params === 4) {
        const arrayans = data.map(function (element) {
          return element.description;
        });
        console.log(arrayans);

        setAnswer(arrayans.toString());
      }
    }

    postJSON(jsonData);
    console.log(count);
    //console.log("ques", arrayques);
  }

  const clickstatus1 = () => {
    setstatus("ปิดเคส");
  };
  const clickstatus2 = () => {
    setstatus("ส่งต่อเคส");
  };
  const clickstatus3 = () => {
    setstatus("รออัพเดทข้อมูล");
  };
  function handlechage(event) {
    //console.log(event.target.value);
    const array = arrayques.map(function (element) {
      return element.params2;
    });
    console.log(array);
    setQuestion(array.toString());
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      admin_id: id,
      status: status,
      question: question,
      answer: answer,
      other: data.get("other"),
      IDnumber: IDnumber,
      tambon_id: tambon_id,
    };
    async function postJSON(jsonData) {
      try {
        const response = await fetch("http://localhost:3333/case_status", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        });
        console.log("data", jsonData);
        const result = await response.json();
        console.log("Success:", result);
        if (result.status === "ok") {
          localStorage.removeItem("IDnumber");
          localStorage.removeItem("tambon_id");
          //localStorage.setItem("token", result.token);
          window.location = "/dashboard";
          // alert('regsiter ok')
        } else {
          //window.location = "/table1";
          //alert('lregsiter fail')
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    postJSON(jsonData);
  };
  return (
    <React.Fragment>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xl">
          <CssBaseline />
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {data1.map((row) => (
              <Table>
                <Chip label={row.description} key={row.id} />
                {/* <Button
                    value={row.description}
                    key={row.id}
                    onClick={() =>
                      gotolayer(row.layer_next, row.id, row.description)
                    }
                  >
                    {row.description}
                  </Button> */}
              </Table>
            ))}

            {showother && (
              <TextField
                fullWidth
                id="other"
                name="other"
                label="ระบุรายละเอียด"
                variant="outlined"
              />
            )}
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              {showButton && (
                <Button
                  name="status"
                  id="status"
                  value="ปิดเคส"
                  type="submit"
                  onClick={() => {
                    clickstatus1();
                    handlechage();
                  }}
                >
                  {" "}
                  ปิดเคส
                </Button>
              )}
              {showButton1 && (
                <Button
                  name="status"
                  id="status"
                  value="ส่งต่อเคส"
                  type="submit"
                  onClick={() => {
                    clickstatus2();
                    handlechage();
                  }}
                >
                  ส่งต่อเคส
                </Button>
              )}
              {showButton2 && (
                <Button
                  name="status"
                  id="status"
                  value="รออัพเดทข้อมูล"
                  type="submit"
                  onClick={() => {
                    clickstatus3();
                    handlechage();
                  }}
                >
                  รออัพเดทข้อมูล
                </Button>
              )}
            </ButtonGroup>
          </Box>

          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
