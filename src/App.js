import Home from "./Pages/Home";
import WrongURL from "../src/Pages/WrongURL";
import { MedusaProvider } from "medusa-react";
import { QueryClient } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SingleProduct from "./Pages/SingleProduct";
import React from "react";
import Favorites from "./Pages/Favorites";
import Cart from "./Pages/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <MedusaProvider
      queryClientProviderProps={{ client: queryClient }}
      baseUrl="http://localhost:9000"
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="*" element={<WrongURL />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/card" element={<Cart />} />
        </Routes>
      </Router>
      <ToastContainer />
    </MedusaProvider>
  );
};

export default App;
