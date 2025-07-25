import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Moon, Settings, SquareMenu, User } from "lucide-react";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/providers/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Navbar() {
  return (
    <nav className="p-4 flex items-center justify-between">
      {/* <nav className="p-4 flex items-center justify-between"></nav> */}
      {/* LEFt */}
      {/* collapseButton */}
      <SidebarTrigger />
      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* <Link to="/">Dashboard</Link> */}
        {/* <Moon /> */}
        <ModeToggle />
      </div>
    </nav>
  );
}
