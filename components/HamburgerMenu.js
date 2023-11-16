import styles from "../styles/components/HamburgerMenu.module.scss";
import { slide as Menu } from 'react-burger-menu'
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

const HamburgerMenu = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setDrawerOpen(open);
    };

    return (
      <div>
        <AppBar  sx={{ bgcolor: '#9B2C6B', mb: 1}}>
          <Toolbar>
          <div style={{ flexGrow: 1 }} />
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
          <List>
            <ListItem button onClick={toggleDrawer(false)}>
              <Link href="/dashboard">
                <ListItemText primary="Home" sx={{ color: '#9B2C6B' }}/>
              </Link>
            </ListItem>
            <ListItem button onClick={toggleDrawer(false)}>
              <Link href="/reward">
                <ListItemText primary="Rewards" sx={{ color: '#9B2C6B' }}/>
              </Link>
            </ListItem>
            <ListItem button onClick={toggleDrawer(false)}>
              <Link href="/challenge">
                <ListItemText primary="Challenges" sx={{ color: '#9B2C6B' }}/>
              </Link>
            </ListItem>
            <ListItem button onClick={toggleDrawer(false)}>
              <Link href="/scanner">
                <ListItemText primary="QR Scanner" sx={{ color: '#9B2C6B' }}/>
              </Link>
            </ListItem>
            <ListItem button onClick={toggleDrawer(false)}>
              <Link href="/">
                <ListItemText primary="Sign out" sx={{ color: '#9B2C6B' }}/>
              </Link>
            </ListItem>
          </List>
        </Drawer>
      </div>
    );
  };

  export default HamburgerMenu;
