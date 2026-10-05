
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import courses from "../data/courses"

function Dashboard() {
  const [user, setUser] = useState(null)
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const myCourses = courses.filter((course) =>
    enrolledCourses.some(
      (enrollment) => enrollment.courseId === course.id
    )
  )

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token")

        if (!token) {
          navigate("/login")
          return
        }

        const [profileResponse, enrollmentResponse] =
          await Promise.all([
            fetch("http://localhost:5000/api/auth/profile", {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }),

            axios.get(
              "http://localhost:5000/api/enrollments",
              {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            )
          ])

        const profileData = await profileResponse.json()

        if (!profileResponse.ok) {
          localStorage.removeItem("token")
          localStorage.removeItem("user")
          navigate("/login")
          return
        }

        setUser(profileData.user)
        setEnrolledCourses(
          enrollmentResponse.data.enrollments
        )
      } catch (error) {
        console.error("Dashboard error:", error)

        localStorage.removeItem("token")
        localStorage.removeItem("user")

        navigate("/login")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    navigate("/login")
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600"></div>

          <p className="mt-4 font-medium text-gray-600">
            Loading your dashboard...
          </p>

        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* Welcome Header */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-white shadow-lg sm:p-10">

          <div className="relative z-10">

            <p className="text-sm font-semibold uppercase tracking-widest text-blue-100">
              LearnHub Dashboard
            </p>

            <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Welcome back, {user.name}! 👋
            </h1>

            <p className="mt-3 max-w-2xl text-blue-50">
              Continue learning, track your progress, and keep
              building your skills.
            </p>

            <div className="mt-7 flex flex-wrap gap-4">

              <div className="rounded-xl bg-white/10 px-5 py-3 backdrop-blur">
                <p className="text-xs text-blue-100">
                  Enrolled Courses
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {enrolledCourses.length}
                </p>
              </div>

              <div className="rounded-xl bg-white/10 px-5 py-3 backdrop-blur">
                <p className="text-xs text-blue-100">
                  Learning Goal
                </p>

                <p className="mt-1 font-bold">
                  Learn, Practice, Grow
                </p>
              </div>

            </div>

          </div>

          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-20 right-24 h-56 w-56 rounded-full bg-white/5"></div>

        </section>

        {/* Your Learning */}
        <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Your Courses
              </p>

              <h2 className="mt-1 text-2xl font-bold text-gray-900">
                Your Learning
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Continue where you left off.
              </p>
            </div>

            <span className="w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              {enrolledCourses.length}{" "}
              {enrolledCourses.length === 1
                ? "Course"
                : "Courses"}
            </span>

          </div>

          {myCourses.length > 0 ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2">

              {myCourses.map((course) => {

                const savedProgress =
                  localStorage.getItem(
                    `progress_${course.id}`
                  )

                let progress = 0

                if (savedProgress) {
                  const completedLessons =
                    JSON.parse(savedProgress)

                  if (course.lessonList?.length > 0) {
                    progress = Math.round(
                      (completedLessons.length /
                        course.lessonList.length) *
                        100
                    )
                  }
                }

                return (
                  <div
                    key={course.id}
                    className="group rounded-2xl border border-gray-100 bg-slate-50 p-5 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div>
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                          {course.category}
                        </span>

                        <h3 className="mt-3 text-lg font-bold text-gray-900">
                          {course.title}
                        </h3>
                      </div>

                      <span className="text-sm font-semibold text-gray-500">
                        ⭐ {course.rating}
                      </span>

                    </div>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
                      {course.description}
                    </p>

                    {/* Progress */}
                    <div className="mt-5">

                      <div className="mb-2 flex justify-between text-sm">

                        <span className="font-medium text-gray-600">
                          Progress
                        </span>

                        <span className="font-bold text-blue-600">
                          {progress}%
                        </span>

                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-gray-200">

                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
                          style={{
                            width: `${progress}%`
                          }}
                        ></div>

                      </div>

                    </div>

                    <button
                      onClick={() =>
                        navigate(
                          `/courses/${course.id}/learn`
                        )
                      }
                      className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Continue Learning →
                    </button>

                  </div>
                )
              })}

            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-gray-200 p-8 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">
                📚
              </div>

              <h3 className="mt-4 font-bold text-gray-900">
                No courses enrolled yet
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Explore our courses and start your learning
                journey.
              </p>

              <button
                onClick={() => navigate("/courses")}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Explore Courses
              </button>

            </div>
          )}

        </section>

        {/* Quick Actions */}
        <section className="mt-8">

          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
              Quick Access
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              Manage Your Learning
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">

            {/* My Learning */}
            <button
              onClick={() => navigate("/my-learning")}
              className="group rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl">
                📚
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                My Learning
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                View your enrolled courses and learning
                progress.
              </p>

              <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                View Courses →
              </span>
            </button>

            {/* Profile */}
            <button
              onClick={() => navigate("/profile")}
              className="group rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                👤
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Profile
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                View your account and profile information.
              </p>

              <span className="mt-4 inline-block text-sm font-semibold text-indigo-600">
                View Profile →
              </span>
            </button>

            {/* Settings */}
            <button
              onClick={() => navigate("/settings")}
              className="group rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-xl">
                ⚙️
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Settings
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Manage your account preferences and settings.
              </p>

              <span className="mt-4 inline-block text-sm font-semibold text-violet-600">
                Open Settings →
              </span>
            </button>

          </div>

        </section>

        {/* Logout */}
        <div className="mt-8 flex justify-end">

          <button
            onClick={handleLogout}
            className="rounded-xl border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  )
}

export default Dashboard

