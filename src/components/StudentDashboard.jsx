import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { completeCourse } from "../store/courseSlice";

const StudentDashboard = () => {
  const { enrolled } = useSelector((state) => state.courses);
  const dispatch = useDispatch();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">My Courses</h1>
      <ul>
        {enrolled.map((course) => (
          <li key={course.id} className="mb-4 p-4 border rounded">
            <h2 className="text-xl">{course.coursename}</h2>
            <p>Instructor: {course.instructorname}</p>
            <button
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
              onClick={() => dispatch(completeCourse(course.id))}
            >
              Mark as Complete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;
