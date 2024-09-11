import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import Loader from "./Loader";
import clsx from "clsx";
import { supabase } from "../supabaseClient";
import { Accordion, AccordionContent, AccordionTrigger, AccordionItem } from "./ui/accordion";
import { useDispatch, useSelector } from "react-redux";
import { enrollCourse } from "@/store/courseSlice";

const CourseDetails = () => {
  const { id } = useParams();
  const courseId = id.slice(0, -1);
  const [courseDetails, setCourseDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const preRequisites = courseDetails?.prerequisites;
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const fetchCourseDetails = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("courseid", courseId)
      .single();

    if (error) {
      console.error("Error fetching course details:", error);
    } else {
      setCourseDetails(data);
    }
    setLoading(false);
  };

  const enrollStudent = async () => {
    try {
      const { data: studentData, error: fetchError } = await supabase
        .from("students")
        .select("enrolledcourses")
        .eq("studentid", user.studentid)
        .single();

      if (fetchError) {
        console.error("Error fetching student data:", fetchError);
        return;
      }

      const enrolledCourses = studentData.enrolledcourses || [];

      if (enrolledCourses.includes(courseId)) {
        console.log("Student is already enrolled in this course.");
        return;
      }

      const { data, error } = await supabase
        .from("students")
        .update({ enrolledcourses: [...enrolledCourses, courseId] })
        .eq("studentid", user.studentid);

      if (error) {
        console.error("Error enrolling student:", error);
      } else {
        console.log("Student enrolled successfully:", data);
      }

      dispatch(enrollCourse(courseId));
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex max-h-[calc(100vh-5%)] flex-col overflow-hidden">
      <section className="mt-4 flex flex-col gap-4 rounded-3xl bg-gradient-to-r from-blue-600 to-slate-200 px-6 py-8">
        <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl xl:text-6xl">
          {courseDetails?.coursename}
        </h1>
        <p className="text-lg font-bold text-white sm:text-xl md:text-2xl">
          {courseDetails?.instructorname}
        </p>
        <p className="text-base text-slate-200 sm:text-lg md:text-xl">
          {courseDetails?.description}
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={enrollStudent}
            disabled={courseDetails.enrollmentstatus === "Closed"}
            className={clsx(
              "rounded-xl border-2 border-slate-500/40 px-4 py-2 text-xl font-medium text-white shadow-xl transition-all hover:scale-105",
              {
                ["bg-red-500 text-red-600 disabled:opacity-50"]: courseDetails.enrollmentstatus === "Closed",
                ["bg-green-500 text-green-800"]: courseDetails.enrollmentstatus === "Open",
                ["bg-yellow-500 text-yellow-800"]: courseDetails.enrollmentstatus === "In Progress",
              }
            )}
          >
            Enroll Now
          </button>

          <div className="flex items-center gap-2">
            <UserCircleIcon className="h-8 w-8 text-white" />
            <p className="text-base font-bold text-white sm:text-lg md:text-xl">12,345 Students enrolled</p>
          </div>
        </div>
      </section>

      <section className="mt-4 flex flex-col gap-4 rounded-3xl bg-gradient-to-r from-slate-200 to-slate-50 px-6 py-8 overflow-y-auto flex-1">
        <div className="sticky top-0 p-4 backdrop-blur-lg bg-gradient-to-b from-slate-200 to-transparent">
          <h1 className="text-xl font-bold text-zinc-900 sm:text-2xl md:text-3xl">
            Course Details
          </h1>
        </div>

        <p className="text-base md:text-lg">{courseDetails.description}</p>

        <div className="flex flex-col gap-2 md:flex-row md:gap-4 text-lg">
          <p className="font-bold">Duration:</p>
          <p>{courseDetails?.duration}</p>
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:gap-4 text-lg">
          <p className="font-bold">Schedule</p>
          <p>{courseDetails?.schedule}</p>
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:gap-4 text-lg">
          <p className="font-bold">Location:</p>
          <p>{courseDetails?.location}</p>
        </div>

        <div className="flex gap-2">
          <p className="text-lg font-bold">Prerequisites:</p>
          {preRequisites?.map((course, _i) => (
            <div
              key={_i}
              className="rounded-lg bg-green-500/80 px-3 py-1 font-bold text-white"
            >
              {course}
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-gradient-to-r from-blue-200 to-slate-200 px-4 py-8">
          <div className="w-fit rounded-2xl bg-white px-4 py-2 shadow-2xl transition-all hover:scale-105">
            <p className="text-2xl font-bold uppercase">Syllabus</p>
          </div>
          <Accordion type="multiple" className="w-full rounded-xl px-4" collapsible>
            {courseDetails?.syllabus?.map((item, i) => (
              <AccordionItem key={i} value={i + 1}>
                <AccordionTrigger className="text-lg font-bold text-zinc-900">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="ml-4 text-base font-semibold text-slate-700">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default CourseDetails;
