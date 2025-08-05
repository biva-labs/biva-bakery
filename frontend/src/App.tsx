import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Hotel from "./pages/Hotel";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hotel />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
