import { useEffect,useState } from "react"

import { useNavigate } from "react-router-dom"
import courses from "../data/courses"
import axios from "axios"

function MyLearning() {
    const navigate = useNavigate()
    const [enrolledCourseIds, setEnrolledCourseIds] = useState([])

useEffect(() => {
  const fetchEnrollments = async () => {
    try {
      const token = localStorage.getItem("token")

      const response = await axios.get(
        "http://localhost:5000/api/enrollments",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setEnrolledCourseIds(
        response.data.enrollments.map((enrollment) => enrollment.courseId)
      )
    } catch (error) {
      console.error(error)
    }
  }

  fetchEnrollments()
}, [])

const enrolledCourses = courses.filter((course) =>
  enrolledCourseIds.includes(course.id)
)
    console.log(enrolledCourses)
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-6xl mx-auto">
    
        <h1 className="text-3xl font-bold text-gray-800">
          My Learning
        </h1>

        <p className="mt-2 text-gray-600">
          Continue learning from your enrolled courses.
        </p>

        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800">
            My Courses
          </h2>
<div className="mt-6 grid gap-6 md:grid-cols-2">
  {enrolledCourses.map((course) => (
    <div
      key={course.id}
      className="bg-gray-50 rounded-xl p-5 border"
    >
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-48 object-cover rounded-lg"
      />

      <h3 className="text-xl font-semibold text-gray-800 mt-4">
        {course.title}
      </h3>

      <p className="mt-2 text-gray-600">
        {course.description}
      </p>

      <p className="mt-3 text-sm text-gray-500">
        Instructor: {course.instructor}
      </p>

      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Progress</span>
          <span>0%</span>
        </div>

        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: "0%" }}
          ></div>
        </div>
      </div>

      <button
        onClick={() => navigate(`/courses/${course.id}/learn`)}
        className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
      >
        Continue Learning
      </button>
    </div>
  ))}
</div>
          
  
        </div>
      </div>
    </div>
  )
}

export default MyLearning