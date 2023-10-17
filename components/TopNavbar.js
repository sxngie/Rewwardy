import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/icons-material/Menu';
import { MenuItem } from '@mui/material/MenuItem';
import { useState } from 'react';


export default function ButtonAppBar() {
  const [show, setShow] = useState(false)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{
        bgcolor: '#fff',
        color: '#552CB4'
      }}>
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          {/*  */}
          <Menu
            open={show}
            onClose={() => setShow(false)}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem>Create Reward</MenuItem>
            <MenuItem>Manage Rewards</MenuItem>
            <MenuItem>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}