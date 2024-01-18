import "./App.css";
import Reset from "./pages/Reset";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Forgot from "./pages/Forgot";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import Navbar from "./components/Navbar/Navbar";
import NotFound from "./pages/404";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./contexts/userContext.jsx";
import Profile from "./pages/Profile";
import Player from "./components/Player/Player";
import Admin from "./pages/Admin";
import Footer from "./components/Footer.jsx";
import Contact from "./pages/Contact.jsx";
import Promote from "./pages/Promote";
import Cgu from "./pages/CGU.jsx";

function App() {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  if (loading) {
    return <h2>Loading ...</h2>;
  }

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/home" element={<Promote />} />
          <Route path="/" element={user ? <Home /> : <Navigate to="/home" />} />
          <Route
            path="/profile/:id"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin"
            element={user ? <Admin /> : <Navigate to="/login" />}
          />
          <Route
            path="/contact"
            element={user ? <Contact /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/verify"
            element={!user ? <VerifyEmail /> : <Navigate to="/" />}
          />
          <Route
            path="/reset-password"
            element={!user ? <Reset /> : <Navigate to="/" />}
          />
          <Route
            path="/forgot-password"
            element={!user ? <Forgot /> : <Navigate to="/" />}
          />
          <Route
            path="/cgu" element={<Cgu/>}  
          />
        </Routes>
        {user && <Player />}
      </main>
      <Footer />
    </>
  );
}

export default App;
