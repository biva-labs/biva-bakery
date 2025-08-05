import { UtensilsCrossed, Cake } from "lucide-react";

const businessSections = [
  {
    title: "HOTEL",
    url: "#",
  },
  {
    title: "FOOD COURT",
    url: "#",
  },
  {
    title: "BAKERY",
    url: "#",
  },
];

export default function Navbar() {
  return (
    <div className="relative">
      <div className="bg-white/30 backdrop-blur-3xl border-b border-white/50 ">
        <div className="bg-transparent">
          <div className="container mx-auto px-4">
            <nav className="h-10 lg:h-14 m-1 flex items-center justify-center">
              <ul className="flex items-center space-x-12">
                {businessSections.map((item) => (
                  <li key={item.title}>
                    <a
                      href={item.url}
                      className="flex flex-col items-center justify-center
                    border-2 border-black
                    rounded-4xl whitespace-nowrap
                    px-2 md:px-10 py-2
                    font-bold text-sm tracking-normal
                    hover:bg-black hover:text-white transition"
                    >
                      <span>{item.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
