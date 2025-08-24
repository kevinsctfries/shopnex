import Link from "next/link";
import styles from "./page.module.css";
import ProductCard from "@/components/ProductCard";

async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

export default async function Home() {
  const products: {
    id: number;
    title: string;
    price: number;
    image: string;
  }[] = await getProducts();

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1>Welcome to My Store</h1>
        <p>Shop our wide selection of products at great prices.</p>
        <Link href="/products">
          <button className="button-accent">Shop All Products</button>
        </Link>
      </section>

      <section className={styles.featured}>
        <h2>Featured Products</h2>
        <div className={styles.productGrid}>
          {products.slice(0, 6).map(product => (
            <ProductCard
              key={`featured-${product.id}`}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </section>

      <section className={styles.bestsellers}>
        <h2>Best Sellers</h2>
        <div className={styles.productGrid}>
          {products.slice(6, 12).map(product => (
            <ProductCard
              key={`bestseller-${product.id}`}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </section>

      <section className={styles.newArrivals}>
        <h2>New Arrivals</h2>
        <div className={styles.productGrid}>
          {products.slice(12, 18).map(product => (
            <ProductCard
              key={`new-${product.id}`}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </section>

      <section className={styles.newsletter}>
        <h2>Sign Up for Updates</h2>
        <p>Get the latest deals and product updates.</p>
        <form>
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Sign Up</button>
        </form>
      </section>
    </div>
  );
}
