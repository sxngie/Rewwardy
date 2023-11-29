import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";

const AdminHamburgerMenu = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const auth = getAuth();
  const router = useRouter();

  return (
    <div>
      <AppBar sx={{ bgcolor: "#463489", mb: 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Rewwardy (Admin)
          </Typography>
          {/* <div style={{ flexGrow: 1 }} /> */}
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
          <ListItem onClick={toggleDrawer(false)}>
            <Link href="/admin/dashboard">
              <ListItemText primary="Home" sx={{ color: "#9B2C6B" }} />
            </Link>
          </ListItem>
          <ListItem onClick={toggleDrawer(false)}>
            <Link href="/admin/rewards">
              <ListItemText
                primary="View All Rewards"
                sx={{ color: "#9B2C6B" }}
              />
            </Link>
          </ListItem>
          <ListItem onClick={toggleDrawer(false)}>
            <Link href="/admin/rewards/create">
              <ListItemText primary="Create Reward" sx={{ color: "#9B2C6B" }} />
            </Link>
          </ListItem>
          <ListItem onClick={toggleDrawer(false)}>
            <Link href="/admin/search">
              <ListItemText primary="Search Reward" sx={{ color: "#9B2C6B" }} />
            </Link>
          </ListItem>
          <ListItem onClick={toggleDrawer(false)}>
            <ListItemText
              primary="Logout"
              sx={{ color: "#9B2C6B" }}
              onClick={() => {
                signOut(auth)
                  .then(() => router.push("/admin"))
                  .catch((err) => alert(err.message));
              }}
            />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default AdminHamburgerMenu;
