
import { useState } from "react"
import { Link } from "react-router-dom"
import Filter from "../components/Filter"
import CourseList from "../components/CourseList"
import SearchBar from "../components/SearchBar"

function Courses() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* Page Header */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-blue-50 via-white to-violet-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">

        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-violet-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">

          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            LearnHub Academy
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Explore Our
            <span className="mt-2 block bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Courses
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Learn practical skills, strengthen your knowledge, and take
            the next step in your learning journey with LearnHub.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-600">
            <span>✓ Learn at your own pace</span>
            <span>✓ Practice your skills</span>
            <span>✓ Track your progress</span>
          </div>

        </div>
      </section>

      {/* Search and Filter */}
      <section className="relative z-10 mx-auto -mt-6 max-w-6xl px-4 sm:px-6 lg:px-8">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5 sm:p-7">

          <div className="mb-5">
            <h2 className="text-lg font-bold text-slate-900">
              Find Your Next Course
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Search by course name or explore a category.
            </p>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end">

            <div className="min-w-0 flex-1">
              <SearchBar
                search={search}
                setSearch={setSearch}
              />
            </div>

            <div className="w-full lg:w-auto">
              <Filter
                category={category}
                setCategory={setCategory}
              />
            </div>

          </div>

        </div>
      </section>

      {/* Course Collection */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Your learning journey
            </p>

            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Available Courses
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Choose a course and start building practical skills.
            </p>
          </div>

          {(search || category !== "All") && (
            <button
              type="button"
              onClick={() => {
                setSearch("")
                setCategory("All")
              }}
              className="self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:self-auto"
            >
              Clear Filters
            </button>
          )}

        </div>

        {(search || category !== "All") && (
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-600">

            <span>Active filters:</span>

            {search && (
              <span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-700">
                Search: {search}
              </span>
            )}

            {category !== "All" && (
              <span className="rounded-full bg-violet-50 px-3 py-1 font-medium text-violet-700">
                {category}
              </span>
            )}

          </div>
        )}

        <CourseList
          search={search}
          category={category}
        />

        {/* Additional Navigation */}
        <div className="mt-14 rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-violet-50 p-7 text-center sm:p-10">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
            🎓
          </div>

          <h3 className="mt-5 text-xl font-bold text-slate-900 sm:text-2xl">
            Ready to take the next step?
          </h3>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
            Discover what LearnHub has to offer and find the right learning
            path for your goals.
          </p>

          <Link
            to="/about"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            Discover LearnHub
            <span>→</span>
          </Link>

        </div>

      </section>

    </main>
  )
}

export default Courses

