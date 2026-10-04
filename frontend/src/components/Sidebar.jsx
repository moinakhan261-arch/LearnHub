
function Sidebar({ lessons, selectedLesson, setSelectedLesson }) {
  return (
    <aside className="h-fit w-full rounded-2xl bg-white p-5 shadow-sm md:sticky md:top-6 md:w-72">

      {/* Header */}
      <div className="mb-5 border-b border-gray-100 pb-4">

        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          Course Content
        </p>

        <h2 className="mt-1 text-xl font-bold text-gray-900">
          Course Lessons
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {lessons.length} lessons
        </p>

      </div>

      {/* Lessons */}
      <div className="space-y-2">

        {lessons.map((lesson, index) => (

          <button
            key={lesson}
            onClick={() => setSelectedLesson(lesson)}
            className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition duration-200 ${
              selectedLesson === lesson
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >

            {/* Lesson Number */}
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                selectedLesson === lesson
                  ? "bg-white text-blue-600"
                  : "bg-white text-gray-500 shadow-sm"
              }`}
            >
              {index + 1}
            </span>

            {/* Lesson Name */}
            <span className="font-medium">
              {lesson}
            </span>

          </button>

        ))}

      </div>

    </aside>
  )
}

export default Sidebar

