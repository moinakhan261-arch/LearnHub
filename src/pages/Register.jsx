import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setError(data.message)
        return
      }

      setSuccess("Registration successful!")

      setTimeout(() => {
        navigate("/login")
      }, 1000)

    } catch (error) {
      console.error(error)
      setError("Unable to connect to server")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Create LearnHub Account
        </h1>

        {error && (
          <p className="mb-4 text-center text-red-500">
            {error}
          </p>
        )}

        {success && (
          <p className="mb-4 text-center text-green-500">
            {success}
          </p>
        )}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
        />

        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          Register
        </button>

      </div>
    </div>
  )
}

export default Register
