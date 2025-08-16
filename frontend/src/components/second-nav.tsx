import { Link } from "react-router-dom";

const secondNavItems = [
  {
    title: "HOTEL",
    url: "/",
  },
  {
    title: "FOOD COURT",
    url: "/food",
  },
  {
    title: "BAKERY",
    url: "/bakery",
  },
];

export function SecondNavbar() {
  return (
    <div className="relative bg-transparent z-50">
      <div className="flex justify-center w-full"> {/* Center the nav container */}
        <nav className="h-12 md:h-14 flex items-center">
          <ul className="flex justify-center items-center gap-4">
            {secondNavItems.map((item, key) => (
              <li key={key}>
                <Link
                  to={item.url}
                  className="
                    block text-center whitespace-nowrap
                    bg-white/30 backdrop-blur-3xl
                    border-2 border-black rounded-3xl
                    px-4 py-2 font-bold
                    hover:bg-black hover:text-white transition
                  "
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}