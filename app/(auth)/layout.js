"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = checking

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  return <>{children}</>;
}
