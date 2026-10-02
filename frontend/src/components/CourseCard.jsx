import { Link } from "react-router-dom"

function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-80 h-full flex flex-col">

      <img 
        src={course.image}
        alt={course.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-5 flex flex-col flex-1">

        <h2 className="text-xl font-bold text-gray-800">
          {course.title}
        </h2>
         
        <p className="text-sm text-gray-600 mt-3">{course.description}</p>

        <p className="text-sm text-gray-600 mt-5">
          Instructor: {course.instructor}
        </p>

        <p className="text-xl font-bold text-black mt-1">
          {course.rating}
        </p>

        <p className="text-lg text-gray-600 mt-2">
          {course.lessons}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4">

          <span className="text-lg font-bold text-blue-600">
            ₹{course.price}
          </span>

          <Link to={`/courses/${course.id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">View Course</Link>

        </div>

      </div>
    </div>
  )
}

export default CourseCard