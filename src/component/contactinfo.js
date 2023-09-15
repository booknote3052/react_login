import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Box from "@mui/material/Box";
import { TextField, Grid, Button, ButtonGroup } from "@mui/material";
import Typography from "@mui/material/Typography";

import Toolbar from "@mui/material/Toolbar";
import { Divider } from "@mui/material";
var stepper = 1;
export default function Contactinfo({ setStep }) {
  var arrayselect = [];
  const [arrayques, setArrayQues] = useState([]);
  const [history, setHistory] = useState([{ id: 0, layer: 0, select: "" }]);
  const [data1, setData] = useState([]);
  const header = ["ช่วงเวลาที่ติดต่อ", "Topicหลัก", "Topicย่อย", "ข้อคำตอบ"];
  const [select, setSelact] = useState([]);
  const [selected, setSelacted] = useState();
  const [layer_next, setLayer_next] = useState();
  const [question, setQuestion] = useState([]);
  const [ques, setQues] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [showButton1, setShowButton1] = useState(false);
  const [showButton2, setShowButton2] = useState(false);
  const [showButton3, setShowButton3] = useState(true);
  const [status, setstatus] = useState();
  const [showother, setShowother] = useState(false);
  const id = localStorage.getItem("id");
  const IDnumber = localStorage.getItem("IDnumber");
  const tambon_id = localStorage.getItem("tambon_id");
  useEffect(() => {
    setHistory([...history, { id: 1, layer: 1, select: "" }]);

    async function getJSON() {
      const response = await fetch("http://localhost:3333/getlayer1", {
        method: "POST", // or 'PUT'
      });

      const data = await response.json();
      data.forEach(() => {
        arrayselect.push(false);
      });
      setSelact(arrayselect);
      setData(data);
    }
    getJSON();
    console.log("select", select);
  }, []);
  useEffect(() => {
    console.log("selected", selected);
  }, [selected]);
  useEffect(() => {
    console.log("history", history);
  }, [history]);
  useEffect(() => {
    console.log("arrayques", arrayques);
  }, [arrayques]);
  useEffect(() => {
    console.log("ques ====>", ques);
  }, [ques]);
  useEffect(() => {
    console.log("question ====>", question);
  }, [question]);
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
      return element.ques;
    });
    console.log("arrayques", array);
    setQuestion(array.toString());
  }
  const handleclick = (param, param1, param2, param3) => {
    var array = [];
    for (let i = 0; i < data1.length; i++) {
      if (i === param2) {
        array.push(true);
      } else {
        array.push(false);
      }
    }
    setSelact(array);
    setSelacted(param);
    setLayer_next(param1);
    setQues(param3);
  };
  function gotobacklayer(params, params1) {
    if (params === 0) {
      window.location = "/casepersoninfo";
    }
    if (params === 1 || data1.length === 4) {
      setShowButton(false);
      setShowother(false);
      setShowButton3(true);
    }
    console.log("pback", params);
    console.log("p1back", params1);

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
      data.forEach(() => {
        arrayselect.push(false);
      });
      setSelact(arrayselect);
      console.log(data);
      setData(data);
    }
    setArrayQues(arrayques.filter((a) => a.id !== stepper - 1));
    setHistory(history.filter((a) => a.id !== stepper));
    stepper--;

    setStep(stepper);
    console.log("step", stepper);
    postJSON(jsonData);
  }
  function gotolayer(params, params1) {
    if (params=== undefined && params1 === undefined){
      alert("โปรดเลือกหัวข้อ")
    }else{
    setArrayQues([...arrayques, { id: stepper, ques }]);
    stepper++;

    setStep(stepper);

    console.log("stepincontactinfo", stepper);
    console.log("pnext", params);
    console.log("p1next", params1);
    const jsonData = {
      id_header: params1,
    };
    if (params < 4) {
      setHistory([
        ...history,
        { id: stepper, layer: params, select: selected },
      ]);
    }
    async function postJSON(jsonData) {
      const response = await fetch("http://localhost:3333/getlayer" + params, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      const data = await response.json();
      data.forEach(() => {
        arrayselect.push(false);
      });
      setSelact(arrayselect);
      console.log(data);
      setData(data);
      if (params === 4||params===5) {
        setShowButton(true);
        setShowButton1(true);
        setShowButton2(true);
        setShowButton3(false);
        const arrayans = data.map(function (element) {
          return element.description;
        });
        console.log(arrayans);

        setAnswer(arrayans.toString());
      }
    }

    postJSON(jsonData);
    if (params===2&&params1===4) {
      setShowButton(true);
      setShowother(true);
      setShowButton3(false);
    }
    setSelacted(undefined);
    setLayer_next(undefined);}
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
          //window.location = "/casestatus";
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
    <Grid>
      <Box component="form" onSubmit={handleSubmit}>
        <Box
          
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <Typography
            sx={{
              marginBottom: 4,
            }}
          >
            {header[stepper - 1]}
          </Typography>
          {data1.map((row, index) => (
            <Stack
              align="center"
              direction="column"
              spacing={2}
              alignItems="stretch"
              margin={1}
              key={row.id}
            >
              <Chip
              size="large"
                label={row.description}
                key={row.id}
                id={row.id}
                color={select[index] ? "primary" : "default"}
                onClick={() =>
                  handleclick(row.id, row.layer_next, index, row.description)
                }
                sx={{
                  width: "600px",
                  height: "auto",

                  "& .MuiChip-labelMedium": {
                    display: "flex",
                    whiteSpace: "normal",
                  },
                }}
              />
            </Stack>
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
        </Box>
        <Divider />
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <IconButton
              onClick={() =>
                gotobacklayer(
                  history[stepper - 1].layer,
                  history[stepper - 1].select
                )
              }
            >
              <NavigateBeforeIcon />
              <Typography>ย้อนกลับ</Typography>
            </IconButton>
          </Box>
          <Box>
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
            {showButton3 && (
              <IconButton onClick={() => gotolayer(layer_next, selected)}>
                <NavigateNextIcon />
                <Typography>ถัดไป</Typography>
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Box>
    </Grid>
  );
}
