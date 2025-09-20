import { Outlet } from "react-router-dom";
import MainNav from "@/components/main-nav";
import Footer from "@/components/footer";
import { SecondNavbar } from "@/components/second-nav";
import Map from "@/components/map";
import About from "@/components/about";
import Testimonial from "@/components/testimonial";

export default function Biva() {
  return (
    <div>
      <MainNav />
      <SecondNavbar />
      <Outlet />
      <Map />
      <Testimonial/>
      <About/>
      <Footer />
    </div>
  );
}
