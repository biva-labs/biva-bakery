import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Main from "./layout/main";
import Biva from "./layout/page";
import Hotel from "./pages/hotel";
import FoodCourt from "./pages/food-court";
import Table from "./pages/table";
import SeatBookingPage from "./components/seat-booking-page";
import Bakery from "./pages/bakery";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="/" element={<Biva />}>
              <Route path="/" element={<Hotel />} />
              <Route path="/food" element={<FoodCourt />} />
              <Route path="/bakery" element={<Bakery/>}/>
            </Route>
            <Route path="/test" element={<Table />} />
            <Route path="/test/:id" element={<SeatBookingPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
