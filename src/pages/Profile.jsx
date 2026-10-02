
import { useEffect, useState } from "react"
import axios from "axios"
function Profile() {
  const [user, setUser] = useState(null)
  const [enrolledCount, setEnrolledCount] = useState(0)

  
useEffect(() => {
  const storedUser = localStorage.getItem("user")

  if (storedUser) {
    setUser(JSON.parse(storedUser))
  }

  const fetchEnrollments = async () => {
    try {
      const token = localStorage.getItem("token")

      const response = await axios.get(
        "http://localhost:5000/api/enrollments",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      console.log("Enrollment response:", response.data)

      setEnrolledCount(response.data.enrollments.length)
    } catch (error) {
      console.error(error)
    }
  }

  fetchEnrollments()
}, [])


  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">
          Please log in to view your profile.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">

      {/* Header */}
      <section className="max-w-4xl mx-auto text-center">
        <div className="mx-auto w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center">
          <span className="text-3xl font-bold text-white">
            {user.name?.charAt(0).toUpperCase()}
          </span>
        </div>

        <h1 className="mt-5 text-3xl font-bold text-gray-800">
          {user.name}
        </h1>

        <p className="mt-2 text-gray-600">
          {user.email}
        </p>
      </section>

      {/* Account Information */}
      <section className="max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-sm p-8">

        <h2 className="text-2xl font-bold text-gray-800">
          Account Information
        </h2>

        <div className="mt-6 space-y-5">

          <div>
            <p className="text-sm text-gray-500">
              Full Name
            </p>
            <p className="mt-1 text-gray-800 font-medium">
              {user.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Email Address
            </p>
            <p className="mt-1 text-gray-800 font-medium">
              {user.email}
            </p>
          </div>

        </div>
      </section>

      {/* Learning Information */}
      <section className="max-w-4xl mx-auto mt-8 grid md:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-sm text-gray-500">
            Enrolled Courses
          </p>

        <p className="mt-2 text-3xl font-bold text-blue-600">
  {enrolledCount}
</p>

          <p className="mt-2 text-gray-600">
            Your enrolled courses will appear here.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-sm text-gray-500">
            Learning Progress
          </p>

          <p className="mt-2 text-3xl font-bold text-blue-600">
            —
          </p>

          <p className="mt-2 text-gray-600">
            Your overall learning progress will appear here.
          </p>
        </div>

      </section>

    </div>
  )
}

export default Profile
