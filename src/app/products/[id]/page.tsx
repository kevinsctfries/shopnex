import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import styles from "./page.module.css";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

async function getRelatedProducts(
  category: string,
  excludeId: number
): Promise<Product[]> {
  const res = await fetch(`https://fakestoreapi.com/products`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch related products");
  const products = await res.json();
  return products.filter(p => p.category === category && p.id !== excludeId);
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const product = await getProduct(id);
  const relatedProducts = await getRelatedProducts(
    product.category,
    product.id
  );

  console.log("Product image:", product.image);
  console.log(
    "Related images:",
    relatedProducts.map(p => p.image)
  );

  return (
    <div className={styles.productDetailPage}>
      <div className={styles.productDetail}>
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={400}
          className={styles.productDetailImage}
        />
        <div className={styles.productDetailContent}>
          <h1>{product.title}</h1>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
          <p>{product.description}</p>
          <div className={styles.rating}>
            <span>⭐ {product.rating.rate}</span>
            <span>({product.rating.count} reviews)</span>
          </div>
          <button className="button-accent">Add to Cart</button>
          <button className="button-accent">Buy Now</button>
        </div>
      </div>

      <section className={styles.relatedProducts}>
        <h2>Related Products</h2>
        <div className={styles.productGrid}>
          {relatedProducts.map(p => (
            <ProductCard
              key={p.id}
              id={p.id}
              title={p.title}
              price={p.price}
              image={p.image}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
