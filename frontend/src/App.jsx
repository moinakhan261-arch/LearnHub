import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Courses from "./pages/Courses"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Profile from "./pages/Profile"
import Settings from "./pages/Settings"
import CourseDetails from "./pages/CourseDetails"
import Learning from "./pages/Learning"
import MyLearning from "./pages/MyLearning"
import QuizResult from "./pages/QuizResult"
import Login from "./pages/Login"
import Register from "./pages/Register"

import Dashboard from "./pages/Dashboard"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    

    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id/" element={<CourseDetails />} />
        <Route path="/courses/:id/learn" element={<Learning />} />
        <Route path="/my-learning" element={<MyLearning />} />
        <Route
  path="/quiz-result/:courseId"
  element={<QuizResult />}
/>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register/>} />
         <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App