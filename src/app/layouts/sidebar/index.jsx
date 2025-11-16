// src/app/layouts/Sidebar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import {
  FiHome,
  FiFileText,
  FiCreditCard,
  FiBox,
  FiLayers,
  FiGlobe,
  FiDatabase,
  FiShoppingCart,
  FiGrid,
  FiChevronRight,
  FiChevronDown,
} from "react-icons/fi";



const items = [
  { key: "dashboard", label: "Dashboard", Icon: FiHome, to: "/dashboard" },
  { key: "bills", label: "Bills & Payments", Icon: FiFileText, to: "/bills" },
  { key: "credit", label: "Credit & Packs", Icon: FiCreditCard, to: "/credit" },
  {
    key: "service",
    label: "Service Management",
    Icon: FiLayers,
    children: [
      { key: "svc-1", label: "Create Service", to: "/services/create" },
      { key: "svc-2", label: "Manage Services", to: "/services/manage" },
    ],
  },
  { key: "roaming", label: "Roaming", Icon: FiGlobe, to: "/roaming" },
  { key: "logs", label: "Logs & Records", Icon: FiDatabase, to: "/logs" },
  { key: "pos", label: "POS", Icon: FiShoppingCart, to: "/pos" },
  { key: "kcp", label: "KCP Management", Icon: FiGrid, to: "/kcp" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState({});
  const location = useLocation();

  const toggleKey = (key) => {
    setOpenKeys((s) => ({ ...s, [key]: !s[key] }));
  };

  const isActive = (to) => {
    if (!to) return false;
    return location.pathname === to || location.pathname.startsWith(to + "/");
  };

  return (
    <aside
      className={`h-screen sticky top-0 ${collapsed ? "w-20" : "w-72"} transition-all bg-gradient-to-b from-white to-gray-50 border-r border-gray-100 overflow-y-auto`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="bg-purple-600 rounded-md p-1">
              <FiHome className="h-6 w-6 text-white" />
            </div>
            {!collapsed && (
              <div>
                <div className="text-sm font-bold text-gray-900">axentec</div>
                <div className="text-xs text-gray-400">by robi axiata</div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="p-1 rounded-md hover:bg-gray-100"
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <FiChevronRight /> : <FiChevronLeftIconFallback />}
          </button>
        </div>
      </div>

      <nav className="px-2 py-3">
        {items.map((it) => {
          const hasChildren = !!it.children;
          const active = isActive(it.to);
          const open = openKeys[it.key];

          return (
            <div key={it.key} className="mb-1">
              <div
                className={`flex items-center gap-3 cursor-pointer select-none px-3 py-2 rounded-lg transition-colors
                ${active ? "bg-purple-50 border-l-4 border-purple-600" : "hover:bg-gray-100"}
                ${collapsed ? "justify-center" : ""}`}
              >
                {/* icon + clickable */}
                <div className={`text-gray-600 ${active ? "text-purple-600" : ""}`}>
                  {/* If collapsed, show icon as Link so clicking navigates for items without children */}
                  {!collapsed && (
                    <it.Icon className="h-5 w-5" />
                  )}
                  {collapsed && !hasChildren && (
                    <Link to={it.to} aria-label={it.label}>
                      <it.Icon className="h-5 w-5" />
                    </Link>
                  )}

                  {/* if collapsed and has children, still show icon but no submenu */}
                  {collapsed && hasChildren && <it.Icon className="h-5 w-5" />}
                </div>

                {!collapsed && (
                  <>
                    <div className="flex-1">
                      {hasChildren ? (
                        <div className="flex items-center justify-between">
                          <button onClick={() => toggleKey(it.key)} className="w-full text-left flex items-center justify-between">
                            <span className={`text-sm font-medium ${active ? "text-purple-700" : "text-gray-700"}`}>{it.label}</span>
                            <span className="ml-2">
                              {open ? <FiChevronDown className="text-gray-400" /> : <FiChevronRight className="text-gray-400" />}
                            </span>
                          </button>
                        </div>
                      ) : (
                        <Link to={it.to} className={`text-sm font-medium ${active ? "text-purple-700" : "text-gray-700"}`}>
                          {it.label}
                        </Link>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* children */}
              {hasChildren && !collapsed && open && (
                <div className="mt-1 pl-10 pr-3">
                  {it.children.map((c) => (
                    <Link
                      key={c.key}
                      to={c.to}
                      className={`block text-sm py-2 px-2 rounded-md hover:bg-gray-100 ${isActive(c.to) ? "bg-gray-100 font-semibold text-purple-700" : "text-gray-700"}`}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="mt-auto px-4 py-6">
        {!collapsed ? (
          <button className="w-full bg-white text-sm border border-gray-200 rounded-lg px-3 py-2 flex items-center justify-between shadow-sm hover:bg-gray-50">
            <span className="text-gray-700">Explore All Services</span>
            <FiChevronRight className="text-gray-400" />
          </button>
        ) : (
          <button className="w-full bg-white text-sm border border-gray-200 rounded-lg p-2 flex items-center justify-center shadow-sm hover:bg-gray-50">
            <FiChevronRight className="text-gray-400" />
          </button>
        )}
      </div>
    </aside>
  );
}

/**
 * FiChevronLeft is not imported from react-icons above to keep imports small.
 * We'll add a very small fallback icon component for the left chevron.
 */
function FiChevronLeftIconFallback(props) {
  return (
    <svg {...props} className={`h-5 w-5 text-gray-600 ${props.className || ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 18l-6-6 6-6" />
    </svg>
  );
}

