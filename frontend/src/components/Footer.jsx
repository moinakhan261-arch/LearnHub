
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4 border-t border-gray-800">
      <div className="text-center">

        <h2 className="text-2xl font-bold text-blue-400">
          LearnHub
        </h2>

        <p className="text-gray-400 mt-2">
          Learn. Practice. Grow.
        </p>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6">
          <a href="#" className="hover:text-blue-400">
            Courses
          </a>

          <a href="#" className="hover:text-blue-400">
            About
          </a>

          <a href="#" className="hover:text-blue-400">
            Contact
          </a>
        </div>

        <p className="text-gray-500 text-sm mt-6">
          © 2026 LearnHub
        </p>

      </div>
    </footer>
  )
}

export default Footer
