import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "medusa-react";
import BlackHeader from "../Components/BlackHeader";
import WhiteHeader from "../Components/WhiteHeader";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NumericInput from "react-numeric-input";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { toast } from "react-toastify";

const SingleProduct = () => {
  const { products, isLoading } = useProducts();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [size, setSize] = useState(`M`);
  const [createOrder, setCreateOrder] = useState({});
  const [numericValue, setNumericValue] = useState(1);
  const [cardProducts, setCardProducts] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      const foundProduct = products.find((prod) => prod.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [products, id, isLoading]);

  useEffect(() => {
    const storedCardProducts = localStorage.getItem("cardProducts");
    if (storedCardProducts) {
      setCardProducts(JSON.parse(storedCardProducts));
    }
  }, []);

  const addProductToCard = () => {
    const randomString = Math.random().toString(36).substring(2, 8);

    if (id === "prod_01H4ECKN18PEX4DW9J5YRSBC8H") {
      createOrder.size = "One Size";
    } else {
      createOrder.size = size;
    }

    if (["S / White", "L / White", "M / White", "XL / White"].includes(size)) {
      createOrder.thumbnail = product.images[2].url;
    } else {
      createOrder.thumbnail = product.thumbnail;
    }

    const newId = id + "-" + randomString;
    createOrder.id = newId;
    createOrder.name = product.title;
    createOrder.price = product.variants[0].prices[0].amount;
    createOrder.quantity = numericValue;

    const updatedCardProducts = [...cardProducts, createOrder];
    setCardProducts(updatedCardProducts);
    localStorage.setItem("cardProducts", JSON.stringify(updatedCardProducts));
    setCreateOrder({});
    toast.success(`Item added to shopping cart!`);
  };

  const selectSize = (size) => {
    setSize(size);
  };

  return (
    <div className="flex flex-col h-screen items-center justify-start">
      <BlackHeader />
      <WhiteHeader />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen lg:w-3/4 ">
          <div className="w-full h-full  flex flex-col items-center justify-center md:col-span-1">
            <h2 className="font-catamaran text-2xl mt-10 md:hidden">
              {product.title}
            </h2>
            <div className="h-full sm:w-3/4 md:w-full py-10 w-full px-10 flex items-start">
              <Carousel>
                {product &&
                  product.images &&
                  product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ))}
              </Carousel>
            </div>
          </div>
          <div className="w-full  flex flex-col  py-10 px-10 md:col-span-1">
            <h2 className="font-catamaran  text-3xl hidden md:block">
              {product.title}
            </h2>
            <span className="font-semibold  text-xl mt-3 ">
              PRICE:{" "}
              {product &&
                product.variants &&
                product.variants[0].prices[0].amount}
              $
            </span>
            <div className="mt-10">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <h2 className="font-semibold uppercase">DESCRIPTION</h2>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="text-gray-700">
                    {product.description}
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <h2 className="font-semibold uppercase">SIZES</h2>
                </AccordionSummary>
                <AccordionDetails>
                  {product &&
                    product.variants &&
                    product.variants.map((obj, indx) => (
                      <button
                        key={indx}
                        className={`px-4 py-1 mr-1  font-normal mt-2 ${
                          obj.title === size
                            ? `bg-white text-black border border-black font-semibold`
                            : `bg-black text-white`
                        } hover:bg-black hover:text-white`}
                        onClick={() => selectSize(obj.title)}
                      >
                        {obj.title}
                      </button>
                    ))}
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <h2 className="font-semibold uppercase">Weight</h2>
                </AccordionSummary>
                <AccordionDetails className="text-gray-700">
                  {product.weight}g
                </AccordionDetails>
              </Accordion>
              <div className="flex mt-5 w-full justify-between items-center">
                <NumericInput
                  className="w-20 h-10"
                  min={0}
                  max={5}
                  value={numericValue}
                  onChange={(valueAsNumber) => setNumericValue(valueAsNumber)}
                />
                <button
                  className="bg-black text-white font-semibold px-10 py-2"
                  onClick={addProductToCard}
                >
                  ADD TO BAG
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
