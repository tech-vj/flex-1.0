"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BillerInfo from "./components/BillerInfo";
import BuyerInfo from "./components/BuyerInfo";
import ProductInfo from "./components/ProductInfo";

const SetupPage = () => {
  const router = useRouter();

  const [biller, setBiller] = useState({ name: "", gst: "", taxSlab: "" });
  const [buyer, setBuyer] = useState({ name: "", address: "" });
  const [products, setProducts] = useState([{ name: "", price: "", quantity: 1 }]);

  const handleSave = () => {
    const invoiceData = {
      biller,
      buyer,
      products,
    };

    sessionStorage.setItem("invoiceData", JSON.stringify(invoiceData));
    router.push("/invoice");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-blue-800 text-center mb-8">
          Invoice Setup
        </h1>

        <div className="space-y-8">
          <BillerInfo biller={biller} setBiller={setBiller} />
          <BuyerInfo buyer={buyer} setBuyer={setBuyer} />
          <ProductInfo products={products} setProducts={setProducts} />
        </div>

        <div className="text-center mt-8">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow-lg"
          >
            Generate Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupPage;
