
import { Link } from "react-router-dom"

function CourseCard({ course }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/10">

      {/* Course Image */}
      <div className="relative overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category Badge */}
        <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/95 px-3 py-1.5 text-xs font-bold text-blue-700 shadow-sm backdrop-blur">
          {course.category}
        </span>
      </div>

      {/* Course Content */}
      <div className="flex flex-1 flex-col p-6">

        {/* Title */}
        <h2 className="text-xl font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-700">
          {course.title}
        </h2>

        {/* Description */}
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
          {course.description}
        </p>

        {/* Instructor */}
        <div className="mt-5 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-violet-100 font-bold text-blue-700">
            {course.instructor?.charAt(0) || "I"}
          </div>

          <div className="min-w-0">
            <p className="text-xs text-slate-500">
              Course Instructor
            </p>

            <p className="truncate text-sm font-semibold text-slate-800">
              {course.instructor}
            </p>
          </div>
        </div>

        {/* Course Information */}
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">

          <div className="flex items-center gap-1.5">
            <span className="text-amber-500">★</span>

            <span className="text-sm font-bold text-slate-800">
              {course.rating}
            </span>

            <span className="text-xs text-slate-500">
              Rating
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-slate-600">
            <span>▤</span>
            <span>{course.lessons} lessons</span>
          </div>

        </div>

        {/* Price and Button */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-5 mt-5">

          <div>
            <p className="text-xs text-slate-500">
              Course Price
            </p>

            <p className="mt-1 text-2xl font-extrabold tracking-tight text-blue-700">
              ₹{course.price}
            </p>
          </div>

          <Link
            to={`/courses/${course.id}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            View Course
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

        </div>

      </div>
    </div>
  )
}

export default CourseCard