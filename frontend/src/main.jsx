import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PlayerContextProvider } from "./contexts/playerContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./contexts/userContext.jsx";
import { AppContextProvider } from "./contexts/appContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <PlayerContextProvider>
      <AppContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppContextProvider>
    </PlayerContextProvider>
  </UserContextProvider>
);
