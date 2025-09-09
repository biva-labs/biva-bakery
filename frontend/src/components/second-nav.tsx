import { Link, useLocation } from "react-router-dom";

const secondNavItems = [
  { title: "HOTEL", url: "/" },
  { title: "FOOD COURT", url: "/food" },
  { title: "BAKERY", url: "/bakery" },
];

export function SecondNavbar() {
  const location = useLocation();

  return (
    <div className="bg-transparent z-20 top-18 sticky w-full">
      <div className="flex justify-center w-full px-2 md:px-8">
        <nav className="h-14 flex items-center w-full">
          <ul className="flex w-full gap-4">
            {secondNavItems.map((item, key) => (
              <li key={key} className="flex-1">
                <Link
                  to={item.url}
                  className={`
                    block text-center w-full h-full
                    py-2 text-sm md:text-base font-semibold
                    bg-white/30 border border-white/30 shadow-lg
                    backdrop-blur-2xl saturate-150
                    hover:bg-white/60 hover:text-black transition
                    rounded-xl
                    ${location.pathname === item.url ? "bg-white/70 text-black shadow-xl" : ""}
                  `}
                  style={{
                    boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10), 0 1.5px 4px 0 rgba(255,255,255,0.10) inset",
                  }}
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