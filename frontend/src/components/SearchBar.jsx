

function SearchBar({search,setSearch}){

    return(
        <div className="flex justify-center mb-10">
        
        <input
  type="text"
  placeholder="Search courses..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
        </div>
    )
}

export default SearchBar