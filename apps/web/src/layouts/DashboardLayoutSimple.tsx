import React from "react";
import { AppSidebar } from "../components/app-sidebar";

// Simple SidebarProvider without dependencies
const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50">
        <AppSidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
