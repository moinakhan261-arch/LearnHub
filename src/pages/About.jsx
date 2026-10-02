
function About() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">

      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600">
          About LearnHub
        </h1>

        <p className="mt-5 text-lg text-gray-600 leading-relaxed">
          LearnHub is a learning platform designed to help students and
          aspiring developers learn practical skills, practice what they
          learn, and grow with confidence.
        </p>
      </section>

      {/* Mission */}
      <section className="max-w-5xl mx-auto mt-16 bg-white rounded-2xl shadow-sm p-8 md:p-10">
        <h2 className="text-2xl font-bold text-gray-800">
          Our Mission
        </h2>

        <p className="mt-4 text-gray-600 leading-relaxed">
          Our mission is to make technical learning more structured,
          practical, and accessible. LearnHub focuses on helping learners
          understand concepts, practice their skills, and build the
          confidence needed to apply their knowledge in real projects.
        </p>
      </section>

      {/* Why LearnHub */}
      <section className="max-w-5xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Why LearnHub?
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mt-8">

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800">
              Practical Learning
            </h3>
            <p className="mt-3 text-gray-600">
              Learn concepts with a focus on practical understanding and
              real development skills.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800">
              Structured Courses
            </h3>
            <p className="mt-3 text-gray-600">
              Follow organized lessons that make learning easier to
              understand and continue.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800">
              Learn at Your Pace
            </h3>
            <p className="mt-3 text-gray-600">
              Learn whenever you want and continue from where you
              previously stopped.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800">
              Progress Focused
            </h3>
            <p className="mt-3 text-gray-600">
              Track your learning journey and gradually build your
              knowledge through consistent practice.
            </p>
          </div>

        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto mt-16 bg-white rounded-2xl shadow-sm p-8 md:p-10">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          How LearnHub Works
        </h2>

        <div className="grid md:grid-cols-4 gap-6 mt-8 text-center">

          <div>
            <div className="text-3xl font-bold text-blue-600">1</div>
            <h3 className="mt-3 font-semibold text-gray-800">
              Browse
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Explore available courses.
            </p>
          </div>

          <div>
            <div className="text-3xl font-bold text-blue-600">2</div>
            <h3 className="mt-3 font-semibold text-gray-800">
              Enroll
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Choose a course and start learning.
            </p>
          </div>

          <div>
            <div className="text-3xl font-bold text-blue-600">3</div>
            <h3 className="mt-3 font-semibold text-gray-800">
              Learn
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Work through lessons and practice.
            </p>
          </div>

          <div>
            <div className="text-3xl font-bold text-blue-600">4</div>
            <h3 className="mt-3 font-semibold text-gray-800">
              Grow
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Build skills and track your progress.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto mt-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Ready to Start Learning?
        </h2>

        <p className="mt-3 text-gray-600">
          Explore LearnHub courses and start building your skills today.
        </p>
      </section>

    </div>
  )
}

export default About
