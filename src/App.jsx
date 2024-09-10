import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import CourseList from "./components/CourseList";
import CourseDetails from "./components/CourseDetails";
import StudentDashboard from "./components/StudentDashboard";
import NavBar2 from "./components/NavBar";
import Signin from "./pages/SignIn";
import Signup from "./pages/SignUp";
import { useSelector } from "react-redux";

function App() {
  // const user = useSelector((state) => state.user);

  // useEffect(() => {
  //   if (!user.user) redirect("/signin");
  // }, []);
  return (
    <div className="bg-gradient-to-br from-blue-200 to-blue-400">
      <BrowserRouter>
        <Routes>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/" element={<NavBar2 />}>
            <Route index element={<CourseList />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
