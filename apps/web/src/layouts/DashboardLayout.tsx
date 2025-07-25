import React from "react";
import { AppSidebar, Navbar } from "./components";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { SidebarTrigger } from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarProvider>
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="p-4 overflow-y-auto">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
