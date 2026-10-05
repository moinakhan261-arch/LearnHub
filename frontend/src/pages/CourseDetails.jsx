
import { useParams, useNavigate } from "react-router-dom"
import courses from "../data/courses"
import axios from "axios"

function CourseDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const course = courses.find(
    (course) => course.id === Number(id)
  )

  const handleEnroll = async () => {
    try {
      const token = localStorage.getItem("token")

      await axios.post(
        "http://localhost:5000/api/enrollments",
        { courseId: Number(id) },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      navigate(`/courses/${id}/learn`)
    } catch (error) {
      console.error(error)
      alert(error.response?.data?.message || "Enrollment failed")
    }
  }

  // Invalid course ID
  if (!course) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-3xl">
            ⚠️
          </div>

          <h1 className="mt-6 text-2xl font-extrabold text-slate-900">
            Course Not Found
          </h1>

          <p className="mt-3 leading-7 text-slate-600">
            We couldn't find the course you're looking for.
            Please return to the courses page and choose another course.
          </p>

          <button
            onClick={() => navigate("/courses")}
            className="mt-7 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
          >
            ← Back to Courses
          </button>

        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 sm:py-14">

      {/* Back Navigation */}
      <div className="mx-auto max-w-7xl">

        <button
          onClick={() => navigate("/courses")}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
        >
          ← Back to Courses
        </button>

      </div>

      {/* Course Header */}
      <section className="mx-auto mt-7 max-w-7xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">

        <div className="grid lg:grid-cols-2">

          {/* Course Image */}
          <div className="relative min-h-[320px] overflow-hidden lg:min-h-[560px]">

            <img
              src={course.image}
              alt={course.title}
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8">

              <span className="inline-flex rounded-full border border-white/20 bg-white/90 px-4 py-2 text-sm font-bold text-blue-700 shadow-lg backdrop-blur">
                {course.category}
              </span>

              <p className="mt-3 text-sm font-medium text-white/90">
                LearnHub Academy
              </p>

            </div>

          </div>

          {/* Course Information */}
          <div className="flex flex-col p-7 sm:p-10 lg:p-12">

            <div className="flex flex-wrap items-center gap-3">

              <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-blue-700">
                Course
              </span>

              <span className="text-sm text-slate-500">
                Learn • Practice • Grow
              </span>

            </div>

            <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {course.title}
            </h1>

            <p className="mt-5 text-base leading-8 text-slate-600">
              {course.description}
            </p>

            {/* Instructor */}
            <div className="mt-7 flex items-center gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-violet-100 text-lg font-bold text-blue-700">
                {course.instructor?.charAt(0) || "I"}
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Course Instructor
                </p>

                <p className="mt-1 font-bold text-slate-900">
                  {course.instructor}
                </p>
              </div>

            </div>

            {/* Course Stats */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <span className="text-lg">★</span>

                <p className="mt-2 text-xs text-slate-500">
                  Rating
                </p>

                <p className="mt-1 font-bold text-slate-900">
                  {course.rating}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <span className="text-lg">▤</span>

                <p className="mt-2 text-xs text-slate-500">
                  Lessons
                </p>

                <p className="mt-1 font-bold text-slate-900">
                  {course.lessons}
                </p>
              </div>

              <div className="col-span-2 rounded-2xl border border-violet-100 bg-violet-50 p-4 sm:col-span-1">
                <span className="text-lg">🎓</span>

                <p className="mt-2 text-xs text-violet-600">
                  Learning
                </p>

                <p className="mt-1 font-bold text-violet-900">
                  Self-Paced
                </p>
              </div>

            </div>

            {/* Price */}
            <div className="mt-8 border-t border-slate-200 pt-7">

              <p className="text-sm font-medium text-slate-500">
                Course Price
              </p>

              <p className="mt-1 text-4xl font-extrabold tracking-tight text-blue-700">
                ₹{course.price}
              </p>

            </div>

            {/* Enrollment */}
            <button
              onClick={handleEnroll}
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Start Learning
              <span>→</span>
            </button>

            <p className="mt-3 text-center text-xs text-slate-500">
              Start your learning journey with LearnHub
            </p>

          </div>

        </div>

      </section>

      {/* Bottom Information */}
      <section className="mx-auto mt-8 max-w-7xl">

        <div className="grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
              📚
            </div>

            <h3 className="mt-4 font-bold text-slate-900">
              Structured Learning
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Follow organized lessons designed to help you build your
              knowledge step by step.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-xl">
              🎯
            </div>

            <h3 className="mt-4 font-bold text-slate-900">
              Practice Your Skills
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Reinforce what you learn through practical lessons and
              interactive quizzes.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-xl">
              📈
            </div>

            <h3 className="mt-4 font-bold text-slate-900">
              Track Your Progress
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Continue learning from where you left off and keep moving
              toward your goals.
            </p>
          </div>

        </div>

      </section>

    </main>
  )
}

export default CourseDetails

