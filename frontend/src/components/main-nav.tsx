import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const mainNavItems = [
  { title: "HOME", url: "/" },
  { title: "EVENTS", url: "/food#events" },
  { title: "ABOUT US", url: "/about" }, // New "ABOUT US" section
  {
    title: "BOOKINGS",
    url: "#",
    type: "form", // 👈 special type for form dropdown
  },
  {
    title: "SERVICE",
    url: "#",
    children: [
      { title: "Banquet Hall", url: "/services/banquet-hall" },
      { title: "Book a Table", url: "/services/book-table" },
      { title: "Events", url: "/services/events" },
    ],
  },
  { title: "SUPPORT", url: "#" },
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

  // 🔑 Close dropdown when clicking outside
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
          <div className="text-lg font-bold">THE BIVA</div>
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
                ) : (
                  <Link to={item.url} className="hover:underline">
                    {item.title}
                  </Link>
                )}

                {/* Dropdown with links */}
                {item.children && isOpen && (
                  <ul className="absolute left-0 mt-2 w-52 bg-white text-black rounded-lg shadow-lg transition-all duration-200 z-50">
                    {item.children.map((child, i) => (
                      <li key={i}>
                        <Link
                          to={child.url}
                          className="block px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg"
                          onClick={() => setOpenIndex(null)}
                        >
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Dropdown with form (BOOKINGS) */}
                {item.type === "form" && isOpen && (
                  <div className="absolute left-0 top-full mt-2 w-64 bg-white text-black rounded-lg shadow-lg p-4 z-50">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        alert("Booking submitted ✅");
                        setOpenIndex(null);
                      }}
                      className="flex flex-col gap-3"
                    >
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        required
                        className="w-full"
                      />
                      <Button type="submit" className="w-full">
                        Submit
                      </Button>
                    </form>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}