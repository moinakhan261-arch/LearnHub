
import { useParams, useNavigate } from "react-router-dom"
import courses from "../data/courses"
import axios from "axios"

function CourseDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const course = courses.find(
    (course) => course.id === Number(id)
  )

  console.log("Course ID:", id)
console.log("Course:", course)


  const handleEnroll = async () => {
    try {
      const token = localStorage.getItem("token")

      await axios.post(
        "http://localhost:5000/api/enrollments",
        { courseId: Number(id) },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      navigate(`/courses/${id}/learn`)
    } catch (error) {
      console.error(error)
      alert(error.response?.data?.message || "Enrollment failed")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">

      {/* Back Button */}
      <div className="mx-auto max-w-6xl">
        <button
          onClick={() => navigate("/courses")}
          className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-100"
        >
          ← Back to Courses
        </button>
      </div>

      {/* Course Details */}
      <div className="mx-auto mt-8 max-w-6xl overflow-hidden rounded-2xl bg-white shadow-lg">

        <div className="grid md:grid-cols-2">

          {/* Course Image */}
          <div className="h-full min-h-80">
            <img
              src={course.image}
              alt={course.title}
              className="h-full min-h-80 w-full object-cover"
            />
          </div>

          {/* Course Information */}
          <div className="flex flex-col justify-center p-8 sm:p-10">

            <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600">
              {course.category}
            </span>

            <h1 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {course.title}
            </h1>

            <p className="mt-5 leading-7 text-gray-600">
              {course.description}
            </p>

            {/* Instructor */}
            <p className="mt-6 text-sm text-gray-500">
              Instructor
            </p>

            <p className="font-semibold text-gray-800">
              {course.instructor}
            </p>

            {/* Course Stats */}
            <div className="mt-6 flex flex-wrap gap-5">

              <div>
                <p className="text-sm text-gray-500">
                  Rating
                </p>
                <p className="mt-1 font-semibold text-gray-800">
                  ⭐ {course.rating}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Lessons
                </p>
                <p className="mt-1 font-semibold text-gray-800">
                  📚 {course.lessons}
                </p>
              </div>

            </div>

            {/* Price */}
            <div className="mt-7 border-t border-gray-100 pt-6">

              <p className="text-sm text-gray-500">
                Course Price
              </p>

              <p className="mt-1 text-3xl font-extrabold text-blue-600">
                ₹{course.price}
              </p>

            </div>

            {/* Start Learning */}
            <button
              onClick={handleEnroll}
              className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition duration-300 hover:bg-blue-700 hover:shadow-md"
            >
              Start Learning →
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default CourseDetails

