import { Container } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import UserProvider from "./context/UserContext";
import UserRedirect from "./HOC/UserRedirect";

function App() {
  return (
    <Container maxW={"container.md"} minH={"100vh"}>
      <UserProvider>
        <Routes>
          <Route
            path="/"
            element={
              <UserRedirect>
                <Auth />
              </UserRedirect>
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </UserProvider>
    </Container>
  );
}

export default App;
