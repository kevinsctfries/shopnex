"use client";

import { useCart } from "@/context/CartContext";
import styles from "./CartDrawer.module.css";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cartItems } = useCart();

  return (
    <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
      <div className={styles.drawerHeader}>
        <h2>Your Cart</h2>
        <button onClick={onClose} className={styles.closeButton}>
          ✕
        </button>
      </div>

      <div className={styles.drawerContent}>
        {cartItems.length === 0 ? (
          <div className={styles.emptyMessage}>Your cart is empty</div>
        ) : (
          <ul>
            {cartItems.map(item => (
              <li key={item.id} className={styles.cartItem}>
                <span>{item.title}</span>
                <span>${item.price}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
