import { Input } from "./ui/input";
import { Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { QUICK_LINKS } from "../../data/footer-data";
import { PHONE } from "../../data/phone-data";
import wa_link from "@/utils/wa-link";

export default function Footer() {
  return (
    <footer className="bg-[#fefce8] text-[#5c3d2e] py-16" id="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

        <div className="lg:col-span-2 flex flex-col items-start text-left">
          <img
            src="/biva-logo.webp"
            alt="Biva Logo"
            className="w-28 max-w-full h-auto mb-4"
          />
          <p className="text-sm max-w-xs mb-4">
            Freshly baked happiness every day! Visit us for cakes, pastries, and
            more.
          </p>

          {/* Newsletter Subscription */}
          <div className="w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-3">
              Subscribe to our Newsletter
            </h3>
            <p className="text-sm mb-3">
              Get updates on new products and offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 border border-[#5c3d2e] rounded-full flex-1 focus:outline-none h-10 focus:ring-2 focus:ring-[#e0c7b7]"
              />
              <Button className="px-6 py-2 bg-[#5c3d2e] text-[#fefce8] rounded-full hover:bg-[#a67c52] transition-colors duration-300 whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>


        <div className="flex flex-col items-start text-left">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {QUICK_LINKS["navigation"].map(({ href, label, icon: Icon, isExternal }) => (
              isExternal ? (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-75 transition-opacity duration-200 text-sm"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </a>
              ) : (
                <Link
                  key={href}
                  to={href}
                  className="flex items-center gap-2 hover:opacity-75 transition-opacity duration-200 text-sm"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              )
            ))}
          </div>
        </div>


        <div className="flex flex-col items-start text-left">
          <h3 className="text-lg font-semibold mb-4">Terms & Conditions</h3>
          <div className="space-y-3">
            {QUICK_LINKS["terms"].map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-75 transition-opacity duration-200 text-sm"
              >
                <Icon className="h-4 w-4" />
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start text-left">
          <h3 className="text-lg font-semibold mb-4">Contact & Support</h3>
          <address className="space-y-2 text-sm not-italic mb-4">
            {QUICK_LINKS["address"].map(({ text, icon: Icon }, index) => (
              <div key={index} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span>{text}</span>
              </div>
            ))}
          </address>
          <a
            href={wa_link(`hey, I ran into an issue: `, PHONE["admin"])}
            className="inline-block text-sm font-semibold hover:opacity-75 transition-opacity duration-200"
          >
            Raise a Complaint &rarr;
          </a>
        </div>
      </div>

      <div className="border-t border-[#e0c7b7] mt-12 pt-6 text-center text-sm px-6">
        <p className="opacity-75">
          © {new Date().getFullYear()} Biva Bakery. All rights reserved.
        </p>
      </div>
    </footer>
  );
}