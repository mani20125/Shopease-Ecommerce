import { getAllProducts } from "../services/productService";
import { useEffect, useState } from "react";
import ProductCard from "../components/common/ProductCard";
import { useSearchParams } from "react-router-dom";
import { ChevronDown } from "lucide-react";


const Shop = () => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortOption, setSortOption] = useState("default");
    const [minRating, setMinRating] = useState(0);
    const [showFilters, setShowFilters] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const categories = [
        ...new Set(products.map((product) => product.category))
    ];
    const [searchParams] = useSearchParams();

    const urlSearch = searchParams.get("search") || "";

    const [searchQuery, setSearchQuery] = useState(
        urlSearch.toLowerCase()
    );
    useEffect(() => {
        setSearchQuery(urlSearch.toLowerCase());
    }, [urlSearch]);
    useEffect(() => {

        const fetchProducts = async () => {

            const data = await getAllProducts();

            console.log("ALL PRODUCTS:", data);

            setProducts(data);

        };


        fetchProducts();

    }, []);
    const formatCategory = (category) => {
        return category
            .split("-")
            .map((word) =>
                word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join(" ");
    };
    const clearFilters = () => {
        setSelectedCategory("all");
        setMinRating(0);
        setSortOption("default");
    };
    const filteredProducts = products
        .filter((product) => {
            const matchesSearch =
                product.title?.toLowerCase().includes(searchQuery) ||
                product.brand?.toLowerCase().includes(searchQuery) ||
                product.category?.toLowerCase().includes(searchQuery);

            const matchesCategory =
                selectedCategory === "all" ||
                product.category === selectedCategory;

            const matchesRating =
                product.rating >= minRating;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesRating
            );
        })
        .sort((a, b) => {

            if (sortOption === "price-low") {
                return a.price - b.price;
            }

            if (sortOption === "price-high") {
                return b.price - a.price;
            }

            if (sortOption === "rating") {
                return b.rating - a.rating;
            }

            return 0;
        });


    return (
        <div className="max-w-7xl mx-auto px-5 py-10">
            <div className="mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-[#1F2340]">
                    Shop All Products
                </h1>

                <p className="mt-3 text-lg text-gray-500">
                    Discover our complete collection of premium products.
                </p>

                <p className="mt-2 text-sm text-gray-400">
                    Showing {filteredProducts.length} of {products.length} Products
                </p>
            </div>
            <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden mb-5 w-full py-3 rounded-xl bg-[#1F2340] text-white font-medium"
            >
                {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
            <div
                className={`flex flex-col md:flex-row gap-4 mb-8 ${showFilters ? "flex" : "hidden md:flex"
                    }`}
            >

                {/* Category Filter */}
                <div className="relative w-full md:w-56">

                    <button
                        onClick={() =>
                            setOpenDropdown(
                                openDropdown === "category"
                                    ? null
                                    : "category"
                            )
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white flex justify-between items-center text-gray-600"
                    >
                        {selectedCategory === "all"
                            ? "All Categories"
                            : formatCategory(selectedCategory)
                        }

                        <ChevronDown
                            size={18}
                            className={`transition-transform duration-300 ${openDropdown === "category"
                                ? "rotate-180"
                                : ""
                                }`}
                        />

                    </button>


                    {openDropdown === "category" && (
                        <div className="absolute top-14 left-0 w-full bg-white rounded-xl shadow-xl border border-gray-100 z-50 max-h-60 overflow-y-auto">

                            <button
                                onClick={() => {
                                    setSelectedCategory("all");
                                    setOpenDropdown(null);
                                }}
                                className="w-full text-left px-4 py-3 hover:bg-[#F4F3FF]"
                            >
                                All Categories
                            </button>


                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => {
                                        setSelectedCategory(category);
                                        setOpenDropdown(null);
                                    }}
                                    className="w-full text-left px-4 py-3 hover:bg-[#F4F3FF]"
                                >
                                    {formatCategory(category)}
                                </button>
                            ))}

                        </div>
                    )}

                </div>


                {/* Rating Filter */}
                <div className="relative w-full md:w-56">

                    <button
                        onClick={() =>
                            setOpenDropdown(
                                openDropdown === "rating"
                                    ? null
                                    : "rating"
                            )
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white flex justify-between items-center text-gray-600"
                    >
                        {minRating === 0
                            ? "All Ratings"
                            : `${minRating}+ Stars`
                        }

                        <ChevronDown
                            size={18}
                            className={`transition-transform duration-300 ${openDropdown === "rating"
                                ? "rotate-180"
                                : ""
                                }`}
                        />

                    </button>


                    {openDropdown === "rating" && (
                        <div className="absolute top-14 left-0 w-full bg-white rounded-xl shadow-xl border border-gray-100 z-50">

                            {[
                                {
                                    label: "All Ratings",
                                    value: 0
                                },
                                {
                                    label: "4+ Stars",
                                    value: 4
                                },
                                {
                                    label: "3+ Stars",
                                    value: 3
                                },
                                {
                                    label: "2+ Stars",
                                    value: 2
                                }
                            ].map((rating) => (

                                <button
                                    key={rating.value}
                                    onClick={() => {
                                        setMinRating(rating.value);
                                        setOpenDropdown(null);
                                    }}
                                    className="w-full text-left px-4 py-3 hover:bg-[#F4F3FF]"
                                >
                                    {rating.label}
                                </button>

                            ))}

                        </div>
                    )}

                </div>


                {/* Sorting */}
                <div className="relative w-full md:w-56">

                    <button
                        onClick={() =>
                            setOpenDropdown(
                                openDropdown === "sort"
                                    ? null
                                    : "sort"
                            )
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white flex justify-between items-center text-gray-600"
                    >
                        {
                            sortOption === "default"
                                ? "Sort By"
                                : sortOption === "price-low"
                                    ? "Price: Low to High"
                                    : sortOption === "price-high"
                                        ? "Price: High to Low"
                                        : "Highest Rated"
                        }

                        <ChevronDown
                            size={18}
                            className={`transition-transform duration-300 ${openDropdown === "sort"
                                ? "rotate-180"
                                : ""
                                }`}
                        />

                    </button>


                    {openDropdown === "sort" && (
                        <div className="absolute top-14 left-0 w-full bg-white rounded-xl shadow-xl border border-gray-100 z-50">

                            {[
                                {
                                    label: "Sort By",
                                    value: "default"
                                },
                                {
                                    label: "Price: Low to High",
                                    value: "price-low"
                                },
                                {
                                    label: "Price: High to Low",
                                    value: "price-high"
                                },
                                {
                                    label: "Highest Rated",
                                    value: "rating"
                                }
                            ].map((sort) => (

                                <button
                                    key={sort.value}
                                    onClick={() => {
                                        setSortOption(sort.value);
                                        setOpenDropdown(null);
                                    }}
                                    className="w-full text-left px-4 py-3 hover:bg-[#F4F3FF]"
                                >
                                    {sort.label}
                                </button>

                            ))}

                        </div>
                    )}

                </div>
                <button
                    onClick={clearFilters}
                    className="px-5 py-3 rounded-xl bg-[#1F2340] text-white hover:bg-[#2f3564] transition"
                >
                    Clear Filters
                </button>

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-16">
                        <h2 className="text-2xl font-semibold text-[#1F2340]">
                            No products found
                        </h2>
                        <p className="mt-2 text-gray-500">
                            Try searching with a different keyword.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;