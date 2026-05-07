/**
 * @file index.tsx  (components/sidebar)
 * @description Collapsible side navigation bar rendered on every page.
 *              Marked "use client" because it maintains local collapsed/expanded
 *              state via `useState` and reads the current pathname with `usePathname`.
 *
 *              Behaviour:
 *              - Collapsed (default): 64px wide — shows only icons.
 *              - Expanded            : 256px wide — shows icons + labels.
 *              - The active route is highlighted with a blue background.
 *              - Bottom section contains placeholder Help and Logout buttons.
 */

"use client";

import Image from "next/image";
import logo from "@/assets/logo.webp";
import { useState } from "react";
import { navigationItems } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HelpCircle, LogOut, Menu } from "lucide-react";

/**
 * Sidebar
 *
 * A fixed-height (100vh) collapsible navigation panel.
 * The collapse state is toggled by the hamburger (Menu) icon button.
 * Navigation items are driven by the `navigationItems` constant so adding
 * a new route only requires updating that single array.
 *
 * Active link detection: the current pathname is compared against each item's
 * `href` to apply the highlighted style.
 */
const Sidebar = () => {
  /** Controls whether the sidebar is in its narrow (icon-only) or wide (icon+label) state. */
  const [isCollapsed, setIsCollapsed] = useState(true);

  /** Current route pathname — used to highlight the active navigation link. */
  const path = usePathname();

  return (
    <aside
      className={`bg-zinc-900 border-r border-zinc-800 flex flex-col transition-all duration-300 h-screen ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* ── Logo section ────────────────────────────────────────────────────── */}
      <div
        className={`p-6 border-b border-zinc-800 h-21 ${isCollapsed ? "px-4" : ""}`}
      >
        <div className="flex items-center justify-between">
          {/* Brand logo — shows wordmark next to the icon when expanded */}
          <div
            className={`bg-white rounded-full ${!isCollapsed ? "flex items-center gap-1" : ""}`}
          >
            <Image
              src={logo}
              alt="logo"
              width={40}
              height={40}
              className="size-[30px]"
            />
            {/* Wordmark is hidden in collapsed mode to save horizontal space */}
            {!isCollapsed && (
              <h1
                className="text-zinc-900 md:text-lg 
           font-semibold pe-3 font-mono"
              >
                Rudder
              </h1>
            )}
          </div>

          {/* Hamburger toggle button — expands/collapses the sidebar */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      {/* ── Navigation links ─────────────────────────────────────────────────── */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item, key) => (
          <Link
            href={item.href}
            key={key}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
              item.href === path
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"  // Active route style
                : "text-gray-300 hover:text-white hover:bg-zinc-600"      // Inactive route style
            } ${isCollapsed ? "justify-center" : ""}`}
          >
            {/* Icon is always visible regardless of collapse state */}
            {<item.icon className="size-5 flex-shrink-0" />}

            {/* Label is hidden in collapsed mode */}
            {!isCollapsed && (
              <span className="whitespace-nowrap">{item.label}</span>
            )}
          </Link>
        ))}
      </nav>

      {/* ── Footer actions ───────────────────────────────────────────────────── */}
      <div className="p-4 border-t border-zinc-800 space-y-2">
        {/* Help button — functionality to be implemented */}
        <button
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition text-gray-400 hover:text-white hover:bg-zinc-800 w-full ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <HelpCircle className="size-5 flex-shrink-0" />

          {!isCollapsed && <span>Help</span>}
        </button>

        {/* Logout button — styled with a red hover state for visual clarity */}
        <button
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition text-gray-400 hover:text-red-400 hover:bg-red-950/20 w-full ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <LogOut className="size-5 flex-shrink-0" />

          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
