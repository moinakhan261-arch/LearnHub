
function SearchBar({ search, setSearch }) {
  return (
    <div className="w-full">
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        Search Courses
      </label>

      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search by course name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
        />
      </div>
    </div>
  )
}

export default SearchBar

