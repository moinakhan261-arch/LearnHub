
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import courses from "../data/courses"
import axios from "axios"

function MyLearning() {
  const navigate = useNavigate()
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([])
  const [loading, setLoading] = useState(true)

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
          response.data.enrollments.map(
            (enrollment) => enrollment.courseId
          )
        )
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchEnrollments()
  }, [])

  const enrolledCourses = courses.filter((course) =>
    enrolledCourseIds.includes(course.id)
  )

  const getProgress = (courseId, lessonCount) => {
    const savedProgress = localStorage.getItem(
      `progress_${courseId}`
    )

    if (!savedProgress || lessonCount === 0) {
      return 0
    }

    const completedLessons = JSON.parse(savedProgress)

    return Math.round(
      (completedLessons.length / lessonCount) * 100
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-white shadow-lg sm:p-10">

          <p className="text-sm font-semibold uppercase tracking-widest text-blue-100">
            LearnHub
          </p>

          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            My Learning
          </h1>

          <p className="mt-3 max-w-2xl text-blue-50">
            Continue learning from your enrolled courses and
            track your progress as you grow.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">

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
                Learning Status
              </p>

              <p className="mt-1 font-bold">
                Keep Learning
              </p>
            </div>

          </div>

        </div>

        {/* Courses Section */}
        <div className="mt-8">

          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Your Courses
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              Continue Learning
            </h2>
          </div>

          {/* Loading */}
          {loading && (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600"></div>

              <p className="mt-4 text-sm font-medium text-gray-500">
                Loading your courses...
              </p>
            </div>
          )}

          {/* Empty State */}
          {!loading && enrolledCourses.length === 0 && (
            <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-2xl">
                📚
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                No courses yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-gray-500">
                You haven't enrolled in any courses yet.
                Explore LearnHub and start your learning journey.
              </p>

              <button
                onClick={() => navigate("/courses")}
                className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Explore Courses
              </button>

            </div>
          )}

          {/* Course Cards */}
          {!loading && enrolledCourses.length > 0 && (
            <div className="grid gap-6 lg:grid-cols-2">

              {enrolledCourses.map((course) => {

                const progress = getProgress(
                  course.id,
                  course.lessonList?.length || 0
                )

                return (
                  <div
                    key={course.id}
                    className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >

                    {/* Course Image */}
                    <div className="relative overflow-hidden">

                      <img
                        src={course.image}
                        alt={course.title}
                        className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute left-4 top-4">
                        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-blue-700 shadow-sm backdrop-blur">
                          {course.category}
                        </span>
                      </div>

                      {progress === 100 && (
                        <div className="absolute right-4 top-4">
                          <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
                            Completed ✓
                          </span>
                        </div>
                      )}

                    </div>

                    {/* Course Content */}
                    <div className="p-6">

                      <div className="flex items-start justify-between gap-4">

                        <h3 className="text-xl font-bold text-gray-900">
                          {course.title}
                        </h3>

                        <span className="shrink-0 text-sm font-semibold text-gray-500">
                          ⭐ {course.rating}
                        </span>

                      </div>

                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
                        {course.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">

                        <span>
                          👨‍🏫 {course.instructor}
                        </span>

                        <span>
                          📖 {course.lessonList?.length || 0} Lessons
                        </span>

                      </div>

                      {/* Progress */}
                      <div className="mt-6">

                        <div className="mb-2 flex items-center justify-between">

                          <div>
                            <p className="text-sm font-semibold text-gray-700">
                              Your Progress
                            </p>

                            <p className="mt-0.5 text-xs text-gray-400">
                              {progress === 100
                                ? "Course completed"
                                : "Keep going"}
                            </p>
                          </div>

                          <span className="text-sm font-bold text-blue-600">
                            {progress}%
                          </span>

                        </div>

                        <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">

                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
                            style={{
                              width: `${progress}%`
                            }}
                          ></div>

                        </div>

                      </div>

                      {/* Button */}
                      <button
                        onClick={() =>
                          navigate(
                            `/courses/${course.id}/learn`
                          )
                        }
                        className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 hover:shadow-md"
                      >
                        {progress === 100
                          ? "Review Course"
                          : "Continue Learning →"}
                      </button>

                    </div>

                  </div>
                )
              })}

            </div>
          )}

        </div>

      </div>

    </div>
  )
}

export default MyLearning

