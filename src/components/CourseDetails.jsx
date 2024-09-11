import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import Loader from "./Loader";
import clsx from "clsx";
import { supabase } from "../supabaseClient";
import { Accordion, AccordionContent, AccordionTrigger } from "./ui/accordion";
import { AccordionItem } from "./ui/accordion";
import { useSelector } from "react-redux";

const CourseDetails = () => {
  const { id } = useParams();
  const courseId = id.slice(0, -1);
  const [courseDetails, setCourseDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const preRequisites = courseDetails?.prerequisites;
  const user = useSelector((state) => state.user.user);

  // Fetch course details
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
    const { data, error } = await supabase.from("enrollments").insert([
      {
        studentid: user.studentid,
        courseid: courseId,
        status: courseDetails.enrollmentstatus,
      },
    ]);

    if (error) {
      console.error("Error enrolling student:", error);
    } else {
      console.log("Student enrolled successfully");
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-[100vh] flex-col overflow-hidden">
      <section className="mt-4 flex flex-col gap-4 rounded-3xl bg-gradient-to-r from-blue-600 to-slate-200 px-6 py-8">
        <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none">
          {courseDetails?.coursename}
        </h1>
        <p className="max-w-[600px] font-bold text-white md:text-xl">
          {courseDetails?.instructorname}
        </p>
        <p className="max-w-[600px] text-slate-200 md:text-xl">
          {courseDetails?.description}
        </p>

        <div className="flex items-center justify-start gap-4">
          <button
            onClick={handleEnrollClick} // Handle enrollment directly here
            disabled={courseDetails.enrollmentstatus === "Closed"}
            className={clsx(
              "rounded-xl border-2 border-slate-500/40  px-4 py-2 text-2xl font-medium text-white shadow-xl transition-all hover:scale-110",
              {
                ["bg-red-500 text-red-600 disabled:opacity-50 hover:scale-100"]:
                  courseDetails.enrollmentstatus === "Closed",
                ["bg-green-500 text-green-800"]:
                  courseDetails.enrollmentstatus === "Open",
                ["bg-yellow-500 text-yellow-800"]:
                  courseDetails.enrollmentstatus === "In Progress",
              }
            )}
          >
            Enroll Now
          </button>

          <div className="flex items-center justify-start gap-2">
            <UserCircleIcon className="h-8 w-8 text-white" />
            <p className="font-bold text-white">12,345 Students enrolled</p>
          </div>
        </div>
      </section>
      {/* Rest of the component */}

      <section className="scrollbar-none mt-4 flex max-h-[calc(100vh-20rem)] flex-col gap-4 overflow-y-auto rounded-3xl bg-gradient-to-r from-slate-200 to-slate-50 px-6 py-8">
        <div className="sticky top-0 p-4 backdrop-blur-lg">
          <h1 className="text-lg font-bold text-zinc-900 sm:text-2xl xl:text-5xl/none">
            Course Details
          </h1>
        </div>

        <p className="text-lg">{courseDetails.description}</p>

        <div className="flex items-center justify-start gap-2 text-2xl">
          <p className="font-bold">Duration : </p>
          <p>{courseDetails?.duration}</p>
        </div>

        <div className="flex items-center justify-start gap-2 text-2xl">
          <p className="font-bold">Schedule : </p>
          <p>{courseDetails?.schedule}</p>
        </div>

        <div className="flex items-center justify-start gap-2 text-2xl">
          <p className="font-bold">Location : </p>
          <p>{courseDetails?.location}</p>
        </div>

        <div className="flex items-center justify-start gap-2">
          <p className="text-2xl font-bold">Prerequisites : </p>
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
            <p className="px-8 text-3xl font-bold uppercase">Syllabus</p>
          </div>
          <Accordion
            type="multiple"
            className="w-full rounded-xl px-4"
            collapsible
          >
            {courseDetails?.syllabus?.map((item, i) => (
              <AccordionItem key={i} value={i + 1}>
                <AccordionTrigger className="text-xl font-bold text-zinc-900">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="ml-10 text-lg font-semibold text-slate-700">
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
