"use client";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Navbar({ onToggleSidebar }) {
  const [fullname, setFullname] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem("fullname");
    if (storedName) {
      setFullname(storedName);
    }
  }, []);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullname");
    router.push("/login");
  };

  return (
    <header className="bg-white shadow px-6 py-4 sticky top-0 z-20">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Mobile Hamburger */}
          <button className="md:hidden text-gray-600" onClick={onToggleSidebar}>
            <FaBars size={20} />
          </button>
          <h1 className="text-xl font-bold text-blue-600">Dashboard</h1>
        </div>
        <div className="flex gap-5">
          <div className="text-sm text-gray-500 self-center">
            Welcome, {fullname || "User"}
          </div>
          <button
            onClick={handleLogout}
            className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
