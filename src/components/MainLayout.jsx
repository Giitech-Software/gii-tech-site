import React, { useState, useEffect } from "react";
import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";
import GuidedAssistant from "./GuidedAssistant";
import { Outlet, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

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
      }, 2800); // time splash is visible
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
      <GuidedAssistant />

      {/* Splash overlay */}
      {loading && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ backgroundColor: "#1E2A78" }}
        >
          <img
            key={location.pathname}
            src={logo}
            alt="ASTEM Software Labs Logo"
            className="h-28 w-28 animate-bounce object-contain drop-shadow-lg"
          />
          <p className="mt-4 text-lg font-semibold text-white animate-pulse">
            Loading ASTEM Software Labs...
          </p>
        </div>
      )}
    </div>
  );
}
