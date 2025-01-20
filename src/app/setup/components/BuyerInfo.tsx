import React from "react";

const BuyerInfo = ({ buyer, setBuyer }: { buyer: any; setBuyer: any }) => {
  const handleChange = (field: string, value: string) => {
    setBuyer((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Buyer Info</h2>
      <div className="space-y-4">
        <input
          type="text"
          value={buyer.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Buyer Name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-gray-900 placeholder-gray-500"
        />
        <input
          type="text"
          value={buyer.address}
          onChange={(e) => handleChange("address", e.target.value)}
          placeholder="Buyer Address"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-gray-900 placeholder-gray-500"
        />
      </div>
    </div>
  );
};

export default BuyerInfo;
