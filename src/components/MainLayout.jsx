import React, { useState, useEffect } from "react";
import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";
import { Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    let shouldShowSplash = false;

    try {
      const alreadyVisited = localStorage.getItem("visited");
      if (!alreadyVisited) {
        localStorage.setItem("visited", "true");
        shouldShowSplash = true;
      } else if (location.pathname === "/") {
        shouldShowSplash = true;
      }
    } catch (err) {
      console.warn("localStorage not available:", err);
    }

    if (shouldShowSplash) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000); // time splash is visible
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [location.pathname]);

  return (
    <div className="relative">
      {/* Actual homepage layout */}
      <div>
        <PublicHeader />
        <main>
          <Outlet />
        </main>
        <PublicFooter />
      </div>

      {/* Splash overlay */}
      {loading && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ backgroundColor: "#1E2A78", zIndex: 50 }}
        >
          <img
            src="/logo192.png"
            alt="GiiTech Logo"
            className="w-28 h-28 animate-bounce drop-shadow-lg"
          />
          <p className="mt-4 text-lg font-semibold text-white animate-pulse">
            Loading GiiTech...
          </p>
        </div>
      )}
    </div>
  );
}
