
import { useParams, useNavigate } from 'react-router-dom'
import courses from '../data/courses'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import Modal from '../components/Modal'
import Quiz from './Quiz'

const lessonContent = {
  1: {
    Introduction:
      "Learn what React is and why it is used to build modern user interfaces.",
    Components:
      "Learn how to create reusable React components.",
    Props:
      "Learn how data is passed from one component to another using props.",
    State:
      "Learn how React state works and how it changes the UI.",
    Hooks:
      "Learn how React Hooks such as useState and useEffect work.",
    JSX:
      "Learn how JSX allows you to write HTML-like syntax inside JavaScript."
  },
  2: {
    Introduction:
      "Learn what Python is and how it is used for programming and problem solving.",
    Variables:
      "Learn how variables store and work with different values in Python.",
    "Data Types":
      "Learn about strings, numbers, lists, tuples, dictionaries and other Python data types.",
    Functions:
      "Learn how to create reusable functions and pass data using parameters.",
    "Lists & Dictionaries":
      "Learn how to store and work with collections of data in Python.",
    OOP:
      "Learn the fundamentals of object-oriented programming using Python."
  },
  3: {
    Introduction:
      "Learn the fundamentals of databases and understand SQL and MongoDB.",
    "SQL Basics":
      "Learn tables, databases, rows, columns and basic SQL concepts.",
    "SELECT Queries":
      "Learn how to retrieve data from a database using SELECT queries.",
    "WHERE & Filtering":
      "Learn how to filter database records using WHERE conditions.",
    "MongoDB Basics":
      "Learn how MongoDB stores data using databases, collections and documents.",
    "CRUD Operations":
      "Learn how to create, read, update and delete data."
  },
  4: {
    Introduction:
      "Learn what JavaScript is and how it adds behavior and interactivity to web pages.",
    "Variables & Data Types":
      "Learn variables and the main data types available in JavaScript.",
    Functions:
      "Learn how to create and use reusable JavaScript functions.",
    "Arrays & Objects":
      "Learn how to store and work with collections and structured data.",
    "DOM Manipulation":
      "Learn how JavaScript can access and modify elements on a webpage.",
    Events:
      "Learn how JavaScript responds to user actions such as clicks and form submissions."
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
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-semibold text-red-500">
            Course not found.
          </p>
        </div>
      </div>
    )
  }

  if (isEnrolled === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600"></div>
          <p className="mt-4 font-medium text-gray-600">
            Checking enrollment...
          </p>
        </div>
      </div>
    )
  }

  const Lessons = course.lessonList || []

  const progress =
    Lessons.length > 0
      ? (completedLessons.length / Lessons.length) * 100
      : 0

  const currentIndex = Lessons.indexOf(selectedLesson)

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:gap-8">

        {/* Sidebar */}
        <Sidebar
          lessons={Lessons}
          selectedLesson={selectedLesson}
          setSelectedLesson={setSelectedLesson}
        />

        {/* Main Content */}
        <main className="min-w-0 flex-1">

          {/* Course Header */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-6 text-white shadow-lg sm:p-8">

            <div className="relative z-10">

              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold backdrop-blur">
                  {course.category}
                </span>

                <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-medium backdrop-blur">
                  {Lessons.length} Lessons
                </span>
              </div>

              <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {course.title}
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-50 sm:text-base">
                {course.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-6 text-sm text-blue-50">
                <div>
                  <p className="text-xs uppercase tracking-wide text-blue-200">
                    Instructor
                  </p>
                  <p className="mt-1 font-semibold text-white">
                    {course.instructor}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-blue-200">
                    Rating
                  </p>
                  <p className="mt-1 font-semibold text-white">
                    ⭐ {course.rating}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-blue-200">
                    Status
                  </p>
                  <p className="mt-1 font-semibold text-white">
                    Enrolled
                  </p>
                </div>
              </div>

            </div>

            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10"></div>
            <div className="absolute -bottom-16 right-20 h-48 w-48 rounded-full bg-white/5"></div>

          </section>

          {/* Progress */}
          <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                  Learning Progress
                </p>

                <h2 className="mt-1 text-xl font-bold text-gray-900">
                  Keep going — you're making progress!
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {completedLessons.length} of {Lessons.length} lessons completed
                </p>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
                <span className="text-lg font-extrabold text-blue-600">
                  {Math.round(progress)}%
                </span>
              </div>

            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

          </section>

          {/* Course Lessons */}
          <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

            <div className="mb-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
                Course Curriculum
              </p>

              <h2 className="mt-1 text-2xl font-bold text-gray-900">
                Course Lessons
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Select a lesson to continue learning.
              </p>
            </div>

            <div className="space-y-3">

              {Lessons.map((lesson, index) => (
                <button
                  key={lesson}
                  onClick={() => setSelectedLesson(lesson)}
                  className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all duration-200 ${
                    selectedLesson === lesson
                      ? 'border-blue-200 bg-blue-50 shadow-sm'
                      : completedLessons.includes(lesson)
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-100 bg-gray-50 hover:border-blue-200 hover:bg-blue-50'
                  }`}
                >

                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      completedLessons.includes(lesson)
                        ? 'bg-green-100 text-green-700'
                        : selectedLesson === lesson
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-500 shadow-sm'
                    }`}
                  >
                    {completedLessons.includes(lesson)
                      ? '✓'
                      : index + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`font-semibold ${
                        selectedLesson === lesson
                          ? 'text-blue-700'
                          : completedLessons.includes(lesson)
                          ? 'text-green-700'
                          : 'text-gray-700'
                      }`}
                    >
                      {lesson}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Lesson {index + 1}
                    </p>
                  </div>

                  {selectedLesson === lesson && (
                    <span className="hidden text-xs font-semibold text-blue-600 sm:block">
                      Current
                    </span>
                  )}

                </button>
              ))}

            </div>

          </section>

          {/* Selected Lesson */}
          <section className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

            <div className="p-6 sm:p-8">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                    Current Lesson
                  </p>

                  <h2 className="mt-2 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                    {selectedLesson}
                  </h2>
                </div>

                {completedLessons.includes(selectedLesson) && (
                  <span className="w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                    ✓ Completed
                  </span>
                )}

              </div>

              <p className="mt-5 max-w-4xl text-base leading-8 text-gray-600">
                {lessonContent[course.id]?.[selectedLesson] ||
                  "Content loading..."}
              </p>

              {/* Video Area */}
              <div className="group relative mt-7 flex h-64 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-950 via-gray-900 to-slate-800 shadow-inner sm:h-80">

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                <div className="relative m-auto text-center">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur transition-transform duration-300 group-hover:scale-110">
                    ▶
                  </div>

                  <p className="mt-4 font-semibold text-white">
                    {selectedLesson} Tutorial
                  </p>

                  <p className="mt-1 text-sm text-gray-400">
                    Video lesson
                  </p>

                </div>

              </div>

              {/* Actions */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">

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
                  className={`rounded-xl px-5 py-3.5 font-semibold transition ${
                    completedLessons.includes(selectedLesson)
                      ? 'cursor-default bg-green-100 text-green-700'
                      : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-md'
                  }`}
                >
                  {completedLessons.includes(selectedLesson)
                    ? "Lesson Completed ✓"
                    : "Mark as Complete"}
                </button>

                <button
                  onClick={() => setShowQuiz(true)}
                  className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3.5 font-semibold text-white transition hover:shadow-md"
                >
                  Take Quiz →
                </button>

              </div>

              {/* Previous / Next */}
              <div className="mt-7 flex items-center justify-between border-t border-gray-100 pt-6">

                <button
                  onClick={() =>
                    setSelectedLesson(Lessons[currentIndex - 1])
                  }
                  disabled={currentIndex === 0}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 sm:px-5"
                >
                  ← Previous
                </button>

                <span className="hidden text-sm text-gray-400 sm:block">
                  {currentIndex + 1} / {Lessons.length}
                </span>

                <button
                  onClick={() =>
                    setSelectedLesson(Lessons[currentIndex + 1])
                  }
                  disabled={currentIndex === Lessons.length - 1}
                  className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 sm:px-5"
                >
                  Next →
                </button>

              </div>

            </div>

          </section>

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

