import React from "react";
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

function App() {
  return (
    <div className="bg-gradient-to-br from-blue-200 to-blue-400">
      <BrowserRouter>
        <Routes>
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
