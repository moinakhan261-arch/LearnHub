function Sidebar({ lessons, selectedLesson, setSelectedLesson }) {
  return (
    <aside className="w-full md:w-64 bg-white rounded-xl shadow-md p-5">

      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Course Lessons
      </h2>

      <div className="space-y-2">
        {lessons.map((lesson) => (
          <button
            key={lesson}
            onClick={() => setSelectedLesson(lesson)}
            className={`w-full text-left p-3 rounded-lg ${
  selectedLesson === lesson
    ? "bg-blue-100 text-blue-600 font-semibold"
    : "bg-gray-100 text-gray-700 hover:bg-blue-50"
}`}  >
            {lesson}
          </button>
        ))}
      </div>

    </aside>
  )
}

export default Sidebar