import React from "react";
import { AppSidebar, Navbar } from "./components";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";
// import { SidebarTrigger } from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
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
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                {/* <SectionCards /> */}
                <div className="px-4 lg:px-6">{/* <ChartAreaInteractive /> */}</div>
                {/* <DataTable data={data} /> */}
              </div>
            </div>
          </div>

          <main className="p-4 overflow-y-auto">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
