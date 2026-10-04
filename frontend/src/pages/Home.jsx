import { useNavigate } from "react-router-dom";

function Home() {
const navigate = useNavigate();

const categories = [
{
icon: "⚛️",
title: "Web Development",
description: "Build modern websites and interactive user interfaces.",
color: "bg-blue-50",
iconColor: "text-blue-600",
},
{
icon: "💻",
title: "Programming",
description: "Strengthen your coding skills and problem-solving.",
color: "bg-violet-50",
iconColor: "text-violet-600",
},
{
icon: "🗄️",
title: "Databases",
description: "Learn to organize, manage, and work with data.",
color: "bg-indigo-50",
iconColor: "text-indigo-600",
},
];

const benefits = [
{
number: "01",
title: "Learn at Your Pace",
description:
"Explore lessons at your own pace and revisit concepts whenever you need.",
icon: "📚",
},
{
number: "02",
title: "Practice Your Skills",
description:
"Strengthen your understanding through lessons and interactive quizzes.",
icon: "🎯",
},
{
number: "03",
title: "Track Your Progress",
description:
"Keep track of completed lessons and see how far you have progressed.",
icon: "📈",
},
];

return ( <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900">


  {/* Hero Section */}
  <section className="relative isolate overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-violet-950 px-6 py-20 sm:py-28 lg:py-32">

    <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

    <div className="pointer-events-none absolute -bottom-32 -left-20 -z-10 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />

    <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">

      {/* Hero Text */}
      <div className="text-center lg:text-left">

        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-blue-100 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Your journey to better skills starts here
        </div>

        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
          Learn Today.
          <span className="mt-2 block bg-gradient-to-r from-blue-300 via-violet-300 to-purple-300 bg-clip-text text-transparent">
            Grow Tomorrow.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg lg:mx-0">
          Build practical skills, explore modern technologies, and
          move closer to your goals with learning that fits your journey.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">

          <button
            onClick={() => navigate("/courses")}
            className="rounded-xl bg-blue-500 px-7 py-4 font-semibold text-white shadow-lg shadow-blue-500/20 transition duration-300 hover:-translate-y-1 hover:bg-blue-400"
          >
            Explore Courses <span className="ml-2">→</span>
          </button>

          <button
            onClick={() => navigate("/about")}
            className="rounded-xl border border-white/20 bg-white/5 px-7 py-4 font-semibold text-white transition duration-300 hover:bg-white/10"
          >
            Discover LearnHub
          </button>

        </div>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-300 lg:justify-start">
          <span>✓ Learn at your own pace</span>
          <span>✓ Practice with quizzes</span>
        </div>

      </div>

      {/* Decorative Learning Preview */}
      <div className="relative mx-auto w-full max-w-lg">

        <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-blue-500/20 to-violet-500/20 blur-2xl" />

        <div className="relative rounded-3xl border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-xl sm:p-6">

          <div className="flex items-center justify-between border-b border-white/10 pb-5">

            <div>
              <p className="text-sm text-slate-300">
                YOUR LEARNING SPACE
              </p>

              <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                Ready to grow?
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20 text-2xl">
              🎓
            </div>

          </div>

          <div className="mt-5 space-y-4">

            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 transition duration-300 hover:bg-white/15">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-2xl">
                  ⚛️
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-white">
                    React Development
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    Build interactive interfaces
                  </p>
                </div>

                <span className="text-xl text-blue-300">↗</span>

              </div>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 transition duration-300 hover:bg-white/15">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-violet-500/20 text-2xl">
                  💻
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-white">
                    Programming Skills
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    Turn ideas into code
                  </p>
                </div>

                <span className="text-xl text-violet-300">↗</span>

              </div>

            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-blue-500/20 to-violet-500/20 p-5">

              <div className="flex items-center gap-3">

                <span className="text-2xl">🚀</span>

                <div>
                  <p className="font-semibold text-white">
                    Every expert starts from somewhere let us start from basics.
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    Take your next step with LearnHub.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

     <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg">

  <div className="flex items-center gap-3">

    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-xl">
      ✓
    </div>

    <div>
      <p className="font-bold text-slate-800">
        Learn. Practice. Grow.
      </p>

      <p className="text-xs text-slate-500">
        Your progress starts with you
      </p>
    </div>

  </div>

</div>

      </div>

    </div>

  </section>

  {/* Learning Categories */}
  <section className="px-6 py-20 sm:py-24">

    <div className="mx-auto max-w-7xl">

      <div className="mx-auto max-w-2xl text-center">

        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
          Explore your interests
        </p>  

        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Find Your Path to Success
        </h2>

        <p className="mt-5 leading-8 text-slate-600">
          Discover learning opportunities, strengthen your fundamentals,
          and develop skills that you can put into practice.
        </p>

      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">

        {categories.map((category) => (

          <button
            key={category.title}
            onClick={() => navigate("/courses")}
            className="group rounded-3xl border border-slate-200 bg-white p-7 text-left shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/5 sm:p-8"
          >

            <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${category.color} text-3xl transition duration-300 group-hover:scale-110`}>
              <span className={category.iconColor}>
                {category.icon}
              </span>
            </div>

            <h3 className="mt-6 text-xl font-bold text-slate-900">
              {category.title}
            </h3>

            <p className="mt-3 leading-7 text-slate-600">
              {category.description}
            </p>

            <div className="mt-6 flex items-center gap-2 font-semibold text-blue-600">
              Explore courses
              <span className="transition duration-300 group-hover:translate-x-2">
                →
              </span>
            </div>

          </button>

        ))}

      </div>

      <div className="mt-10 text-center">

        <button
          onClick={() => navigate("/courses")}
          className="rounded-xl bg-slate-900 px-7 py-3.5 font-semibold text-white transition duration-300 hover:bg-blue-700"
        >
          View All Courses
        </button>

      </div>

    </div>

  </section>

  {/* Why LearnHub */}
  <section className="border-y border-slate-200 bg-white px-6 py-20 sm:py-24">

    <div className="mx-auto max-w-7xl">

      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

        <div>

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">
            The LearnHub experience
          </p>

          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            Make Every Learning Step Count
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Learning is more than watching lessons. It is about
            understanding concepts, practising what you learn,
            and seeing your skills improve over time.
          </p>

          <button
            onClick={() => navigate("/courses")}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-violet-600/20 transition duration-300 hover:-translate-y-1 hover:bg-violet-700"
          >
            Start Your Journey <span>→</span>
          </button>

        </div>

        <div className="grid gap-5 sm:grid-cols-2">

          {benefits.map((benefit, index) => (

            <div
              key={benefit.number}
              className={`rounded-2xl border border-slate-200 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
                index === 0
                  ? "bg-blue-50/70 sm:col-span-2"
                  : "bg-slate-50"
              }`}
            >

              <div className="flex items-center justify-between">

                <span className="text-2xl">
                  {benefit.icon}
                </span>

                <span className="text-sm font-bold tracking-widest text-slate-400">
                  {benefit.number}
                </span>

              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {benefit.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {benefit.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

  </section>

  {/* Final Call to Action */}
  <section className="px-6 py-20 sm:py-24">

    <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 px-6 py-14 text-center shadow-xl shadow-indigo-950/10 sm:px-12 sm:py-20">

      <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-violet-300/20 blur-3xl" />

      <div className="relative">

        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-100">
          Your future starts now
        </p>

        <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
          Small Steps Today.
          <span className="block mt-2 text-blue-200">
            Bigger Possibilities Tomorrow.
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl leading-8 text-blue-100">
          Choose a course, challenge yourself, and keep growing
          with every lesson.
        </p>

        <button
          onClick={() => navigate("/courses")}
          className="mt-8 rounded-xl bg-white px-8 py-4 font-bold text-indigo-700 shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-blue-50"
        >
          Browse Courses <span className="ml-2">→</span>
        </button>

      </div>

    </div>

  </section>

</main>


);
}

export default Home;
