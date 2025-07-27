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
