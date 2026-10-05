
import { useLocation, useNavigate, useParams } from "react-router-dom"

function QuizResult() {
  const location = useLocation()
  const navigate = useNavigate()
  const { courseId: urlCourseId } = useParams()

  const {
    score = 0,
    total = 0,
  } = location.state || {}

  // Use URL courseId as the reliable source
  const courseId = urlCourseId

  const percentage =
    total > 0
      ? Math.round((score / total) * 100)
      : 0

  let message = ""

  if (percentage === 100) {
    message = "Excellent work! You got every question correct."
  } else if (percentage >= 70) {
    message = "Great job! You have a good understanding of the topic."
  } else if (percentage >= 50) {
    message = "Good effort! Review the lessons and keep practicing."
  } else {
    message = "Keep practicing. Review the lessons and try the quiz again."
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-10 sm:px-6">

      <div className="flex min-h-[80vh] items-center justify-center">

        <div className="w-full max-w-xl rounded-3xl bg-white p-6 text-center shadow-xl sm:p-10">

          {/* Result Circle */}
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-8 border-blue-100 bg-blue-50 shadow-sm">

            <span className="text-2xl font-extrabold text-blue-600">
              {percentage}%
            </span>

          </div>

          {/* Heading */}
          <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            LearnHub Assessment
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Quiz Completed!
          </h1>

          <p className="mt-3 text-gray-500">
            You have completed the course assessment.
          </p>

          {/* Score */}
          <div className="mt-7 rounded-2xl bg-gray-50 px-5 py-6">

            <p className="text-sm font-medium text-gray-500">
              Your Score
            </p>

            <p className="mt-1 text-4xl font-extrabold text-blue-600">
              {score} / {total}
            </p>

            <p className="mt-1 text-sm font-medium text-gray-500">
              {percentage}% correct
            </p>

          </div>

          {/* Message */}
          <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-5">

            <p className="font-semibold text-gray-800">
              {message}
            </p>

          </div>

          {/* Buttons */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">

            <button
              type="button"
              onClick={() => navigate(`/courses/${courseId}/learn`)}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
            >
              ← Back to Course
            </button>

            <button
              type="button"
              onClick={() => navigate("/my-learning")}
              className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-[0.98]"
            >
              My Learning
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default QuizResult

