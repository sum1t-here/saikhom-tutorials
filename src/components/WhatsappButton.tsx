"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const handleClick = () => {
    // Replace with your WhatsApp number
    const message =
      "Hello! I found your site https://saikhomtutors.com and am eager to learn more about your educational programs. Could you share some details? Thanks!";
    const url = `https://wa.me/917002658011?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="
        fixed bottom-6 right-6 z-50
        flex items-center justify-center
        w-14 h-14 md:w-16 md:h-16
        bg-green-500 hover:bg-green-600
        rounded-full shadow-lg
        transition-all duration-300 ease-in-out
        hover:scale-110
         translate-y-0 opacity-100 
      "
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-white" />

      {/* Pulse Animation */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
    </button>
  );
}
