import Filter from "../components/Filter"
import CourseList from "../components/CourseList"
import SearchBar from "../components/SearchBar"
import { useState } from "react"

function Courses() {
  const [search,setSearch] = useState("")
  const [category,setCategory] =useState("All")
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <h1 className="text-4xl font-bold text-blue-600 text-center mb-4">
        Our Courses
      </h1>

      <p className="text-center text-gray-600 mb-8">
        Explore our courses and start learning.
      </p>

      <div className="mb-16">
        <SearchBar search={search} setSearch={setSearch}/>

        <Filter category={category} setCategory={setCategory}/>
      </div>

      <CourseList search={search} category={category} />

    </div>
  )
}

export default Courses