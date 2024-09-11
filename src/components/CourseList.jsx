import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../store/courseSlice";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";

const CourseList = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.courses);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

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
        className="border px-4 py-2 rounded-xl shadow-lg transition-all focus:outline-none mb-4 w-full"
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="grid grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <li key={course.courseid} className="mb-2">
              <CourseCard key={course.courseid} course={course} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseList;
