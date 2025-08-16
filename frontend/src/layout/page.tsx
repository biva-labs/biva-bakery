import { Outlet } from "react-router-dom";
import MainNav from "@/components/main-nav";
import Footer from "@/components/footer";
import { SecondNavbar } from "@/components/second-nav";

export default function Biva() {
  return (
    <div>
      <MainNav />
      <SecondNavbar />
      <Outlet />
      <Footer />
    </div>
  );
}
