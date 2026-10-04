
import { useParams, useNavigate } from 'react-router-dom'
import courses from '../data/courses'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import Modal from '../components/Modal'
import Quiz from './Quiz'

const lessonContent = {
  1: {
    Introduction: "Learn what React is and why it is used to build modern user interfaces.",
    Components: "Learn how to create reusable React components.",
    Props: "Learn how data is passed from one component to another using props.",
    State: "Learn how React state works and how it changes the UI.",
    Hooks: "Learn how React Hooks such as useState and useEffect work.",
    JSX: "Learn how JSX allows you to write HTML-like syntax inside JavaScript."
  },
  2: {
    Introduction: "Learn what Python is and how it is used for programming and problem solving.",
    Variables: "Learn how variables store and work with different values in Python.",
    "Data Types": "Learn about strings, numbers, lists, tuples, dictionaries and other Python data types.",
    Functions: "Learn how to create reusable functions and pass data using parameters.",
    "Lists & Dictionaries": "Learn how to store and work with collections of data in Python.",
    OOP: "Learn the fundamentals of object-oriented programming using Python."
  },
  3: {
    Introduction: "Learn the fundamentals of databases and understand SQL and MongoDB.",
    "SQL Basics": "Learn tables, databases, rows, columns and basic SQL concepts.",
    "SELECT Queries": "Learn how to retrieve data from a database using SELECT queries.",
    "WHERE & Filtering": "Learn how to filter database records using WHERE conditions.",
    "MongoDB Basics": "Learn how MongoDB stores data using databases, collections and documents.",
    "CRUD Operations": "Learn how to create, read, update and delete data."
  },
  4: {
    Introduction: "Learn what JavaScript is and how it adds behavior and interactivity to web pages.",
    "Variables & Data Types": "Learn variables and the main data types available in JavaScript.",
    Functions: "Learn how to create and use reusable JavaScript functions.",
    "Arrays & Objects": "Learn how to store and work with collections and structured data.",
    "DOM Manipulation": "Learn how JavaScript can access and modify elements on a webpage.",
    Events: "Learn how JavaScript responds to user actions such as clicks and form submissions."
  }
}

