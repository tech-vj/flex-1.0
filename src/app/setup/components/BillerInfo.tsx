import React from "react";

const BillerInfo = ({ biller, setBiller }: { biller: any; setBiller: any }) => {
  const handleChange = (field: string, value: string) => {
    setBiller((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Biller Info</h2>
      <div className="space-y-4">
        <input
          type="text"
          value={biller.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Biller Name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-gray-900 placeholder-gray-500"
        />
        <input
          type="text"
          value={biller.gst}
          onChange={(e) => handleChange("gst", e.target.value)}
          placeholder="GST Number"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-gray-900 placeholder-gray-500"
        />
        <input
          type="text"
          value={biller.taxSlab}
          onChange={(e) => handleChange("taxSlab", e.target.value)}
          placeholder="Tax Slab"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-gray-900 placeholder-gray-500"
        />
      </div>
    </div>
  );
};

export default BillerInfo;
