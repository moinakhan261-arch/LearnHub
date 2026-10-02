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
    <div className="flex gap-6 flex-wrap justify-center px-2 sm:px-4
    ">
      {filteredCourses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
        />
      ))}
    </div>
  )
}

export default CourseList