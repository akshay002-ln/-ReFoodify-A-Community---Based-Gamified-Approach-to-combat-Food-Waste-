import React, { useState } from "react";
import { motion } from "framer-motion";

export default function QRCodeGenerator() {
  const [qrCode, setQrCode] = useState(null);
  const [transactionId, setTransactionId] = useState("");

  const generateQRCode = () => {
    const newTxnId = `txn_${Date.now()}`;
    setTransactionId(newTxnId);
    setQrCode(
      `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${newTxnId}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center relative overflow-hidden px-4 py-10">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

      {/* QR Generator Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-lg w-full bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-2xl p-8 text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          🔲 QR Code Generator
        </h1>
        <p className="text-gray-600 mb-8">
          Generate secure, unique QR codes for your canteen transactions.
        </p>

        <button
          onClick={generateQRCode}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105"
        >
          Generate New QR Code
        </button>

        {qrCode && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-10 flex flex-col items-center"
          >
            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
              <img
                src={qrCode}
                alt="QR Code"
                className="w-48 h-48 object-contain"
              />
            </div>
            <p className="mt-4 text-gray-700 text-sm">
              Transaction ID:{" "}
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                {transactionId}
              </span>
            </p>
            <p className="text-gray-500 text-xs mt-2 italic">
              This QR code is dynamic and will expire shortly.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
