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
    <div className="relative bg-transparent">
      <div className="container px-4 mx-auto">
        <nav className="h-12 md:h-14 flex items-center justify-center">
          <ul className="flex w-full max-w-3xl justify-between items-center gap-4">
            {businessSections.map((item) => (
              <li key={item.title} className="flex-1">
                <a
                  href={item.url}
                  className="
                    w-full block text-center whitespace-nowrap
                    bg-white/30 backdrop-blur-3xl
                    border-2 border-black rounded-3xl
                    px-4 py-2 font-bold text-sm
                    hover:bg-black hover:text-white transition
                  "
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
