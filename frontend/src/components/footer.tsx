export default function Footer() {
  return (
    <footer className="bg-[#fff8f0] text-[#5c3d2e] py-10 ">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div className="lg:ml-24 justify-center items-center">
          <h2 className="text-2xl font-bold mb-3">Biva Bakery</h2>
          <p className="text-sm">
            Freshly baked happiness every day! Visit us for cakes, pastries, and
            more.
          </p>
        </div>

        {/* Quick Links */}
        <div className="lg:ml-20">
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/menu" className="hover:underline">
                Menu
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="text-sm">📍 Station Road, Silchar, Assam</p>
          <p className="text-sm">📞 +91 98765 43210</p>
          <p className="text-sm">📧 contact@bivabakery.com</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#e0c7b7] mt-8 pt-4 flex flex-col sm:flex-row items-center justify-center text-sm px-4">
        <p>© {new Date().getFullYear()} Biva Bakery. All rights reserved.</p>
      </div>
    </footer>
  );
}
