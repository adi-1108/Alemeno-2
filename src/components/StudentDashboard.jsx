import { useState } from 'react'
import { Bell, BookOpen, GraduationCap, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useSelector } from 'react-redux'

// Mock data for enrolled courses
const enrolledCourses = [
  { id: 1, name: "Introduction to React", instructor: "Jane Doe", progress: 60, totalLessons: 20, completedLessons: 12 },
  { id: 2, name: "Advanced JavaScript", instructor: "John Smith", progress: 30, totalLessons: 15, completedLessons: 5 },
  { id: 3, name: "UI/UX Design Principles", instructor: "Alice Johnson", progress: 80, totalLessons: 12, completedLessons: 10 },
  { id: 4, name: "Data Structures and Algorithms", instructor: "Bob Brown", progress: 45, totalLessons: 25, completedLessons: 11 },
]

export default function StudentDashboard() {

  const allCourses = useSelector((state) => state.courses.list);
  const enrolled_Courses = useSelector((state) => state.courses.enrolled);
  const enrolledCourses = allCourses.filter((course) => enrolled_Courses.includes(course.courseid));
  console.log(enrolledCourses);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <GraduationCap className="mr-2" />
            Student Dashboard
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-xl font-semibold mb-4">Enrolled Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <CardTitle>{course.coursename}</CardTitle>
                <CardDescription>Instructor: {course.instructorname}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Progress</span>
                  <span className="text-sm font-medium">{parseInt(course.completed_lesson / course.total_lesson * 100, 10)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${parseInt(course.completed_lesson / course.total_lesson * 100, 10)}%` }}
                  ></div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  {course.completed_lesson} / {course.total_lesson} lessons
                </span>
                <Button variant="outline">Continue</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}