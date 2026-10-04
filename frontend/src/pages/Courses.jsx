
import Filter from "../components/Filter"
import CourseList from "../components/CourseList"
import SearchBar from "../components/SearchBar"
import { useState } from "react"

function Courses() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">

      {/* Page Header */}
      <section className="mx-auto max-w-4xl text-center">

        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          LearnHub Academy
        </p>

        <h1 className="mt-3 text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Explore Our Courses
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
          Learn practical skills, strengthen your knowledge, and take
          the next step in your learning journey.
        </p>

      </section>

      {/* Search & Filter */}
      <section className="mx-auto mt-10 max-w-6xl rounded-2xl bg-white p-5 shadow-sm sm:p-6">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex-1">
            <SearchBar
              search={search}
              setSearch={setSearch}
            />
          </div>

          <div>
            <Filter
              category={category}
              setCategory={setCategory}
            />
          </div>

        </div>

      </section>

      {/* Course Section */}
      <section className="mx-auto mt-12 max-w-6xl">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold text-gray-900">
            Available Courses
          </h2>

          {search && (
            <p className="text-sm text-gray-500">
              Searching for:{" "}
              <span className="font-medium text-gray-700">
                "{search}"
              </span>
            </p>
          )}

        </div>

        <CourseList
          search={search}
          category={category}
        />

      </section>

    </div>
  )
}

export default Courses

