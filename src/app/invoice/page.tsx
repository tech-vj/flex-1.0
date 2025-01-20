"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import html2pdf.js only on the client side
const Html2Pdf = dynamic(() => import("html2pdf.js"), { ssr: false });

const InvoicePage = () => {
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const data = sessionStorage.getItem("invoiceData");
    if (data) {
      setInvoiceData(JSON.parse(data));
    }
  }, []);

  const calculateTotal = () =>
    invoiceData?.products.reduce(
      (total: number, product: any) =>
        total + parseFloat(product.price || 0) * (product.quantity || 1),
      0
    ) || 0;

  const calculateTaxAmount = (total: number, taxSlab: number) =>
    (total * taxSlab) / 100;

  const calculateNetPayable = (total: number, taxAmount: number) =>
    total - taxAmount;

  useEffect(() => {
    if (isClient && Html2Pdf) {
      const handleDownloadPDF = () => {
        const element = document.getElementById("invoice");
        const options = {
          filename: "invoice.pdf",
          jsPDF: { unit: "pt", format: "a4" },
          html2canvas: { scale: 2 },
        };

        // Ensure Html2Pdf is available and callable
        (Html2Pdf as any)().set(options).from(element).save();
      };

      const handlePrint = () => {
        window.print();
      };

      window.handleDownloadPDF = handleDownloadPDF;
      window.handlePrint = handlePrint;
    }
  }, [isClient]);

  if (!invoiceData) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800">Loading Invoice...</h1>
      </div>
    );
  }

  const { biller, buyer, products } = invoiceData;
  const total = calculateTotal();
  const taxSlab = parseFloat(biller.taxSlab || "0");
  const taxAmount = calculateTaxAmount(total, taxSlab);
  const netPayable = calculateNetPayable(total, taxAmount);

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center py-8">
      <div
        className="w-full max-w-4xl bg-white shadow-2xl rounded-lg p-8"
        id="invoice"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-8 border-b pb-4">
          Invoice
        </h1>

        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-blue-800 mb-2">
              Biller Information
            </h2>
            <div className="text-gray-600">
              <p>
                <strong>Name:</strong> {biller.name || "N/A"}
              </p>
              <p>
                <strong>GST:</strong> {biller.gst || "N/A"}
              </p>
              <p>
                <strong>Tax Slab:</strong> {biller.taxSlab || "0%"}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-blue-800 mb-2">
              Buyer Information
            </h2>
            <div className="text-gray-600">
              <p>
                <strong>Name:</strong> {buyer.name || "N/A"}
              </p>
              <p>
                <strong>Address:</strong> {buyer.address || "N/A"}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-blue-800 mb-4">
              Products
            </h2>
            <table className="w-full border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-right">Price</th>
                  <th className="py-3 px-4 text-right">Quantity</th>
                  <th className="py-3 px-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="bg-gray-100 text-gray-700">
                {products.map((product: any, index: number) => (
                  <tr key={index} className="border-b border-gray-300 last:border-none">
                    <td className="py-2 px-4">{product.name || "N/A"}</td>
                    <td className="py-2 px-4 text-right">
                      ₹{parseFloat(product.price || 0).toFixed(2)}
                    </td>
                    <td className="py-2 px-4 text-right">{product.quantity || 1}</td>
                    <td className="py-2 px-4 text-right">
                      ₹{(parseFloat(product.price || 0) * (product.quantity || 1)).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8">
            <table className="w-full border-t border-gray-300">
              <tbody>
                <tr className="bg-gray-300">
                  <td colSpan={3} className="py-2 px-4 font-semibold text-right">Total</td>
                  <td className="py-2 px-4 font-bold text-right text-green-600">
                    ₹{total.toFixed(2)}
                  </td>
                </tr>
                <tr className="bg-gray-300">
                  <td colSpan={3} className="py-2 px-4 font-semibold text-right">
                    Tax Amount Deducted ({taxSlab}%)
                  </td>
                  <td className="py-2 px-4 font-bold text-right text-red-600">
                    ₹{taxAmount.toFixed(2)}
                  </td>
                </tr>
                <tr className="bg-gray-300">
                  <td colSpan={3} className="py-2 px-4 font-semibold text-right">
                    Net Payable (After Tax)
                  </td>
                  <td className="py-2 px-4 font-bold text-right text-blue-600">
                    ₹{netPayable.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center mt-8 space-x-4">
          <button onClick={() => window.handlePrint()} className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow-lg">
            Print
          </button>
          <button onClick={() => window.handleDownloadPDF()} className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg">
            Download PDF
          </button>
          <button onClick={() => (window.location.href = "/setup")} className="px-6 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition shadow-lg">
            Back to Setup
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
