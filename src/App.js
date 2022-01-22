import Header from "./Components/UI/Header";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Components/UI/Theme";
//import { Typography } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        Hello!
      </div>
    </ThemeProvider>
  );
}

export default App;
