import React from "react";
import { AppSidebar, Navbar } from "./components";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";
import { CMSProvider } from "@/contexts/CMSContext";
// import { SidebarTrigger } from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <CMSProvider>
      <div className="flex h-screen overflow-hidden">
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          {/* Sidebar */}
          {/* <AppSidebar variant="inset" /> */}
          <AppSidebar />

          {/* Main Content */}
          <div className="flex flex-col flex-1">
            <SiteHeader />
            {/* <Navbar /> */}

            <main className="p-4 overflow-y-auto">{children}</main>
          </div>
        </SidebarProvider>
      </div>
    </CMSProvider>
  );
};

export default DashboardLayout;
