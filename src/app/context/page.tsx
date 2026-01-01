"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function Page() {
  const { cartlist, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  // auto clear after 5 min
  useEffect(() => {
    if (!cartlist.length) return;
    const t = setTimeout(clearCart, 300000);
    return () => clearTimeout(t);
  }, [cartlist, clearCart]);

  const totalPrice = cartlist.reduce((t, i) => t + i.price, 0);

  if (!cartlist.length)
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Cart Empty 🛒</h1>
        <Link href="/" className="text-orange-500 underline">
          Continue Shopping
        </Link>
      </div>
    );

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/mongoroute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartlist, totalPrice }),
      });
      const data = await res.json();
      data.success ? (alert("Order placed ✅"), clearCart()) : alert(data.message);
    } catch {
      alert("Checkout failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {/* text for cart auto clear */}
       <p className="mb-4 text-sm text-red-500">Cart will be auto cleared in 5 minutes</p>
      {cartlist.map((i, idx) => (
        <div key={idx} className="flex gap-6 border p-4 mb-4 rounded">
          <Image src={i.image} alt={i.title} width={100} height={100} />
          <div className="flex-1">
            <h2 className="font-bold">{i.title}</h2>
            <p className="text-orange-500">${i.price}</p>
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center border-t pt-6">
        <h2 className="text-2xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="bg-orange-500 text-white px-8 py-3 rounded font-bold disabled:bg-gray-400"
        >
          {loading ? "Processing..." : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  );
}
