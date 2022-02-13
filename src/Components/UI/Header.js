import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import ToolBar from "@mui/material/Toolbar";

import logo from "../../assets/logo.svg";
import { makeStyles } from "@mui/styles";
import { Tabs, Tab } from "@mui/material";
import { Button } from "@mui/material";
import { Link, Route } from "react-router-dom";
import { Menu, MenuItem } from "@mui/material";

import useScrollTrigger from "@mui/material/useScrollTrigger";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import { SwipeableDrawer } from "@mui/material";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { List, ListItem, ListItemText } from "@mui/material";

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em",
    },
  },
  logo: {
    height: "8rem",
    [theme.breakpoints.down("md")]: {
      height: "7em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    fontFamily: "Raleway",
    textTransform: "none",
    fontWeight: 700,
    fontSize: "1rem",
    minWidth: 10,
    marginLeft: "25px",
  },
  button: {
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    fontFamily: "Pacifico",
    textTransform: "none",
    height: "45px",
    color: "white",
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: "white",
    borderRadius: "0px",
  },
  menuItem: {
    fontFamily: "Raleway",
    textTransform: "none",
    fontWeight: 700,
    "&:hover": {
      opacity: 1,
    },
    opacity: 0.7,
  },
  drawerIconsContainer: {
    "&:hover": {
      backgroundColor: "transparent",
    },
    marginLeft: "auto",
  },
  drawerIcon: {
    height: "50px",
    width: "50px",
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
  },
  drawerItem: {
    fontFamily: "Raleway",
    textTransform: "none",
    fontWeight: 700,
    color: "white",
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange,
  },
  drawerItemSelected: {
    opacity: 1,
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const menuOptions = [
    { name: "Services", link: "/services", selectedIndex: 0 },
    {
      name: "Custom Software Development",
      link: "/customsoftware",
      selectedIndex: 1,
    },
    { name: "Mobile App Development", link: "/mobileapps", selectedIndex: 2 },
    { name: "Website Development", link: "/websites", selectedIndex: 3 },
  ];

  const routes = [
    {
      name: "Home",
      links: "/",
      activeIndex: 0,
      ariaOwns: anchorEl ? "simple-menu" : undefined,
      ariaPopup: anchorEl ? "true" : undefined,
      mouseOver: (event) => handleClick(event),
    },
    { name: "Services", links: "/services", activeIndex: 1 },
    { name: "Revolution", links: "/revolution", activeIndex: 2 },
    { name: "About", links: "/about", activeIndex: 3 },
    { name: "Contact", links: "/contact", activeIndex: 4 },
  ];

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpen(false);
    setSelectedIndex(i);
  };
  const menuOptions_routes = [...menuOptions, ...routes];

  useEffect(() => {
    menuOptions_routes.forEach((route) => {
      switch (window.location.pathname) {
        case `${route.links}`:
          if (value !== route.activeIndex) {
            setValue(route.activeIndex);
            if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
              setSelectedIndex(route.selectedIndex);
            }
          }
          break;
        default:
          break;
      }
    });
  }, [value, menuOptions_routes, routes]);

  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const tabs = (
    <React.Fragment>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor="primary"
        textColor="black"
      >
        {routes.map((route, index) => (
          <Tab
            key={`${route}${index}`}
            className={classes.tab}
            component={Link}
            to={route.links}
            label={route.name}
            aria-owns={route.ariaOwns}
            aria-haspopup={route.ariaPopup}
            onMouseOver={route.mouseOver}
          />
        ))}
      </Tabs>
      <Button variant="contained" color="secondary" className={classes.button}>
        Free Estimate
      </Button>
    </React.Fragment>
  );
  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        className={classes.drawer}
      >
        <List disablePadding>
          {routes.map((route) => (
            <ListItem
              key={`${route}${route.activeIndex}`}
              component={Link}
              to={route.links}
              divider
              button
              onClick={() => {
                setOpenDrawer(false);
                setValue(route.activeIndex);
              }}
            >
              <ListItemText
                disableTypography
                className={
                  value === route.activeIndex
                    ? [classes.drawerItem, classes.drawerItemSelected]
                    : classes.drawerItem
                }
              >
                {route.name}
              </ListItemText>
            </ListItem>
          ))}
          <ListItem
            component={Link}
            to="/estimate"
            divider
            button
            onClick={() => {
              setOpenDrawer(false);
              setValue(5);
            }}
            className={classes.drawerItemEstimate}
          >
            <ListItemText
              className={
                value === 5
                  ? [classes.drawerItem, classes.drawerItemSelected]
                  : classes.drawerItem
              }
              disableTypography
            >
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
        className={classes.drawerIconsContainer}
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed">
          <ToolBar disableGutters>
            <Button
              className={classes.logoContainer}
              component={Link}
              to="/"
              disableRipple
              onClick={() => setValue(0)}
            >
              <img alt="" src={logo} className={classes.logo} />
            </Button>
            {matches ? drawer : tabs}
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{ onMouseLeave: handleClose }}
              elevation={0}
              classes={{ paper: classes.menu }}
            >
              {menuOptions.map((options, i) => (
                <MenuItem
                  key={options}
                  component={Link}
                  to={options.link}
                  className={{ root: classes.menuItem }}
                  onClick={(event) => {
                    handleMenuItemClick(event, i);
                    setValue(1);
                    handleClose();
                  }}
                  selected={
                    i === selectedIndex && value === 1 ? "true" : "false"
                  }
                >
                  {options.name}
                </MenuItem>
              ))}
            </Menu>
          </ToolBar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
};
export default Header;
