
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

  return (
    <div>

      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        Course Quiz
      </h2>

      <p className="text-sm text-gray-500 mb-4">
        Question {currentQuestion + 1} of {quiz.length}
      </p>

      <h3 className="text-lg font-semibold text-gray-800 mb-5">
        {question.question}
      </h3>

      <div className="space-y-3">

        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => setSelectedAnswer(option)}
            className={`w-full text-left p-3 rounded-lg border ${
              selectedAnswer === option
                ? "bg-blue-100 border-blue-500"
                : "bg-gray-50 border-gray-200 hover:bg-blue-50"
            }`}
          >
            {option}
          </button>
        ))}

        {selectedAnswer && (
          <div className="mt-4">

            {selectedAnswer === question.answer ? (
              <p className="text-green-600 font-semibold">
                ✅ Correct!
              </p>
            ) : (
              <p className="text-red-600 font-semibold">
                ❌ Incorrect!
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
              className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              {currentQuestion === quiz.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </button>

          </div>
        )}

      </div>

    </div>
  )
}

export default Quiz
