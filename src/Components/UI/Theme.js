import { createTheme } from "@mui/material/styles";
import { typography } from "@mui/system";

const arcBlue = "#0B72B1";
const arcOrange = "#FFBA60";

const theme = createTheme({
  palette: {
    common: {
      blue: `${arcBlue}`,
      Orange: `${arcOrange}`,
    },
    primary: {
      main: `${arcBlue}`,
    },
    secondary: {
      main: `${arcOrange}`,
    },
  },
  typography: {
    h3: {
      fontweight: 300,
    },
  },
  mixins:{
      
  }
});
export default theme;
