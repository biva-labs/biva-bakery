import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Main from "./layout/main";
import Biva from "./layout/page";
import Hotel from "./pages/hotel";
import FoodCourt from "./pages/food-court";
import Table from "./pages/table";
import RoomBookingPage from "./components/room-booking-page";
import Bakery from "./pages/bakery";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SeatBookingPage from "./components/seat-booking-page";

const queryClient = new QueryClient();


function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToHash />

        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="/" element={<Biva />}>
              <Route path="/" element={<Hotel />} />
              <Route path="/food" element={<FoodCourt />} />
              <Route path="/bakery" element={<Bakery />} />
            </Route>
            <Route path="/test/:id" element={<RoomBookingPage />} />
            <Route path="/table/booking" element={<SeatBookingPage />}/>
            <Route path="/events/booking" element={<Table />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
