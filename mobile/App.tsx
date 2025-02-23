import React from "react";
import { AuthProvider } from "./constants/AuthContext";
import Routes from "./routes";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
