import Image from "next/image";
import styles from "./page.module.css";

async function getProduct(id: string) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  return (
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
        <p className="price">${product.price.toFixed(2)}</p>
        <p>{product.description}</p>
        <div className={styles.rating}>
          <span>⭐ {product.rating.rate}</span>
          <span>({product.rating.count} reviews)</span>
        </div>
        <button className="button-accent">Add to Cart</button>
        <button className="button-accent">Buy Now</button>
      </div>
    </div>
  );
}
