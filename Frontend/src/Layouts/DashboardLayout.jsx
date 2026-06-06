import Navbar from "../Components/Layout/Navbar.jsx";
import Sidebar from "../Components/Layout/Sidebar";

export default function DashboardLayout({
  children,
}) {
  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>

      </div>
    </div>
  );
}