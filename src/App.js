import AppRoutes from "./routes/AppRoutes.js";
import { UserProvider } from "./context/UserContext.js";
function App() {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
}

export default App;
