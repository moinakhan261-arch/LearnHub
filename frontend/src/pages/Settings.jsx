
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Settings() {
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [notifications, setNotifications] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (!token) {
      navigate("/login")
      return
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    const savedNotifications =
      localStorage.getItem("emailNotifications")

    if (savedNotifications === "true") {
      setNotifications(true)
    }
  }, [navigate])

  const handleNotifications = (event) => {
    const value = event.target.checked

    setNotifications(value)

    localStorage.setItem(
      "emailNotifications",
      value.toString()
    )
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    navigate("/login")
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">

        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>

          <p className="mt-4 text-sm text-gray-500">
            Loading settings...
          </p>

        </div>

      </div>
    )
  }

  const initial =
    user.name?.charAt(0).toUpperCase() || "U"

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">

      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            LearnHub
          </p>

          <h1 className="mt-1 text-3xl font-extrabold text-gray-900">
            Settings
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your account and learning preferences.
          </p>

        </div>

        {/* Account */}
        <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">

          <div className="flex items-center gap-4 border-b border-gray-100 pb-6">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
              {initial}
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Account
              </h2>

              <p className="text-sm text-gray-500">
                Your LearnHub account information.
              </p>
            </div>

          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">

            <div className="rounded-xl bg-gray-50 p-5">

              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Name
              </p>

              <p className="mt-2 font-semibold text-gray-800">
                {user.name}
              </p>

            </div>

            <div className="rounded-xl bg-gray-50 p-5">

              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Email
              </p>

              <p className="mt-2 break-all font-semibold text-gray-800">
                {user.email}
              </p>

            </div>

          </div>

        </section>

        {/* Preferences */}
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8">

          <div className="border-b border-gray-100 pb-5">

            <h2 className="text-xl font-bold text-gray-900">
              Preferences
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Customize how you use LearnHub.
            </p>

          </div>

          <div className="mt-6 flex items-center justify-between gap-5">

            <div>

              <p className="font-semibold text-gray-800">
                Email Notifications
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Receive updates about your courses and learning activity.
              </p>

            </div>

            <label className="relative inline-flex cursor-pointer items-center">

              <input
                type="checkbox"
                checked={notifications}
                onChange={handleNotifications}
                className="peer sr-only"
              />

              <div className="h-6 w-11 rounded-full bg-gray-300 transition peer-checked:bg-blue-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>

            </label>

          </div>

        </section>

        {/* Security */}
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8">

          <div className="border-b border-gray-100 pb-5">

            <h2 className="text-xl font-bold text-gray-900">
              Security
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage your account security.
            </p>

          </div>

          <div className="mt-6">

            <button
              type="button"
              onClick={() =>
                alert(
                  "Password change functionality will be added when the backend password-update API is implemented."
                )
              }
              className="rounded-xl border border-blue-600 px-5 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              Change Password
            </button>

          </div>

        </section>

        {/* Account Actions */}
        <section className="mt-6 rounded-2xl border border-red-100 bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-xl font-bold text-gray-900">
            Account Actions
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Sign out of your LearnHub account on this device.
          </p>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-6 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 active:scale-[0.98]"
          >
            Logout
          </button>

        </section>

      </div>

    </div>
  )
}

export default Settings

