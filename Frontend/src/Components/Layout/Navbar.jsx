import {
  Bell,
  Search,
  Settings,
} from "lucide-react";

const Navbar = () => {
  return (
    <header
      className="
      h-16
      bg-white
      border-b
      border-slate-200
      flex
      items-center
      justify-between
      px-6
      "
    >
      <div className="relative w-[400px]">
        <Search
          size={18}
          className="absolute left-3 top-3 text-slate-400"
        />

        <input
          placeholder="Search vendors, RFQs, quotations..."
          className="
          w-full
          border
          border-slate-300
          rounded-lg
          pl-10
          pr-3
          py-2
          "
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          className="
          relative
          p-2
          rounded-lg
          hover:bg-slate-100
          "
        >
          <Bell size={20} />

          <span
            className="
            absolute
            top-1
            right-1
            h-2
            w-2
            bg-red-500
            rounded-full
            "
          />
        </button>

        <button
          className="
          p-2
          rounded-lg
          hover:bg-slate-100
          "
        >
          <Settings size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div
            className="
            h-10
            w-10
            rounded-full
            bg-blue-600
            "
          />

          <div>
            <h4 className="font-medium">
              Procurement Admin
            </h4>

            <p className="text-xs text-slate-500">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;