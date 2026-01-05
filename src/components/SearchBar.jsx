import { Search, Grid, List } from "lucide-react";

const SearchBar = ({ searchTerm, setSearchTerm, viewMode, setViewMode }) => (
  <div className="flex gap-4 mb-6">
    <div className="relative flex-1">
      <Search className="absolute left-3 top-3 text-gray-400" size={18} />
      <input
        className="w-full pl-10 pr-4 py-2 border rounded-lg"
        placeholder="Search products..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
    </div>

    <button onClick={() => setViewMode("list")} className={viewMode === "list" ? "bg-blue-600 text-white p-2 rounded" : "p-2"}>
      <List size={18} />
    </button>
    <button onClick={() => setViewMode("card")} className={viewMode === "card" ? "bg-blue-600 text-white p-2 rounded" : "p-2"}>
      <Grid size={18} />
    </button>
  </div>
);

export default SearchBar;
