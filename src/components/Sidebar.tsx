"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Sidebar.module.css";

export default function Sidebar({ categories }: { categories: string[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}>
        <Image src="/align-justify.svg" alt="Menu" width={20} height={20} />
        <span>All</span>
      </button>

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.sidebarHeader}>
          <h3>Categories</h3>
          <button
            className={styles.closeButton}
            onClick={() => setIsOpen(false)}
            aria-label="Close menu">
            ✕
          </button>
        </div>

        <div className={styles.sidebarContent}>
          <ul>
            {categories.map(cat => (
              <li key={cat}>
                <Link href={`/category/${encodeURIComponent(cat)}`}>{cat}</Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
