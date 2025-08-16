import { Link } from "react-router-dom";

import { SidebarTrigger } from "@/components/ui/sidebar";

const mainNavItems = [
  {
    title: "HOME",
    url: "#",
  },
  {
    title: "EVENTS",
    url: "#",
  },
  {
    title: "SERVICE",
    url: "#",
  },
  {
    title: "BOOKINGS",
    url: "#",
  },
  {
    title: "SUPPORT",
    url: "#",
  },
];

export default function MainNav() {
  return (
    <div className="bg-black text-white px-6 py-4 top-0 z-50 sticky">
      <div className="container mx-auto flex items-center h-full">
        {/* Left side - Sidebar Trigger */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 md:hidden">
          <SidebarTrigger />
        </div>

        {/* Center - Brand */}
        <div className="flex-1 flex justify-center lg:justify-start">
          <div className="text-lg font-bold">THE BIVA</div>
        </div>

        {/* Right side - Navigation items (lg screens only) */}
        <ul className="hidden lg:flex space-x-6 ">
          {mainNavItems.map((item, index) => (
            <li key={index}>
              <Link to={item.url} className="hover:underline ">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}