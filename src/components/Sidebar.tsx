"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const [categories, setCategories] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    }
    fetchCategories();
  }, []);

  return (
    <>
      <button
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}>
        <Image src="/align-justify.svg" alt="Menu" width={20} height={20} />
        <span>All</span>
      </button>

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <h3>Categories</h3>
        <ul>
          {categories.map(cat => (
            <li key={cat}>
              <Link href={`/products/category/${encodeURIComponent(cat)}`}>
                {cat}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
