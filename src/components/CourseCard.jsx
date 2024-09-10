import React from "react";
import clsx from "clsx";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <Link to={`/courses/${course.courseid}}`}>
      <div className="w-full max-w-sm rounded-lg border-2 border-slate-200 bg-white p-4 shadow-xl transition-all hover:scale-105">
        <div className="relative">
          <img
            src={course.thumbnail}
            alt={course.courseid}
            className="h-[200px] w-full rounded-t-md object-cover"
            width="350"
            height="200"
            style={{ aspectRatio: "350/200", objectFit: "cover" }}
          />
          <div className="absolute right-2 top-2 rounded-full bg-white p-1 shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
          </div>
        </div>
        <div className="p-4">
          <span
            className={clsx("mb-2 inline-block rounded-md px-2 py-1", {
              ["bg-red-500/50 text-red-600"]:
                course.enrollmentstatus === "Closed",
              ["bg-green-500/50 text-green-800"]:
                course.enrollmentstatus === "Open",
              ["bg-yellow-500/50 text-yellow-800"]:
                course.enrollmentstatus === "In Progress",
            })}
          >
            {course.enrollmentstatus}
          </span>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
              <span>118</span>
            </div>
            <div className="flex items-center space-x-2 text-yellow-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.385a.563.563 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.499z"
                />
              </svg>
              <span>5.0</span>
            </div>
          </div>
          <h3 className="mb-2 text-lg font-semibold">{course.coursename}</h3>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
              <UserCircleIcon className="h-8 w-8 text-gray-500" />
            </div>
            <span className="text-purple-600">{course.instructorname}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
