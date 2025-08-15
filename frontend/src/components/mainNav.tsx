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
    <div className="bg-black text-white px-6 py-4">
      <div className="relative flex items-center justify-center">
        {/* Sidebar Trigger - left */}
        <div className="absolute left-0 flex items-center">
          <SidebarTrigger className="-ml-1" />
        </div>

        {/* Brand - always center */}
        <div className="text-lg font-bold">THE BIVA</div>

        {/* Nav items - right */}
        <ul className="hidden md:flex absolute right-0 space-x-6">
          {mainNavItems.map((item, index) => (
            <li key={index}>
              <Link to={item.url} className="hover:underline">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
