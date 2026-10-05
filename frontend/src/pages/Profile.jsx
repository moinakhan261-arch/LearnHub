
import { useEffect, useState } from "react"
import axios from "axios"

function Profile() {
  const [user, setUser] = useState(null)
  const [enrolledCount, setEnrolledCount] = useState(0)
  const [overallProgress, setOverallProgress] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedUser = localStorage.getItem("user")

        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }

        const token = localStorage.getItem("token")

        if (!token) {
          setLoading(false)
          return
        }

        const response = await axios.get(
          "http://localhost:5000/api/enrollments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const enrollments = response.data.enrollments || []

        setEnrolledCount(enrollments.length)

        // Calculate overall progress
        let totalCompleted = 0
        let totalLessons = 0

        enrollments.forEach((enrollment) => {
          const courseId = enrollment.courseId

          const storedProgress = localStorage.getItem(
            `progress_${courseId}`
          )

          const completedLessons = storedProgress
            ? JSON.parse(storedProgress)
            : []

          // Your Learning.jsx currently has 6 lessons per course
          const lessonCount = 6

          totalCompleted += completedLessons.length
          totalLessons += lessonCount
        })

        const progress =
          totalLessons > 0
            ? Math.round((totalCompleted / totalLessons) * 100)
            : 0

        setOverallProgress(progress)
      } catch (error) {
        console.error("Profile error:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>

          <p className="mt-4 text-sm text-gray-500">
            Loading profile...
          </p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
            <span className="text-2xl">👤</span>
          </div>

          <h2 className="mt-5 text-2xl font-bold text-gray-900">
            Login Required
          </h2>

          <p className="mt-2 text-gray-500">
            Please log in to view your profile.
          </p>
        </div>
      </div>
    )
  }

  const initial = user.name?.charAt(0).toUpperCase() || "U"

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">

      <div className="mx-auto max-w-5xl">

        {/* Profile Header */}
        <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-lg sm:p-10">

          <div className="flex flex-col items-center text-center sm:flex-row sm:text-left">

            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-white text-3xl font-extrabold text-blue-600 shadow-lg">
              {initial}
            </div>

            <div className="mt-5 sm:ml-6 sm:mt-0">

              <p className="text-sm font-medium text-blue-100">
                LearnHub Student
              </p>

              <h1 className="mt-1 text-3xl font-extrabold">
                {user.name}
              </h1>

              <p className="mt-2 text-blue-100">
                {user.email}
              </p>

            </div>

          </div>

        </section>

        {/* Stats */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2">

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Enrolled Courses
                </p>

                <p className="mt-2 text-3xl font-extrabold text-blue-600">
                  {enrolledCount}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl">
                📚
              </div>

            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Overall Progress
                </p>

                <p className="mt-2 text-3xl font-extrabold text-green-600">
                  {overallProgress}%
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-xl">
                📈
              </div>

            </div>

          </div>

        </section>

        {/* Account Information */}
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8">

          <div className="border-b border-gray-100 pb-5">

            <h2 className="text-xl font-bold text-gray-900">
              Account Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your basic LearnHub account details.
            </p>

          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">

            <div className="rounded-xl bg-gray-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Full Name
              </p>

              <p className="mt-2 font-semibold text-gray-800">
                {user.name}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Email Address
              </p>

              <p className="mt-2 break-all font-semibold text-gray-800">
                {user.email}
              </p>
            </div>

          </div>

        </section>

        {/* Progress */}
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Learning Progress
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your overall progress across enrolled courses.
              </p>
            </div>

            <span className="font-bold text-blue-600">
              {overallProgress}%
            </span>

          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-200">

            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            ></div>

          </div>

          <p className="mt-3 text-sm text-gray-500">
            Keep learning consistently to complete your courses.
          </p>

        </section>

      </div>

    </div>
  )
}

export default Profile

