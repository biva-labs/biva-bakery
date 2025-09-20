import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#fefce8] text-[#5c3d2e] py-16 ">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8">
        {/* Logo & About */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-4xl font-extrabold outfit mb-4 tracking-wide">Biva Bakery</h2>
          <p className="text-sm max-w-xs">
            Freshly baked happiness every day! Visit us for cakes, pastries, and more.
          </p>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-xl font-semibold mb-4">Subscribe to our Newsletter</h3>
          <p className="text-sm mb-4">
            Get updates on new products and offers.
          </p>
          <div className="flex flex-col w-full sm:flex-row gap-2">
            <input 
              type="email"
              placeholder="Enter your email" 
              className="px-4 py-2 border border-[#5c3d2e] rounded-full w-full focus:outline-none focus:ring-2 focus:ring-[#e0c7b7]"
            />
            <button className="px-6 py-2 bg-[#5c3d2e] text-[#fefce8] rounded-full hover:bg-[#a67c52] transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>

        {/* Quick Links with Icons */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-base">
            <a href="/" className="flex items-center gap-2 hover:opacity-75 transition-opacity duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Home
            </a>
            <a href="/menu" className="flex items-center gap-2 hover:opacity-75 transition-opacity duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"></path>
                <rect x="8" y="2" width="8" height="2" rx="1" ry="1"></rect>
              </svg>
              Menu
            </a>
            <a href="/about" className="flex items-center gap-2 hover:opacity-75 transition-opacity duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12" y2="17"></line>
              </svg>
              About Us
            </a>
            <a href="/contact" className="flex items-center gap-2 hover:opacity-75 transition-opacity duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2 2H4a2 2 0 01-2-2v-3"></path>
                <path d="M12 21.92V11M17 16l-5-5-5 5"></path>
              </svg>
              Contact
            </a>
            <a href="/careers" className="flex items-center gap-2 hover:opacity-75 transition-opacity duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <line x1="10" y1="9" x2="8" y2="9"></line>
              </svg>
              Careers
            </a>
            {/* New "Rate Us" link */}
            <a href="/rate-us" className="flex items-center gap-2 hover:opacity-75 transition-opacity duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              Rate Us
            </a>
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-xl font-semibold mb-4">Contact & Support</h3>
          <address className="space-y-2 text-sm not-italic">
            <p>📍 Station Road, Silchar, Assam</p>
            <p>📞 +91 98765 43210</p>
            <p>📧 contact@bivabakery.com</p>
          </address>
          <a href="/complaint" className="mt-4 inline-block text-sm font-semibold hover:opacity-75 transition-opacity duration-200">
            Raise a Complaint &rarr;
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#e0c7b7] mt-12 pt-6 text-center text-sm px-6">
        <p className="opacity-75">© {new Date().getFullYear()} Biva Bakery. All rights reserved.</p>
      </div>
    </footer>
  );
}