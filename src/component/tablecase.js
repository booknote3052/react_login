import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";





export default function Tablecase() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [data2, setData2] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const columns = [
    { id: 'id', label: '#', align: 'center' },
    { id: 'date', label: 'วันที่ร้องเรียน',align: 'center' },
    {
      id: 'IDnumber',
      label: 'หมายเลขบัตรปชช',
      
      align: 'center',
      
    },
    {
      id: 'question',
      label: 'คำถาม',
      
      align: 'center',
      
    },
    {
      id: 'answer',
      label: 'คำตอบ',
      
      align: 'center',
      
    },
    {
      id: 'status',
      label: 'สถานะ',
      
      align: 'center',
      
    },
  ];

  useEffect(() => {
    const id = localStorage.getItem("id");

    async function getJSON1() {
      const response = await fetch("http://localhost:3333/getinfocase/" + id, {
        method: "GET", // or 'PUT'
      });

      const case_status = await response.json();

      //console.log(data3);
      setData2(case_status);
    }

    getJSON1();
  }, []);
  // console.log(data1);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Chip label="เปิดเคส" onClick={()=>{window.location='/casepersoninfo'}}/>
    <TableContainer sx={{ maxHeight: 550 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data2
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[10, 15, 20,25]}
      component="div"
      count={data2.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      
    />
  </Paper>
     
  );
}
