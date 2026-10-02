function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
        <section className="text-center py-20">
            <h1 className="text-5xl font-bold text-blue-600">
                LearnHub
            </h1>
            <p className="text-xl text-gray-600 mt-4">
                Learn, Practice, Grow.
            </p>

            <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg">
                Explore Courses
            </button>
        </section>

        <section className="bd-white py-16">
            <h2 className="text-3xl font-bold text-center">
                Learn Skills That Matter
            </h2>

            <p className="text-center text-gray-600 mt-3">
                Build your skills through practical learning.
                <br></br>
                Don't wait more big opportunities need just one step to move ahead.
                <br>
                </br>
                Explore our courses and create a valuable recognition. 
            </p>
        </section>
    </div>
  )
}

export default Home