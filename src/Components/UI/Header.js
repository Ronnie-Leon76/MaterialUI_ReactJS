import React from "react";
import AppBar from "@mui/material/AppBar";
import ToolBar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
//import { makeStyles, createStyles } from "@mui/styles";
//import { makeStyles } from "@mui/material/styles";





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
/** <div className={classes.toolbarMargin} />
 * const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolBar,
  },
}));
const classes = useStyles();
 */


const Header = (props) => {
  
  return (
    <ElevationScroll>
      <AppBar position="fixed">
        <ToolBar>
          <Typography variant="h3">Avatar Tech</Typography>
        </ToolBar>
      </AppBar>
    </ElevationScroll>
  );
};
export default Header;
