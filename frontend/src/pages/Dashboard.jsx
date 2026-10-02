import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import courses from "../data/courses"


function Dashboard() {
  const [user, setUser] = useState(null)
 const [enrolledCourses, setEnrolledCourses] = useState([])
const myCourses = courses.filter((course) =>
  enrolledCourses.some(
    (enrollment) => enrollment.courseId === course.id
  )
)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token")
  if (!token) {
  navigate("/login")
  return
}
      const response = await fetch(
      
        "http://localhost:5000/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = await response.json()

      if (response.ok) {
  setUser(data.user)
} else {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  navigate("/login")
}
    
    }

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

    setEnrolledCourses(response.data.enrollments)
  } catch (error) {
    console.error(error)
  }
}
    fetchProfile()
    fetchEnrollments()
  }, [])

  if (!user) {
    return <p>Loading...</p>
  }
  const handleLogout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")

  window.location.href = "/login"
}

return (
  <div className="min-h-screen bg-gray-100 p-8">

    <div className="mx-auto max-w-6xl">
    <div>
  <h1 className="text-3xl font-bold text-gray-800">
    Welcome back, {user.name}! 👋
  </h1>

  <p className="mt-2 text-gray-600">
    Continue learning and track your progress.
  </p>
</div>
      
<div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
  <div className="flex items-center justify-between">
    <h2 className="text-xl font-semibold text-gray-800">
      Your Learning
    </h2>

    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600">
      {enrolledCourses.length} Courses
    </span>
  </div>

  <div className="mt-6 grid gap-4 md:grid-cols-2">
    {myCourses.map((course) => (
      <div
        key={course.id}
        className="rounded-xl border border-gray-200 p-5 transition hover:shadow-md"
      >
        <h3 className="font-semibold text-gray-800">
          {course.title}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {course.category}
        </p>

        <button
          onClick={() => navigate(`/courses/${course.id}/learn`)}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Continue Learning
        </button>
      </div>
    ))}
  </div>

  {myCourses.length === 0 && (
    <p className="mt-6 text-gray-500">
      You haven't enrolled in any courses yet.
    </p>
  )}
</div>

  <div className="mt-6 space-y-3">
    {myCourses.map((course) => (
      <div
        key={course.id}
        className="rounded-lg bg-gray-50 p-4"
      >
        <h3 className="font-semibold text-gray-800">
          {course.title}
        </h3>

        <p className="mt-1 text-sm text-gray-600">
          {course.category}
        </p>
      </div>
    ))}
  </div>
</div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">

        <div
          onClick={() => navigate("/my-learning")}
          className="cursor-pointer rounded-xl bg-white p-6 shadow-sm hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-800">
            My Learning
          </h2>

          <p className="mt-2 text-gray-600">
            View your enrolled courses and learning progress.
          </p>
        </div>

        <div
          onClick={() => navigate("/profile")}
          className="cursor-pointer rounded-xl bg-white p-6 shadow-sm hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-800">
            Profile
          </h2>

          <p className="mt-2 text-gray-600">
            View and manage your profile information.
          </p>
        </div>

        <div
          onClick={() => navigate("/settings")}
          className="cursor-pointer rounded-xl bg-white p-6 shadow-sm hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-800">
            Settings
          </h2>

          <p className="mt-2 text-gray-600">
            Manage your account settings.
          </p>
        </div>

      </div>

      <button
        onClick={handleLogout}
        className="mt-8 rounded-lg bg-red-500 px-5 py-2 text-white hover:bg-red-600"
      >
        Logout
      </button>

    </div>

)
}

export default Dashboard
    