function Learning() {
  const [completedLessons, setCompletedLessons] = useState([])
  const [selectedLesson, setSelectedLesson] = useState("Introduction")
  const [showQuiz, setShowQuiz] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()
  const [isEnrolled, setIsEnrolled] = useState(null)

  const course = courses.find(
    (course) => course.id === Number(id)
  )

  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const token = localStorage.getItem('token')

        const response = await axios.get(
          'http://localhost:5000/api/enrollments',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        const enrolled = response.data.enrollments.some(
          (enrollment) => enrollment.courseId === Number(id)
        )

        setIsEnrolled(enrolled)

        if (!enrolled) {
          navigate(`/courses/${id}`)
        }
      } catch (error) {
        console.error(error)
        navigate('/courses')
      }
    }

    checkEnrollment()
  }, [id, navigate])

  useEffect(() => {
    const savedProgress = localStorage.getItem(`progress_${id}`)

    if (savedProgress) {
      setCompletedLessons(JSON.parse(savedProgress))
    }
  }, [id])

  if (!course) {
    return (
      <p className="mt-10 text-center text-red-500">
        Course not found.
      </p>
    )
  }

  if (isEnrolled === null) {
    return (
      <p className="mt-10 text-center text-gray-600">
        Checking enrollment...
      </p>
    )
  }

  const Lessons = course.lessonList || []

  const progress =
    Lessons.length > 0
      ? (completedLessons.length / Lessons.length) * 100
      : 0

  const currentIndex = Lessons.indexOf(selectedLesson)

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6">

      {/* Page Layout */}
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row">

        {/* Sidebar */}
        <Sidebar
          lessons={Lessons}
          selectedLesson={selectedLesson}
          setSelectedLesson={setSelectedLesson}
        />

        {/* Main Content */}
        <main className="flex-1">

          {/* Course Header */}
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">

            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600">
              {course.category}
            </span>

            <h1 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {course.title}
            </h1>

            <p className="mt-3 max-w-3xl leading-7 text-gray-600">
              {course.description}
            </p>

          </div>

          {/* Progress */}
          <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">

            <div className="mb-3 flex items-center justify-between">

              <div>
                <h2 className="font-bold text-gray-800">
                  Your Progress
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {completedLessons.length} of {Lessons.length} lessons completed
                </p>
              </div>

              <span className="text-lg font-bold text-blue-600">
                {Math.round(progress)}%
              </span>

            </div>

            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">

              <div
                className="h-3 rounded-full bg-blue-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>

            </div>

          </div>

          {/* Lesson Navigation */}
          <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Course Lessons
            </h2>

            <div className="space-y-3">

              {Lessons.map((lesson) => (
                <button
                  key={lesson}
                  onClick={() => setSelectedLesson(lesson)}
                  className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                    selectedLesson === lesson
                      ? 'border-blue-200 bg-blue-50 text-blue-700'
                      : completedLessons.includes(lesson)
                      ? 'border-green-200 bg-green-50 text-green-700'
                      : 'border-gray-100 bg-gray-50 text-gray-700 hover:border-blue-200 hover:bg-blue-50'
                  }`}
                >

                  <span className="font-medium">
                    {lesson}
                  </span>

                  {completedLessons.includes(lesson) && (
                    <span className="font-bold text-green-600">
                      ✓
                    </span>
                  )}

                </button>
              ))}

            </div>

          </div>

          {/* Selected Lesson */}
          <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8">

            <div className="flex items-center justify-between gap-4">

              <div>
                <p className="text-sm font-semibold text-blue-600">
                  CURRENT LESSON
                </p>

                <h2 className="mt-1 text-2xl font-bold text-gray-900">
                  {selectedLesson}
                </h2>
              </div>

              {completedLessons.includes(selectedLesson) && (
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                  Completed ✓
                </span>
              )}

            </div>

            <p className="mt-5 leading-8 text-gray-600">
              {lessonContent[course.id]?.[selectedLesson] ||
                "Content loading..."}
            </p>

            {/* Video Placeholder */}
            <div className="mt-7 flex h-64 items-center justify-center rounded-2xl bg-gray-900">

              <div className="text-center">
                <div className="text-4xl">
                  ▶
                </div>

                <p className="mt-3 font-medium text-white">
                  {selectedLesson} Tutorial
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  Video lesson
                </p>
              </div>

            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">

              <button
                onClick={() => {
                  if (!completedLessons.includes(selectedLesson)) {
                    const updatedLessons = [
                      ...completedLessons,
                      selectedLesson
                    ]

                    setCompletedLessons(updatedLessons)

                    localStorage.setItem(
                      `progress_${course.id}`,
                      JSON.stringify(updatedLessons)
                    )
                  }
                }}
                className="flex-1 rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
              >
                {completedLessons.includes(selectedLesson)
                  ? "Lesson Completed ✓"
                  : "Mark as Complete"}
              </button>

              <button
                onClick={() => setShowQuiz(true)}
                className="flex-1 rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
              >
                Take Quiz
              </button>

            </div>

            {/* Previous / Next */}
            <div className="mt-6 flex justify-between border-t border-gray-100 pt-6">

              <button
                onClick={() =>
                  setSelectedLesson(Lessons[currentIndex - 1])
                }
                disabled={currentIndex === 0}
                className="rounded-lg bg-gray-100 px-5 py-2 font-medium text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Previous
              </button>

              <button
                onClick={() =>
                  setSelectedLesson(Lessons[currentIndex + 1])
                }
                disabled={currentIndex === Lessons.length - 1}
                className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next →
              </button>

            </div>

          </div>

          {/* Quiz Modal */}
          <Modal
            isOpen={showQuiz}
            onClose={() => setShowQuiz(false)}
          >
            <Quiz
              courseId={course.id}
              onClose={() => setShowQuiz(false)}
            />
          </Modal>

        </main>

      </div>

    </div>
  )
}

export default Learning

