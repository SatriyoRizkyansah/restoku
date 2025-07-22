"use client";

import { IconChartBar, IconDashboard, IconDatabase, IconHelp, IconInnerShadowTop, IconListDetails, IconReport, IconSearch, IconSettings, IconUsers } from "@tabler/icons-react";

const data = {
  user: {
    name: "Admin",
    email: "admin@restoku.com",
    avatar: "/avatars/admin.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Products",
      url: "/products",
      icon: IconListDetails,
    },
    {
      title: "Orders",
      url: "/orders",
      icon: IconChartBar,
    },
    {
      title: "Users",
      url: "/users",
      icon: IconUsers,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Help",
      url: "/help",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "/search",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Reports",
      url: "/reports",
      icon: IconReport,
    },
    {
      name: "Analytics",
      url: "/analytics",
      icon: IconDatabase,
    },
  ],
};

export function SimpleSidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <a href="/dashboard" className="flex items-center space-x-2">
          <IconInnerShadowTop className="h-6 w-6 text-blue-600" />
          <span className="text-lg font-semibold text-gray-900">Restoku</span>
        </a>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-6">
        {/* Main Navigation */}
        <div>
          <nav className="space-y-2">
            {data.navMain.map((item) => (
              <a key={item.title} href={item.url} className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.title}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Documents */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Documents</h3>
          <nav className="space-y-1">
            {data.documents.map((item) => (
              <a key={item.name} href={item.url} className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                <item.icon className="h-4 w-4" />
                <span className="text-sm">{item.name}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Secondary Navigation */}
        <div className="mt-auto">
          <nav className="space-y-1">
            {data.navSecondary.map((item) => (
              <a key={item.title} href={item.url} className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                <item.icon className="h-4 w-4" />
                <span className="text-sm">{item.title}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-lg bg-gray-200 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{data.user.name}</p>
            <p className="text-xs text-gray-500 truncate">{data.user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
