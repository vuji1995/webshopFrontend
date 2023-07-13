import React, { useEffect } from "react";
import { useState } from "react";
import { useProducts } from "medusa-react";
import { Link } from "react-router-dom";
import BlackHeader from "../Components/BlackHeader";
import WhiteHeader from "../Components/WhiteHeader";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Products = () => {
  const { products, isLoading } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const addToFavorite = (prod) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id === prod.id);
      if (isFavorite) {
        // Remove
        const updatedFavorites = prevFavorites.filter(
          (fav) => fav.id !== prod.id
        );
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        return updatedFavorites;
      } else {
        // Add
        const updatedFavorites = [...prevFavorites, prod];
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        return updatedFavorites;
      }
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFilterClick = (filter) => {
    if (
      filter === "PRICE (LOW-HIGH)" &&
      selectedFilters.includes("PRICE (HIGH-LOW)")
    ) {
      return;
    }

    if (
      filter === "PRICE (HIGH-LOW)" &&
      selectedFilters.includes("PRICE (LOW-HIGH)")
    ) {
      return;
    }
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const filteredProducts =
    selectedFilters.length > 0
      ? products.filter((prod) => {
          const tagMatches =
            prod.tags &&
            selectedFilters.some((filter) =>
              prod.tags.some((tag) => tag.value === filter)
            );
          return tagMatches;
        })
      : products;

  return (
    <div className="flex flex-col items-center justify-start">
      <BlackHeader />
      <WhiteHeader />
      <div className="w-3/4 flex justify-end mt-5  sm:w-full sm:px-10 xl:w-3/4">
        <button
          className="md:px-5 sm:px-3 py-1 px-3 sm:py-2 md:py-3 border-black border flex items-center justify-center hover:text-gray-500"
          onClick={openModal}
        >
          <span className="mr-2 font-semibold">Filter & Sort</span>
          <span className="material-symbols-outlined">page_info</span>
        </button>
      </div>
      {isModalOpen && (
        <>
          <div className="w-screen h-screen bg-black opacity-40 fixed top-0 left-0 z-10"></div>
          <div className="w-2/3 sm:w-1/2 lg:w-2/5 xl:w-1/4 h-screen bg-white fixed top-0 right-0 z-20">
            <div className="w-full flex justify-between items-center px-10 py-5">
              <h2 className=" font-semibold">Filter and Sort</h2>
              <span
                className="material-symbols-outlined cursor-pointer"
                onClick={closeModal}
              >
                close
              </span>
            </div>
            <div className="flex flex-col">
              <div>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <h2 className="font-semibold uppercase">COLLECTIONS</h2>
                  </AccordionSummary>
                  <AccordionDetails className="flex items-start overflow-x-auto">
                    <button
                      className={`${
                        selectedFilters.includes("SWEATSHIRTS")
                          ? "bg-white text-black border border-gray-950 "
                          : "bg-black text-white"
                      } px-5 py-2 font-semibold mr-2`}
                      onClick={() => handleFilterClick("SWEATSHIRTS")}
                    >
                      SWEATSHIRTS
                    </button>
                    <button
                      className={`${
                        selectedFilters.includes("T-SHIRTS")
                          ? "bg-white text-black border border-gray-950 "
                          : "bg-black text-white"
                      } px-5 py-2 font-semibold mr-2`}
                      onClick={() => handleFilterClick("T-SHIRTS")}
                    >
                      T-SHIRTS
                    </button>
                    <button
                      className={`${
                        selectedFilters.includes("SWEATPANTS")
                          ? "bg-white text-black border border-gray-950 "
                          : "bg-black text-white"
                      } px-5 py-2 font-semibold mr-2`}
                      onClick={() => handleFilterClick("SWEATPANTS")}
                    >
                      SWEATPANTS
                    </button>
                    <button
                      className={`${
                        selectedFilters.includes("SHORTS")
                          ? "bg-white text-black border border-gray-950 "
                          : "bg-black text-white"
                      } px-5 py-2 font-semibold mr-2`}
                      onClick={() => handleFilterClick("SHORTS")}
                    >
                      SHORTS
                    </button>
                    <button
                      className={`${
                        selectedFilters.includes("CUPS")
                          ? "bg-white text-black border border-gray-950 "
                          : "bg-black text-white"
                      } px-5 py-2 font-semibold mr-2`}
                      onClick={() => handleFilterClick("CUPS")}
                    >
                      CUPS
                    </button>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <h2 className="font-semibold uppercase">GENDER</h2>
                  </AccordionSummary>
                  <AccordionDetails className="flex items-start">
                    <button
                      className={`${
                        selectedFilters.includes("MAN")
                          ? "bg-white text-black border border-gray-950 "
                          : "bg-black text-white"
                      } px-5 py-2 font-semibold mr-2`}
                      onClick={() => handleFilterClick("MAN")}
                    >
                      MAN
                    </button>
                    <button
                      className={`${
                        selectedFilters.includes("WOMEN")
                          ? "bg-white text-black border border-gray-950 "
                          : "bg-black text-white"
                      } px-5 py-2 font-semibold mr-2`}
                      onClick={() => handleFilterClick("WOMEN")}
                    >
                      WOMEN
                    </button>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <h2 className="font-semibold uppercase">APPLIED FILTERS</h2>
                  </AccordionSummary>
                  <AccordionDetails className="flex items-start overflow-x-auto">
                    {selectedFilters.map((filter) => (
                      <button
                        key={filter}
                        className="bg-white text-black border border-gray-950  px-5 py-2 font-semibold mr-2"
                        onClick={() => handleFilterClick(filter)}
                      >
                        {filter}
                      </button>
                    ))}
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="grid grid-cols-1 px-10 gap-1 mt-5 mb-20 sm:grid-cols-2 sm:w-full sm:gap-2 sm:px-8 md:grid-cols-3 md:px-5 lg:grid-cols-4 lg:px-10 xl:w-3/4">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="flex flex-col items-center justify-center cursor-pointer relative"
            >
              <div className="w-full h-full mb-5 md:mb-0 border  border-transparent hover:border-black">
                {prod.images && prod.images.length > 0 && (
                  <div className="relative spanAnimation">
                    <Link to={`/products/${prod.id}`}>
                      <img
                        src={prod.images[0].url}
                        alt="productImage"
                        className="relative"
                      />
                    </Link>
                    <span className="absolute bottom-0 left-0 mb-0 ml-2 bg-white font-catamaran px-1">
                      {prod.variants[0].prices[0].amount} $
                    </span>
                  </div>
                )}
                <div className="flex flex-col mt-2 mb-2 px-3">
                  <h1 className="font-catamaran font-semibold">{prod.title}</h1>
                  <p className="text-gray-500 first-letter:uppercase">
                    {prod.handle}
                  </p>
                </div>
                <span
                  className={`material-symbols-outlined text-xl cursor-pointer absolute top-0 right-0 mt-5 mr-5 z-10 ${
                    favorites.some((fav) => fav.id === prod.id)
                      ? "text-red-500"
                      : ""
                  }`}
                  onClick={() => addToFavorite(prod)}
                >
                  favorite
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
