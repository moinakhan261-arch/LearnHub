import { useParams , useNavigate} from "react-router-dom"
import courses from "../data/courses"
import axios from "axios"

function CourseDetails(){
const{id} =useParams()
const navigate=useNavigate()
const course=courses.find(
    (course)=>course.id === Number(id)
    )
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
    return(
        <div className="min-h-screen bg-gray-100 py-10">
             <button 
        className="block mx-auto bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 mb-6"
        onClick={()=>navigate("/courses")}>Back to Courses</button>
        <h1 className="text-4xl font-bold text-blue-600 text-center">
           {course.title}
        </h1>
       
        <img
        src={course.image}
        alt={course.title}
        className="w-full max-w-2xl mx-auto h-64 object-cover rounded-xl mt-6"
      />

      <p className="text-center text-gray-600 max-w-2xl mx-auto mt-6">
        {course.description}
      </p>

      <p className="text-center text-gray-700 mt-4">
        Instructor:{course.instructor}
      </p>

      <p className="text-center text-lg font-bold mt-3">
        {course.rating}
        </p> 

        <p className="text-center text-gray-600 mt-2">
            {course.lessons}
        </p>

        <p className=" text-center text-lg font-bold text-blue-600">
            ₹{course.price}
          </p>

          <button
  className="block mx-auto bg-blue-600 text-white px-6 py-3 rounded-lg mt-6 hover:bg-blue-700"
  onClick={handleEnroll}
>
  Start Learning
</button>
        <p className="text-center mt-5">
            Course ID: {id}
        </p>
        </div>
    )
}

export default CourseDetails