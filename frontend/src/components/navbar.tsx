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
    <div className="bg-transparent">
      <div className="container mx-auto px-4">
        <nav className="h-20 flex items-center justify-center">
          <ul className="flex items-center space-x-12">
            {businessSections.map((item) => (
              <li key={item.title}>
                <a
                  href={item.url}
                  className="flex flex-col items-center justify-center font-bold text-sm tracking-wide"
                >
                  <item.icon className="h-6 w-6 mb-1" />
                  <span>{item.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}


