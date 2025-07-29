import { HandPlatter, PackageSearch, Settings, ShoppingCart, Users } from "lucide-react";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";

import { NavUser } from "./nav-user";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { auth_signal } from "@/lib/@preact-signals-react/auth-init-signal";
import { useCMS } from "@/contexts/CMSContext";

// Menu items data

const data = {
  user: {
    name: auth_signal.value.data?.username || "Admin",
    // email: auth_signal.value.data?.email || "",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Products",
      url: "#",
      icon: PackageSearch,
      isActive: true,
      items: [
        {
          title: "Manage Products",
          url: "#products",
          action: "products",
        },
        // {
        //   title: "Categories",
        //   url: "#",
        // },
      ],
    },
    {
      title: "Orders",
      url: "#",
      icon: ShoppingCart,
      items: [
        {
          title: "All Orders",
          url: "#orders",
          action: "orders",
        },
        // {
        //   title: "Order Analytics",
        //   url: "#",
        // },
      ],
    },
    {
      title: "Users",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Manage Users",
          url: "#users",
          action: "users",
        },
        // {
        //   title: "User Roles",
        //   url: "#",
        // },
      ],
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { setActiveTab } = useCMS();

  const handleNavItemClick = (action: string) => {
    if (action === "products" || action === "orders" || action === "users") {
      setActiveTab(action as any);
    }
  };

  // console.log(auth_signal.value.data);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex justify-center gap-2 text-center overflow-hidden">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <HandPlatter className="size-4" />
            </div>
            Restoku
          </a>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} onItemClick={handleNavItemClick} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
