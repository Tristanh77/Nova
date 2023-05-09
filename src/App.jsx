import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useState } from 'react'

import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import HomePage from "./components/HomePage/HomePage";
import userService from "./utils/userService";
import FeedPage from "./pages/FeedPage/FeedPage";
import AddPostForm from "./components/AddPostForm/AddPostForm";

function App() {
  const [user, setUser] = useState(userService.getUser())

  function handleSignUpOrLogin(){
    setUser(userService.getUser())
  }
  return (
    <Routes>
      <Route path="/" element={<FeedPage />} />
      <Route
        path="/login"
        element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
          path="/signup"
          element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
        path="/add"
        element={<AddPostForm/>}
        />
    </Routes>
  );
}

export default App;
