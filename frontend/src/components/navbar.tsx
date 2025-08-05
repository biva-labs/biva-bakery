import { UtensilsCrossed, Cake } from "lucide-react"

const businessSections = [
  {
    title: "HOTEL",
    url: "#",
    icon: Cake,
  },
  {
    title: "FOOD COURT",
    url: "#",
    icon: UtensilsCrossed,
  },
  {
    title: "BAKERY",
    url: "#",
    icon: Cake,
  },
]
export default function Navbar() {
  return (
    <div className=" lg:block bg-gradient-to-r from-yellow-50 to-amber-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <nav className="h-16 flex items-center justify-center">
          <ul className="flex items-center space-x-12">
            {businessSections.map((item) => (
              <li key={item.title}>
                <a
                  href={item.url}
                  className="flex items-center gap-2 text-green-950 hover:text-green-700 transition-colors duration-200 font-bold text-lg tracking-wide"
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}