import { IoSearchSharp } from "react-icons/io5";

function SearchInput() {
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
      />
      <button className="btn btn-circle bg-blue-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </div>
  );
}

export default SearchInput;
