import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WhiteHeader from "../Components/WhiteHeader";
import BlackHeader from "../Components/BlackHeader";
import NumericInput from "react-numeric-input";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Card = () => {
  const [cardProducts, setCardProducts] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [showMessage, setSetShowMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSetShowMessage((prev) => !prev);
    setCardProducts([]);
    localStorage.setItem("cardProducts", JSON.stringify([]));
  };

  useEffect(() => {
    const storedCardProducts = localStorage.getItem("cardProducts");
    if (storedCardProducts) {
      setCardProducts(JSON.parse(storedCardProducts));
    }
  }, []);

  const removeFromCard = (id) => {
    const updatedCardProducts = cardProducts.filter((prod) => prod.id !== id);
    setCardProducts(updatedCardProducts);
    localStorage.setItem("cardProducts", JSON.stringify(updatedCardProducts));
  };

  const updateQuantity = (productId, newQuantity) => {
    const updatedProducts = cardProducts.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: newQuantity };
      }
      return product;
    });

    setCardProducts(updatedProducts);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    cardProducts.forEach((product) => {
      totalPrice += product.price * product.quantity;
    });

    return totalPrice;
  };

  return (
    <div className="h-screen  w-screen flex flex-col items-center justify-start">
      <BlackHeader />
      <WhiteHeader />
      {showMessage && (
        <div className="w-full h-screen flex flex-col items-center justify-start">
          <div className="flex flex-col items-center justify-center px-10 py-4 mt-32">
            <p className="text-xl font-semibold first-letter:uppercase">{`${firstName}, thank you for you order!`}</p>
            <Link to="/">
              <button className="bg-black hover:bg-gray-800 px-5 py-2 mt-2 text-white">
                CONTINUE
              </button>
            </Link>
          </div>
        </div>
      )}
      {cardProducts.length > 0 ? (
        <div
          className={`w-full grid grid-cols-1 md:grid-cols-2 md:w-full mt-10 xl:w-2/3 ${
            showMessage === true ? `hidden` : ""
          }`}
        >
          <div className="w-full  md:w-full flex flex-col items-start justify-center  px-10 py-5 ">
            <h2 className="font-semibold text-4xl mb-5">YOUR BAG</h2>
            <div className="flex mt-2 mb-2 flex-col">
              <p className="mr-1 font-semibold text-lg">
                Items:{" "}
                <span className="font-semibold text-lg">
                  {cardProducts.length}
                </span>{" "}
              </p>
              <p className="mr-1 font-semibold text-lg">
                TOTAL:{" "}
                <span className="font-semibold text-lg">
                  {calculateTotalPrice()}$
                </span>
              </p>
            </div>
            <p className="">
              Items in your bag are not reserved — check out now to make them
              yours
            </p>
            <div className="bg-gray-200 w-full flex flex-col px-8 py-4 items-start justify-center mt-5 mb-5">
              <p className="font-semibold">
                FREE BACKPACK WITH ORDERS $12000+{" "}
              </p>
              <p className="font-thin mt-2">
                Eligible orders of $12000+ earn you a backpack for free, while
                supplies last.{" "}
              </p>
            </div>
            {cardProducts.map((prod) => {
              return (
                <div
                  className="flex item  w-full border border-black mb-2"
                  key={prod.id}
                >
                  <div className="w-1/3 bg-black h-full">
                    <img
                      src={`${prod.thumbnail}`}
                      alt="productImage"
                      className="h-full"
                    />
                  </div>
                  <div className="w-2/3  flex flex-col justify-between px-5 py-5">
                    <div className="flex justify-between w-full">
                      <h2 className="font-catamaran">{prod.name}</h2>
                      <span
                        className="material-symbols-outlined text-2xl cursor-pointer"
                        onClick={() => removeFromCard(prod.id)}
                      >
                        close
                      </span>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center justify-between">
                      <NumericInput
                        className="w-20 h-10"
                        min={0}
                        max={20}
                        value={prod.quantity}
                        onChange={(value) => updateQuantity(prod.id, value)}
                      />
                      <div className="flex items-start">
                        <span className="mr-1 italic">SIZE:</span>
                        <span className="italic">{prod.size}</span>
                      </div>
                      <span className="font-semibold">
                        {`${prod.price * prod.quantity}`} $
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full  flex flex-col items-start justify-start px-10 py-5">
            <h2 className="font-semibold text-4xl mb-5">CHECKOUT</h2>
            <h2 className="font-semibold text-xl mb-5">CONTACT</h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-between md:h-1/4 h-3/4 w-full"
            >
              <div className="w-full mb-3">
                <TextField
                  className="w-full"
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="w-full mb-3">
                <TextField
                  className="w-full"
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="w-full mb-3">
                <TextField
                  className="w-full"
                  label="Email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="w-full mb-3">
                <TextField
                  className="w-full"
                  label="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <Button variant="contained" type="submit">
                CONFIRM ORDER
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div
          className={`flex flex-col items-center justify-start h-screen ${
            showMessage === true ? `hidden` : ""
          }`}
        >
          <div className="mt-20 flex flex-col items-center px-10">
            <h2 className="text-3xl font-semibold mb-3">YOUR BAG IS EMPTY</h2>
            <p className="text-center">
              Once you add something to your bag, it will appear here. Ready to
              get started?
            </p>
            <Link to="/">
              <button className="text-white font-semibold bg-black px-10 py-3 mt-5 hover:bg-gray-800">
                GET STARTED
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
