import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  AppBar as NavBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";

const linkStyle = { textDecoration: "none", color: "black" };

export default function AppBar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const adminName = useSelector((state) => state.admin.name);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const welcome = useMemo(() => {
    if (adminName)
      return (
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Welcome {adminName}!
        </Typography>
      );
  }, [adminName]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <Link to="/" style={linkStyle}>
                Main Page
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <a
                href="https://www.linkedin.com/in/ezequiel-yacar-5b5136192/"
                style={linkStyle}
                target="_blank"
                rel="noreferrer"
              >
                Linkedin
              </a>
            </MenuItem>
          </Menu>
          {welcome}
        </Toolbar>
      </NavBar>
    </Box>
  );
}
