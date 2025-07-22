import React from "react";
import { IconPackage, IconUsers, IconShoppingCart, IconTrendingUp } from "@tabler/icons-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, changeType, icon }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          <p className={`text-sm ${changeType === "positive" ? "text-green-600" : "text-red-600"}`}>{change} vs last month</p>
        </div>
        <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center">{icon}</div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: "Total Products",
      value: "124",
      change: "+12%",
      changeType: "positive" as const,
      icon: <IconPackage className="h-6 w-6 text-gray-600" />,
    },
    {
      title: "Total Orders",
      value: "1,234",
      change: "+8%",
      changeType: "positive" as const,
      icon: <IconShoppingCart className="h-6 w-6 text-gray-600" />,
    },
    {
      title: "Active Users",
      value: "89",
      change: "+3%",
      changeType: "positive" as const,
      icon: <IconUsers className="h-6 w-6 text-gray-600" />,
    },
    {
      title: "Revenue",
      value: "$12,345",
      change: "+15%",
      changeType: "positive" as const,
      icon: <IconTrendingUp className="h-6 w-6 text-gray-600" />,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to Restoku admin panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} title={stat.title} value={stat.value} change={stat.change} changeType={stat.changeType} icon={stat.icon} />
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((order) => (
              <div key={order} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">#{order}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Order #{order}00{order}
                    </p>
                    <p className="text-sm text-gray-500">Customer Name {order}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">${(order * 25).toFixed(2)}</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
