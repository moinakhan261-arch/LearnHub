import { useState } from "react"
import { useNavigate } from "react-router-dom"
function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error,setError] = useState("")
  const navigate = useNavigate()
  const handleLogin = async (e) => {
  e.preventDefault()
setError("")
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    const data = await response.json()
if (!response.ok){
  setError(data.message)
  return
}
    console.log(data)
    localStorage.setItem("token", data.token)
localStorage.setItem("user", JSON.stringify(data.user))
navigate("/dashboard")
  } catch (error) {
    console.error(error)
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Login to LearnHub
        </h1>

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
{error && (
  <p className="mb-4 text-center text-red-500">
    {error}
  </p>
)}
        <button
  onClick={handleLogin}
  className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
>
          Login
        </button>

      </div>
    </div>
  )
}

export default Login