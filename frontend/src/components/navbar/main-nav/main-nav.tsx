import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ChevronDown, ChevronUp } from "lucide-react";

import MainNavLinkDropdown from "./main-nav-link-dropdown";
import MainNavForm from "./main-nav-form";
import wa_link from "@/utils/wa-link";
import { PHONE } from "../../../../data/phone-data";

const mainNavItems = [
  { title: "HOME", url: "/" },
  { title: "EVENTS", url: "/food#events" },
  { title: "ABOUT US", url: "/about" }, 
  {
    title: "BOOKINGS",
    url: "#",
    type: "form", 
  },
  {
    title: "SERVICE",
    url: "#",
    children: [
      { title: "Banquet Hall", url: "/" },
      { title: "Book a Table", url: "/food" },
      { title: "Events", url: "/food#events" },
    ],
  },
  { title: "SUPPORT", url: wa_link("Hi, I ran into an issue: ", PHONE["technical"]), isExternal: true },
];

export default function MainNav() {

  const location = useLocation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const isBakeryPage = location.pathname.includes("/bakery");
  const bgColor = isBakeryPage ? "bg-[#DE4243]" : "bg-[#002a3a]";

  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

 
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={navRef}
      className={`${bgColor} text-white px-10 py-4 w-screen top-0 z-50 sticky`}
    >
      <div className="container mx-auto flex items-center h-full relative z-50">
        <div className="absolute -left-6 top-1/2 -translate-y-1/2 md:hidden">
          <SidebarTrigger />
        </div>

        <div className="flex-1 flex justify-center lg:justify-start">
          <img src="/biva-main-logo.webp" className="w-10 scale-[200%] h-auto" />
        </div>

        <ul className="hidden lg:flex space-x-6 outfit font-bold relative z-50">
          {mainNavItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <li key={index} className="relative">
                {item.children || item.type === "form" ? (
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="flex items-center gap-1 hover:underline focus:outline-none"
                  >
                    {item.title}
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                ) : item.isExternal ? (
                  <a href={item.url} className="hover:underline" target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                ) : (
                  <Link to={item.url} className="hover:underline">
                    {item.title}
                  </Link>
                )}

            
                {item.children && isOpen && (
                  <MainNavLinkDropdown items={item.children} /> 
                )}

              
                {item.type === "form" && isOpen && (
                  <MainNavForm />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}