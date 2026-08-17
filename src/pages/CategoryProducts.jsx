import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getProductsByCategory } from "../services/productService";
import ProductCard from "../components/common/ProductCard";
const CategoryProducts = () => {
    const { category } = useParams();
    const [searchParams] = useSearchParams();

    const categoryTitle = searchParams.get("title");

    const categories = JSON.parse(decodeURIComponent(category));
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchCategoryProducts = async () => {
            const data = await getProductsByCategory(categories);

            setProducts(data.products);
        };

        fetchCategoryProducts();
    }, [category]);
    return (
        <div className="max-w-7xl mx-auto px-5 py-10">

            <div className="mb-10">
                <h1 className="text-4xl font-bold text-[#1F2340]">
                    {categoryTitle}
                </h1>

                <p className="mt-3 text-gray-500">
                    Explore products from this category.
                </p>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}

            </div>

        </div>
    );
};

export default CategoryProducts;