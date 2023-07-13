import React, { useEffect, useState } from "react";
import WhiteHeader from "../Components/WhiteHeader";
import BlackHeader from "../Components/BlackHeader";
import { useProducts } from "medusa-react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { products, isLoading } = useProducts();
  const [newFavorites, setNewFavorites] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setNewFavorites(JSON.parse(storedFavorites));
    }

    if (!isLoading) {
      setAllProducts(products);
    }
  }, [isLoading, products]);

  const removeFromFavorites = (id) => {
    const updatedFavs = newFavorites.filter((favs) => favs.id !== id);
    setNewFavorites(updatedFavs);
    localStorage.setItem("favorites", JSON.stringify(updatedFavs));
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-start">
      <BlackHeader />
      <WhiteHeader />
      {newFavorites.length > 0 ? (
        <div className="w-full flex items-center justify-center mt-10">
          <div className="flex flex-col items-start justify-center px-5 py-5 sm:w-2/3 md:w-1/2  lg:w-1/3">
            <h2 className="font-semibold text-2xl mb-5">YOUR WISH LIST</h2>
            <div className="flex mt-2 mb-2">
              <p className="mr-1 font-semibold">
                {newFavorites.length === 1
                  ? "Item : 1"
                  : `Items : ${newFavorites.length}`}
              </p>
            </div>
            <p className="">Items in your wish list are not reserved!</p>

            {newFavorites.map((prod) => {
              const foundProduct = allProducts.find((p) => p.id === prod.id);
              if (foundProduct) {
                return (
                  <div
                    key={foundProduct.id}
                    className="flex item w-full border border-black mb-2 mt-5"
                  >
                    <div className="w-1/3">
                      <Link to={`/products/${prod.id}`}>
                        <img
                          src={foundProduct.thumbnail}
                          alt="productImage"
                          className="max-h-40"
                        />
                      </Link>
                    </div>
                    <div className="w-2/3 flex flex-col justify-between items-start px-5 py-5 ">
                      <div className="flex justify-between w-full">
                        <Link to={`/products/${prod.id}`}>
                          <h2 className="underline text-md font-catamaran">
                            {foundProduct.title}
                          </h2>
                        </Link>
                        <span
                          className="material-symbols-outlined text-2xl cursor-pointer"
                          onClick={() => removeFromFavorites(prod.id)}
                        >
                          close
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">
                          {foundProduct.variants[0].prices[0].amount} $
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center justify-start h-screen">
            <div className="mt-20 flex flex-col items-center px-10">
              <h2 className="text-3xl font-semibold mb-3">
                YOUR WISH LIST IS EMPTY
              </h2>
              <p className="text-center">
                Once you add product to wish list, it will appear here. Ready to
                get started?
              </p>
              <Link to="/">
                <button className="text-white font-semibold bg-black px-10 py-3 mt-5 hover:bg-gray-800">
                  GET STARTED
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;
