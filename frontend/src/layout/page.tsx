import { Outlet } from "react-router-dom";
import MainNav from "@/components/navbar/main-nav/main-nav";
import Footer from "@/components/footer";
import { SecondNavbar } from "@/components/navbar/second-nav";
import Map from "@/components/map";
import About from "@/components/about-section";
import Testimonial from "@/components/testimonial/testimonial";

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
