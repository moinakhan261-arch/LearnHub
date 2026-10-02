
import { useLocation, useNavigate } from "react-router-dom"

function QuizResult() {
  const location = useLocation()
  const navigate = useNavigate()

  const { score = 0, total = 0 } = location.state || {}

  const percentage = total > 0
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm p-8 text-center">

        <div className="mx-auto w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-3xl font-bold text-blue-600">
            {percentage}%
          </span>
        </div>

        <h1 className="mt-6 text-3xl font-bold text-gray-800">
          Quiz Completed!
        </h1>

        <p className="mt-3 text-gray-600">
          You scored
        </p>

        <p className="mt-2 text-2xl font-bold text-blue-600">
          {score} / {total}
        </p>

        <p className="mt-5 text-gray-600">
          {message}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">

          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Back to Course
          </button>

          <button
            onClick={() => navigate("/my-learning")}
           className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50"
          >
            My Learning
          </button>

        </div>

      </div>

    </div>
  )
}

export default QuizResult