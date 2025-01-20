import React from "react";

const ProductInfo = ({
  products,
  setProducts,
}: {
  products: any[];
  setProducts: any;
}) => {
  const handleChange = (index: number, field: string, value: string) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const handleAddProduct = () => {
    setProducts((prev: any) => [...prev, { name: "", price: "", quantity: 1 }]);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Product Info</h2>
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 items-center">
            <input
              type="text"
              value={product.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              placeholder={`Product Name`}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-gray-900 placeholder-gray-500"
            />
            <input
              type="text"
              value={product.price}
              onChange={(e) => handleChange(index, "price", e.target.value)}
              placeholder={`Price`}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-gray-900 placeholder-gray-500"
            />
            <input
              type="number"
              value={product.quantity}
              onChange={(e) => handleChange(index, "quantity", e.target.value)}
              placeholder={`Quantity`}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-gray-900 placeholder-gray-500"
            />
          </div>
        ))}
        <button
          onClick={handleAddProduct}
          className="mt-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          Add More Products
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
