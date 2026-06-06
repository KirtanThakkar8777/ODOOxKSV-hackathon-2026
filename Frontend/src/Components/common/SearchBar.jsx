import { Search } from "lucide-react";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
}) => {
  return (
    <div className="relative w-full">
      <Search
        size={18}
        className="absolute left-3 top-3 text-slate-400"
      />

      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
        w-full
        pl-10
        pr-3
        py-2
        border
        rounded-lg
        border-slate-300
        "
      />
    </div>
  );
};

export default SearchBar;