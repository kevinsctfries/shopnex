import Link from "next/link";
import styles from "@/app/page.module.css";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

async function getCategoryProducts(category: string): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await res.json();
  return products.filter((p: Product) => p.category === category);
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = decodeURIComponent(params.category);

  const products: {
    id: number;
    title: string;
    price: number;
    image: string;
  }[] = await getCategoryProducts(category);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
        <p>Browse our selection of {category} products.</p>
        <Link href="/products">
          <button className="button-accent">← Back to All Products</button>
        </Link>
      </section>

      <section className={styles.featured}>
        <h2>{category} Products</h2>
        <div className={styles.productGrid}>
          {products.map(product => (
            <ProductCard
              key={`${category}-${product.id}`}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
