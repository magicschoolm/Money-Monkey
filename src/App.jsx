
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Workspace from "./pages/WorkSpace";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/search" element={<Search />} /> */}
        {/* <Route path="/services" element={<Services />} /> */}
        {/* <Route path="/calculator" element={<Calculator />} /> */}
        <Route path="/workspace" element={<Workspace />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
