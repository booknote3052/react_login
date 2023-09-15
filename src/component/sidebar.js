import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItems from "./listmenu";
const drawerWidth = 200;
export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 1,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar
        sx={{
          px: [2],
        }}
      ></Toolbar>
      <Toolbar
        sx={{
          px: [2],
        }}
      ></Toolbar>
      <Divider />
      <List component="nav">
        <ListItems />
      </List>
    </Drawer>
  );
}
