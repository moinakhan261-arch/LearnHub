
import { useState } from "react"

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setSubmitted(false)

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log("Contact form submitted:", formData)

    setSubmitted(true)

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">

      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600">
          Contact Us
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          Have a question or need help? Get in touch with LearnHub.
        </p>
      </section>

      {/* Contact Content */}
      <section className="max-w-6xl mx-auto mt-12 grid md:grid-cols-2 gap-8">

        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Get in Touch
          </h2>

          <p className="mt-4 text-gray-600 leading-relaxed">
            Whether you have a question about a course, your account,
            enrollment, or your learning experience, we're here to help.
          </p>

          <div className="mt-8 space-y-6">

            <div>
              <h3 className="font-semibold text-gray-800">
                Email
              </h3>
              <p className="mt-1 text-gray-600">
                support@learnhub.com
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">
                Support
              </h3>
              <p className="mt-1 text-gray-600">
                We aim to provide helpful support for your learning journey.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">
                Response Time
              </h3>
              <p className="mt-1 text-gray-600">
                We'll get back to you as soon as possible.
              </p>
            </div>

          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subject
              </label>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is your question about?"
                required
                className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                rows="5"
                required
                className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {submitted && (
              <p className="text-green-600 text-sm font-medium">
                Your message has been submitted successfully. We'll get back
                to you soon.
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Send Message
            </button>

          </form>
        </div>

      </section>

      {/* FAQ */}
      <section className="max-w-5xl mx-auto mt-16">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Frequently Asked Questions
        </h2>

        <div className="mt-8 space-y-4">

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-800">
              How do I enroll in a course?
            </h3>
            <p className="mt-2 text-gray-600">
              Open the course you are interested in and select the
              enrollment option available on the course details page.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-800">
              Where can I find my enrolled courses?
            </h3>
            <p className="mt-2 text-gray-600">
              Your enrolled courses are available in the My Learning
              section of your account.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-800">
              Can I continue a course later?
            </h3>
            <p className="mt-2 text-gray-600">
              Yes. You can return to My Learning and use Continue Learning
              to access your enrolled course.
            </p>
          </div>

        </div>
      </section>

    </div>
  )
}

export default Contact

