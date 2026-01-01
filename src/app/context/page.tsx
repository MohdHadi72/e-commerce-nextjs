"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function Page() {
  const { cartlist, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  // Auto clear cart after 5 minutes
  useEffect(() => {
    if (cartlist.length > 0) {
      const timer = setTimeout(() => {
        clearCart();
      }, 300000); // 5 minutes

      return () => clearTimeout(timer);
    }
  }, [cartlist, clearCart]);

  // Calculate total price
  const totalPrice = cartlist.reduce(
    (total, item) => total + item.price,
    0
  );

  // Empty cart UI
  if (cartlist.length === 0) {
    return (
      <div className="container mx-auto max-w-4xl py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">
          Cart Expired or Empty 🛒
        </h1>
        <Link
          href="/"
          className="text-orange-500 font-semibold underline"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  // Checkout handler
  const handleCheckout = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/mongoroute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartlist,
          totalPrice,
        }),
      });

      if (!res.ok) {
        throw new Error("Server error");
      }

      const data = await res.json();

      if (data.success) {
        alert("Order placed successfully ✅");
        clearCart();
      } else {
        alert(data.message || "Checkout failed ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch ❌ API not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-5xl py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">
        Your Cart
      </h1>

      <p className="text-red-500 font-semibold mb-6">
        Cart will clear automatically in 5 minutes ⏰
      </p>

      {/* Cart Items */}
      <div className="space-y-6">
        {cartlist.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-6 border p-4 rounded-lg"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={100}
              height={100}
              className="object-contain"
            />

            <div className="flex-1">
              <h2 className="font-bold text-lg">
                {item.title}
              </h2>
              <p className="text-orange-500 font-semibold">
                ${item.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-10 border-t pt-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          Total: ${totalPrice.toFixed(2)}
        </h2>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className={`px-8 py-3 rounded font-bold text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {loading ? "Processing..." : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  );
}
