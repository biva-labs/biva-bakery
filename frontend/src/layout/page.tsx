import { Outlet } from "react-router-dom";
import MainNav from "@/components/mainNav";
import Footer from "@/components/footer";
import { SecondNavbar } from "@/components/second-nav";

export default function Biva() {
  // on route change pass props to change the hero section

  return (
    <div className="gap-3">
      <MainNav />
      <SecondNavbar />
      <Outlet />
      <Footer />
    </div>
  );
}
