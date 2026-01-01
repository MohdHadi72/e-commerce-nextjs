import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

async function getProduct(id: string) {
  if (!id) return null;

  const res = await fetch(
    `https://fakestoreapi.com/products/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <div className="p-10 text-center text-red-500 font-bold">
        Product not found
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl py-10 px-4">
      <Link href="/" className="text-xl font-bold">
        ← Back
      </Link>

      <div className="flex flex-col md:flex-row gap-10 mt-10">
        <div className="bg-gray-200 p-6 rounded-lg">
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            className="object-contain"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="mt-2 text-gray-600">{product.category}</p>
          <p className="text-2xl font-bold text-orange-500 mt-4">
            ${product.price}
          </p>
          <p className="mt-4 text-gray-700">
            {product.description}
          </p>

     
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}

