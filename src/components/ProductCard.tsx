"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./ProductCard.module.css";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function ProductCard({
  id,
  title,
  price,
  image,
}: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, title, price, image, quantity: 1 });
  };

  return (
    <div className={styles.productCard}>
      <Image
        src={image}
        alt={title}
        width={200}
        height={200}
        className={styles.productImage}
      />
      <div className={styles.content}>
        <h3>{title}</h3>
        <p>${price.toFixed(2)}</p>
        <Link href={`/products/${id}`}>See Details</Link>
        <button className="button-accent" onClick={handleAddToCart}>
          Add to cart
        </button>
        <button className="button-accent">Buy Now</button>
      </div>
    </div>
  );
}
