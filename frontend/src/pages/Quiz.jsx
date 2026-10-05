
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import quizzes from "../data/quizzes"

function Quiz({ courseId, onClose }) {
  const navigate = useNavigate()

  const quiz = quizzes[courseId] || []

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (currentQuestion === quiz.length && quiz.length > 0) {
      navigate(`/quiz-result/${courseId}`, {
        state: {
          score,
          total: quiz.length,
        },
      })
    }
  }, [currentQuestion, quiz.length, score, courseId, navigate])

  if (quiz.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">
          Quiz Not Available
        </h2>

        <p className="mt-2 text-gray-500">
          This course does not have a quiz yet.
        </p>

        {onClose && (
          <button
            onClick={onClose}
            className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700"
          >
            Close
          </button>
        )}
      </div>
    )
  }

  if (currentQuestion === quiz.length) {
    return null
  }

  const question = quiz[currentQuestion]

  const progress = ((currentQuestion + 1) / quiz.length) * 100

  const handleNext = () => {
    const isCorrect = selectedAnswer === question.answer

    if (isCorrect) {
      setScore((previousScore) => previousScore + 1)
    }

    setSelectedAnswer("")
    setCurrentQuestion((previousQuestion) => previousQuestion + 1)
  }

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">

      {/* Header */}
      <div className="border-b border-gray-100 pb-6">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-purple-600">
              LearnHub Assessment
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
              Course Quiz
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Test what you have learned in this course.
            </p>
          </div>

          <span className="w-fit rounded-full bg-purple-50 px-4 py-2 text-sm font-bold text-purple-600">
            {currentQuestion + 1} / {quiz.length}
          </span>

        </div>

        {/* Progress */}
        <div className="mt-6">

          <div className="mb-2 flex justify-between text-xs font-medium text-gray-500">
            <span>Quiz Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>

          <div className="h-2.5 overflow-hidden rounded-full bg-gray-200">

            <div
              className="h-full rounded-full bg-purple-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>

          </div>

        </div>
      </div>

      {/* Question */}
      <div className="pt-7">

        <p className="text-sm font-semibold text-blue-600">
          Question {currentQuestion + 1}
        </p>

        <h3 className="mt-2 text-xl font-bold leading-8 text-gray-900 sm:text-2xl">
          {question.question}
        </h3>

      </div>

      {/* Options */}
      <div className="mt-7 space-y-3">

        {question.options.map((option, index) => {

          const isSelected = selectedAnswer === option

          return (
            <button
              key={option}
              type="button"
              onClick={() => setSelectedAnswer(option)}
              className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200 ${
                isSelected
                  ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                  : "border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-300 hover:bg-blue-50"
              }`}
            >

              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  isSelected
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
          )
        })}

      </div>

      {/* Feedback */}
      {selectedAnswer && (

        <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50 p-5">

          {selectedAnswer === question.answer ? (

            <div>
              <p className="font-bold text-green-600">
                ✅ Correct! Great job.
              </p>

              <p className="mt-1 text-sm text-gray-500">
                You selected the correct answer.
              </p>
            </div>

          ) : (

            <div>
              <p className="font-bold text-red-600">
                ❌ Incorrect
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Keep learning and try your best on the next question.
              </p>
            </div>

          )}

          <button
            type="button"
            onClick={handleNext}
            className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99]"
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

