
function Settings() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Settings
        </h1>

        <p className="text-gray-500 mb-8">
          Manage your account and preferences.
        </p>

        {/* Account */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Account
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium text-gray-800">
                Moina Khan
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-800">
                Your email
              </p>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Preferences
          </h2>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">
                Email Notifications
              </p>

              <p className="text-sm text-gray-500">
                Receive updates about your courses.
              </p>
            </div>

            <input
              type="checkbox"
              className="w-5 h-5"
            />
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Security
          </h2>

          <button className="border border-blue-600 text-blue-600 px-5 py-2 rounded-lg hover:bg-blue-50">
            Change Password
          </button>
        </div>

        {/* Logout */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Account Actions
          </h2>

          <button className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700">
            Logout
          </button>
        </div>

      </div>

    </div>
  )
}

export default Settings
