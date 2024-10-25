import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { Router } from "./router";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#98b4c7",
      dark: "#002884",
      contrastText: "#fff",
    },
  },
});

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
