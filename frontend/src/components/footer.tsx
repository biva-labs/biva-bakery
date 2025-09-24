import { Input } from "./ui/input";
import { Button } from "@radix-ui/themes";
import { Home, Menu, Info, Phone, Briefcase, Star, type LucideProps } from "lucide-react";

type FooterLinksType = {
  href: string;
  label: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
};

const quickLinks: FooterLinksType[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/menu", label: "Menu", icon: Menu },
  { href: "/about", label: "About Us", icon: Info },
  { href: "/contact", label: "Contact", icon: Phone },
  { href: "/careers", label: "Careers", icon: Briefcase },
  { href: "/rate-us", label: "Rate Us", icon: Star },
];

export default function Footer() {
  return (
    <footer className="bg-[#fefce8] text-[#5c3d2e] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8">
 
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-4xl font-extrabold outfit mb-4 tracking-wide">Biva Bakery</h2>
          <p className="text-sm max-w-xs">
            Freshly baked happiness every day! Visit us for cakes, pastries, and more.
          </p>
        </div>

     
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-xl font-semibold mb-4">Subscribe to our Newsletter</h3>
          <p className="text-sm mb-4">Get updates on new products and offers.</p>
          <div className="flex flex-col w-full sm:flex-row gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border border-[#5c3d2e] rounded-full w-full focus:outline-none h-10 focus:ring-2 focus:ring-[#e0c7b7]"
            />
            <Button className="px-6 py-2 bg-[#5c3d2e] text-[#fefce8] rounded-full hover:bg-[#a67c52] transition-colors duration-300">
              Subscribe
            </Button>
          </div>
        </div>

  
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-base">
            {quickLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                className="flex items-center gap-2 hover:opacity-75 transition-opacity duration-200"
              >
                <Icon className="h-5 w-5" />
                {label}
              </a>
            ))}
          </div>
        </div>


        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-xl font-semibold mb-4">Contact & Support</h3>
          <address className="space-y-2 text-sm not-italic">
            <p>📍 Station Road, Silchar, Assam</p>
            <p>📞 +91 98765 43210</p>
            <p>📧 contact@bivabakery.com</p>
          </address>
          <a
            href="/complaint"
            className="mt-4 inline-block text-sm font-semibold hover:opacity-75 transition-opacity duration-200"
          >
            Raise a Complaint &rarr;
          </a>
        </div>
      </div>

 
      <div className="border-t border-[#e0c7b7] mt-12 pt-6 text-center text-sm px-6">
        <p className="opacity-75">© {new Date().getFullYear()} Biva Bakery. All rights reserved.</p>
      </div>
    </footer>
  );
}
