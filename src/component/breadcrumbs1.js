import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';

import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Chip from '@mui/material/Chip';

function handleClick(event) {
 
  window.location="/casestatus";
}

export default function CustomBreadcrumbs1() {
  const breadcrumbs = [
    <Chip label="หน้าหลัก" onClick={()=>{handleClick();}}/>,
    <Chip label="เรื่องร้องเรียน" onClick={()=>{handleClick();}}/>,
    <Typography key="3" color="text.primary">
      ติดต่อสอบถาม
    </Typography>,
  ];

  return (
    <Stack spacing={2}>
      
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}