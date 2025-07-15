import { useEffect, useState } from "react";

export default function Loading() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length === 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
   <div className="fixed z-50 h-screen w-screen top-0 left-0  ">
     <p className="text-lg font-medium text-gray-700 select-none">
      Loading{dots}
    </p>
   </div>
  );
}
