import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "ShopNex",
  description: "A modern e-commerce store project",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await fetch("https://fakestoreapi.com/products/categories", {
    cache: "no-store",
  });
  const categories: string[] = await res.json();

  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar categories={categories} />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
