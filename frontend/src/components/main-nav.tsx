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
    <div className="bg-[#002a3a] text-white px-10 py-4 w-screen top-0 z-50 sticky">
      <div className="container mx-auto flex items-center h-full">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 md:hidden">
          <SidebarTrigger />
        </div>

        <div className="flex-1 flex justify-center lg:justify-start">
          <div className="text-lg font-bold">THE BIVA</div>
        </div>

        <ul className="hidden lg:flex space-x-6 outfit font-bold">
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
