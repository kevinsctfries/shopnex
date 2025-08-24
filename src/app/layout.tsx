import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "ShopNex",
  description: "A modern e-commerce store project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar">
          <ul className="nav-list">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
          </ul>
          <form className="search-form">
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
