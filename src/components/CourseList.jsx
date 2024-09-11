import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses, fetchEnrolledCourses } from "../store/courseSlice";
import CourseCard from "./CourseCard";

const CourseList = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.courses);
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchEnrolledCourses(user.studentid));
  }, [dispatch, user.studentid]);

  const filteredCourses = list.filter(
    (course) =>
      course.coursename.toLowerCase().includes(search.toLowerCase()) ||
      course.instructorname.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 flex flex-col gap-4 items-center">
      <input
        type="text"
        placeholder="Search by course name or instructor"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-4 py-2 rounded-xl shadow-lg transition-all focus:outline-none mb-4 w-full max-w-md"
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="grid gap-8 w-full max-w-6xl mx-auto px-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <li key={course.courseid} className="mb-2">
              <CourseCard course={course} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseList;
