import { Link } from "react-router-dom"

type MainNavLinkDropdownType = {
    title: string;
    url: string;
}

type MainNavLinkDropdownProps = {
  items: MainNavLinkDropdownType[];
};

export default function MainNavLinkDropdown({ items }: MainNavLinkDropdownProps) {
  return (
    <ul className="absolute left-0 mt-2 w-52 bg-white text-black rounded-lg shadow-lg transition-all duration-200 z-50">
      {items.map((child, i) => (
        <li key={i}>
          <Link
            to={child.url}
            className="block px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg"
          >
            {child.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
