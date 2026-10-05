
import CourseCard from "./CourseCard"
import courses from "../data/courses"

function CourseList({ search, category }) {
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesCategory =
      category === "All" || course.category === category

    return matchesSearch && matchesCategory
  })

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
      {filteredCourses.length > 0 ? (
        filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))
      ) : (
        <div className="col-span-full rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
          <div className="text-4xl">🔍</div>

          <h3 className="mt-4 text-xl font-bold text-slate-900">
            No courses found
          </h3>

          <p className="mt-2 text-slate-600">
            Try another search term or select a different category.
          </p>
        </div>
      )}
    </div>
  )
}

export default CourseList

