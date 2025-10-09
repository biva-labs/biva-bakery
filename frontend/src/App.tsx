import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import Main from "./layout/main";
import Biva from "./layout/page";
import Hotel from "./pages/hotel";
import FoodCourt from "./pages/food-court";
import Table from "./pages/table";
// import RoomBookingPage from "./components/hotel/room-booking-page";
import Bakery from "./pages/bakery";
import SeatBookingPage from "./components/food-court/seat-booking-page";
import ChatBot from "./components/chatbot/chatbot";
import About from "./pages/about";
import { useEffect } from "react";
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'

const queryClient = new QueryClient({
  defaultOptions:{
    queries: {
      gcTime: 1000 * 60 * 5
    }
  }
});


const asyncStoragePersister = createAsyncStoragePersister({
  storage: window.localStorage,
})


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
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: asyncStoragePersister }}>
      <BrowserRouter>
      
          <ScrollToHash/>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="/" element={<Biva />}>
              <Route path="/" element={<Hotel />} />
              <Route path="/food" element={<FoodCourt />} />
              <Route path="/bakery" element={<Bakery />} />
            </Route>
            {/* <Route path="/test/:id" element={<RoomBookingPage />} /> */}
            <Route path="/table/booking" element={<SeatBookingPage />}/>
            <Route path="/events/booking" element={<Table />}/>
            <Route path="/about" element={<About/>} />
          </Route>
        </Routes>
        <ChatBot />
      </BrowserRouter>
    </PersistQueryClientProvider>
  );
}

export default App;
