function Filter({category,setCategory}){
return(
    <div className="flex justify-center gap-3 mb-10 flex-wrap">
        <button 
        onClick={()=>setCategory("Web Development")}
        className="px-4 py-2 bg-gray-200 rounded-lg">Web Development
        </button>

        <button
        onClick={()=>setCategory("Programming")}
        className="px-4 py-2 bg-gray-200 rounded-lg">Programming</button>

        <button
        onClick={()=>setCategory("Database")}
        className="px-4 py-2 bg-gray-200 rounded-lg">Database</button>
    </div>
)
}

export default Filter