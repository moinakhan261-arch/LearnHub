
import { Link } from "react-router-dom"

function CourseCard({ course }) {
  return (
    <div className="group w-80 h-full overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Course Image */}
      <div className="relative overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
        />

        {/* Category Badge */}
        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-600 shadow-sm">
          {course.category}
        </span>
      </div>

      {/* Course Content */}
      <div className="flex h-full flex-col p-5">

        <h2 className="text-xl font-bold text-gray-800">
          {course.title}
        </h2>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
          {course.description}
        </p>

        {/* Instructor */}
        <p className="mt-4 text-sm text-gray-500">
          Instructor:{" "}
          <span className="font-medium text-gray-700">
            {course.instructor}
          </span>
        </p>

        {/* Rating & Lessons */}
        <div className="mt-4 flex items-center gap-4 text-sm">

          <span className="font-semibold text-gray-800">
            ⭐ {course.rating}
          </span>

          <span className="text-gray-500">
            📚 {course.lessons} lessons
          </span>

        </div>

        {/* Price & Button */}
        <div className="mt-auto flex items-center justify-between pt-6">

          <span className="text-xl font-bold text-blue-600">
            ₹{course.price}
          </span>

          <Link
            to={`/courses/${course.id}`}
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition duration-300 hover:bg-blue-700"
          >
            View Course
          </Link>

        </div>

      </div>
    </div>
  )
}

export default  CourseCard

