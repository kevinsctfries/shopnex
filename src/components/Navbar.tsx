"use client";

import Link from "next/link";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import CartDrawer from "@/components/CartDrawer";
import { useState } from "react";
import styles from "./Navbar.module.css";

export default function Navbar({ categories }: { categories: string[] }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftGroup}>
        <Link href="/" className={styles.brand}>
          <span className={styles.brandWhite}>Shop</span>
          <span className={styles.brandAccent}>Nex</span>
        </Link>

        <ul className={styles.navList}>
          <li>
            <Sidebar categories={categories} />
          </li>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/products">Products</Link>
          </li>
        </ul>
      </div>

      <form className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search products..."
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

      <button
        onClick={() => setIsCartOpen(true)}
        className={styles.cartButton}
        aria-label="Open shopping cart">
        <Image
          src="/shopping-cart.svg"
          alt=""
          width={24}
          height={24}
          aria-hidden="true"
        />
      </button>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
}
