import React from "react";
import AppBar from "@mui/material/AppBar";
import ToolBar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
//import { makeStyles, createStyles } from "@mui/styles";
//import { makeStyles } from "@mui/material/styles";
//import Logo from "../../assets/logo.svg";
import useClasses from "../../hooks/use-classes";

import useScrollTrigger from "@mui/material/useScrollTrigger";

function ElevationScroll(props) {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}
/** 
 * const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolBar,
  },
}));
const classes = useStyles();
 */
const styles = (theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
});

const Header = (props) => {
  const classes = useClasses(styles);
  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed">
          <ToolBar>
            <Typography variant="h3">Avatar Tech</Typography>
          </ToolBar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
};
export default Header;
