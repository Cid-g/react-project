import AppRoutes from "./routes/AppRoutes.js";
import { UserProvider } from "./context/UserContext.js";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const theme = createTheme();
  return (
    <UserProvider>
        <ThemeProvider theme={theme}>
      <AppRoutes />
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
