import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

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
          <button>Shop All Products</button>
        </Link>
      </section>

      <section className={styles.featured}>
        <h2>Featured Products</h2>
        <div className={styles.productGrid}>
          {products.slice(0, 6).map(product => (
            <div key={`featured-${product.id}`} className={styles.productCard}>
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
                className={styles.productImage}
              />
              <div className={styles.content}>
                <h3>{product.title}</h3>
                <p>${product.price.toFixed(2)}</p>
                <Link href={`/products/${product.id}`}>See Details</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.bestsellers}>
        <h2>Best Sellers</h2>
        <div className={styles.productGrid}>
          {products.slice(6, 12).map(product => (
            <div
              key={`bestseller-${product.id}`}
              className={styles.productCard}>
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
                className={styles.productImage}
              />
              <div className={styles.content}>
                <h3>{product.title}</h3>
                <p>${product.price.toFixed(2)}</p>
                <Link href={`/products/${product.id}`}>See Details</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.newArrivals}>
        <h2>New Arrivals</h2>
        <div className={styles.productGrid}>
          {products.slice(12, 18).map(product => (
            <div key={`new-${product.id}`} className={styles.productCard}>
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
                className={styles.productImage}
              />
              <div className={styles.content}>
                <h3>{product.title}</h3>
                <p>${product.price.toFixed(2)}</p>
                <Link href={`/products/${product.id}`}>See Details</Link>
              </div>
            </div>
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
