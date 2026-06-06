import {
  Bell,
  UserCircle,
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">

      <h2 className="font-semibold">
        Procurement ERP
      </h2>

      <div className="flex items-center gap-4">

        <Bell size={20} />

        <UserCircle size={32} />

      </div>

    </header>
  );
}