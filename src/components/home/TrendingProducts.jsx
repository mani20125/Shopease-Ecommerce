import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import ProductCard from "../common/ProductCard";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(8);
        setProducts(data.products);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  console.log(products);

  if (loading) return <h2>Loading Products...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
  <section className="py-20 bg-[#F8F7FC]">
    <div className="max-w-7xl mx-auto px-5 lg:px-8">

      <h2 className="text-4xl font-bold text-center text-[#1F2340]">
        Trending Products
      </h2>

      <p className="text-gray-500 text-center mt-4 mb-12">
        Discover our most popular products.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

    </div>
  </section>
);
};

export default TrendingProducts;