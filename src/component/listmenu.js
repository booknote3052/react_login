import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import AssignmentIcon from '@mui/icons-material/Assignment';

function goto(){
  window.location='/casestatus';
}

export default function ListItems(){ 
    return(
  <React.Fragment>
    <ListSubheader component="div" >
      เรื่องร้องเรียน
    </ListSubheader>
    <ListItemButton onClick={()=>{goto()}}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon >
      <ListItemText primary="ติดต่อสอบถาม" />
    </ListItemButton>
    
  </React.Fragment>
);}