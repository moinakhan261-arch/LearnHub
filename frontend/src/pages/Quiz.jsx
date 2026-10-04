
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import quizzes from "../data/quizzes"

function Quiz({ courseId, onClose }) {
  const navigate = useNavigate()

  const quiz = quizzes[courseId]

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (currentQuestion === quiz.length) {
      navigate(`/quiz-result/${courseId}`, {
        state: {
          score: score,
          total: quiz.length
        }
      })
    }
  }, [currentQuestion, quiz.length, score, courseId, navigate])

  if (currentQuestion === quiz.length) {
    return null
  }

  const question = quiz[currentQuestion]

  const progress =
    ((currentQuestion + 1) / quiz.length) * 100

  return (
    <div className="rounded-2xl bg-white">

      {/* Header */}
      <div className="border-b border-gray-100 pb-5">

        <div className="flex items-center justify-between gap-4">

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-purple-600">
              LearnHub Assessment
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              Course Quiz
            </h2>
          </div>

          <span className="rounded-full bg-purple-50 px-3 py-1 text-sm font-semibold text-purple-600">
            {currentQuestion + 1}/{quiz.length}
          </span>

        </div>

        {/* Progress */}
        <div className="mt-5">

          <div className="mb-2 flex justify-between text-xs text-gray-500">
            <span>Quiz Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-gray-200">

            <div
              className="h-2 rounded-full bg-purple-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>

          </div>

        </div>

      </div>

      {/* Question */}
      <div className="pt-6">

        <p className="text-sm font-medium text-gray-500">
          Question {currentQuestion + 1}
        </p>

        <h3 className="mt-2 text-xl font-bold leading-8 text-gray-900">
          {question.question}
        </h3>

      </div>

      {/* Options */}
      <div className="mt-6 space-y-3">

        {question.options.map((option, index) => (

          <button
            key={option}
            onClick={() => setSelectedAnswer(option)}
            className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition duration-200 ${
              selectedAnswer === option
                ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                : "border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-300 hover:bg-blue-50"
            }`}
          >

            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                selectedAnswer === option
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-500 shadow-sm"
              }`}
            >
              {String.fromCharCode(65 + index)}
            </span>

            <span className="font-medium">
              {option}
            </span>

          </button>

        ))}

      </div>

      {/* Feedback */}
      {selectedAnswer && (
        <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50 p-5">

          {selectedAnswer === question.answer ? (
            <p className="font-semibold text-green-600">
              ✅ Correct! Great job.
            </p>
          ) : (
            <p className="font-semibold text-red-600">
              ❌ Incorrect. Keep learning and try the next question.
            </p>
          )}

          <button
            onClick={() => {
              if (selectedAnswer === question.answer) {
                setScore(score + 1)
              }

              setSelectedAnswer("")
              setCurrentQuestion(currentQuestion + 1)
            }}
            className="mt-4 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            {currentQuestion === quiz.length - 1
              ? "Finish Quiz →"
              : "Next Question →"}
          </button>

        </div>
      )}

    </div>
  )
}

export default Quiz

