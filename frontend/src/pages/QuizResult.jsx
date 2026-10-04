
import { useLocation, useNavigate } from "react-router-dom"

function QuizResult() {
  const location = useLocation()
  const navigate = useNavigate()

  const {
    score = 0,
    total = 0,
    courseId
  } = location.state || {}

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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">

      <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg">

        {/* Result Icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-50">

          <span className="text-2xl font-extrabold text-blue-600">
            {percentage}%
          </span>

        </div>

        {/* Heading */}
        <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-blue-600">
          LearnHub Assessment
        </p>

        <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
          Quiz Completed!
        </h1>

        <p className="mt-4 text-gray-500">
          You scored
        </p>

        <p className="mt-1 text-3xl font-extrabold text-blue-600">
          {score} / {total}
        </p>

        {/* Message */}
        <div className="mt-6 rounded-xl bg-gray-50 p-4">

          <p className="leading-6 text-gray-600">
            {message}
          </p>

        </div>

        {/* Navigation */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">

          <button
            onClick={() => navigate(`/courses/${courseId}/learn`)}
            className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            ← Back to Course
          </button>

          <button
            onClick={() => navigate("/my-learning")}
            className="flex-1 rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            My Learning
          </button>

        </div>

      </div>

    </div>
  )
}

export default QuizResult

