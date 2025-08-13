import { Outlet } from "react-router-dom";
import Hero from "@/components/hero";
import MainNav from "@/components/mainNav";
import Footer from "@/components/footer";

export default function Biva() {
  // on route change pass props to change the hero section

  return (
    <div className="gap-3">
      <MainNav />
      <Hero />
      <Outlet />
      <Footer />
    </div>
  );
}
