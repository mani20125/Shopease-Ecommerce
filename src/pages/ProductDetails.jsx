import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../services/productService";
import { getCurrentUser } from "../utils/auth";
import { addToCart } from "../services/cartService";
import LoginRequiredModal from "../components/common/LoginRequiredModal";
import {
    Truck,
    ShieldCheck,
    RotateCcw,
    Minus,
    Plus,
    ShoppingCart,
    Heart,
    Star,
} from "lucide-react";
import {
    addToWishlist,
    getWishlistItem,
    removeFromWishlist,
} from "../services/wishlistService";


const ProductDetails = () => {
    console.log("ProductDetails Rendered");
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [wishlisted, setWishlisted] = useState(false);

    useEffect(() => {

        const fetchProduct = async () => {

            try {

                const data = await getProduct(id);


                const formattedProduct = {

                    ...data,

                    brand: data.brand || "ShopEase",

                    rating: data.rating || 5,

                    discountPercentage: data.discountPercentage || 0,

                    reviews: data.reviews || []

                };


                setProduct(formattedProduct);



                const user = getCurrentUser();


                if (user) {

                    const wishlistItem = await getWishlistItem(
                        user.id,
                        formattedProduct.id
                    );

                    setWishlisted(!!wishlistItem);

                }



                setSelectedImage(
                    formattedProduct.images?.[0] ||
                    formattedProduct.thumbnail
                );


            } catch (err) {

                console.error(err);

                setError("Failed to load product.");

            } finally {

                setLoading(false);

            }

        };


        fetchProduct();


    }, [id]);

    console.log(id);
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[70vh]">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-[#1F2340] rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) return <h2>{error}</h2>;

    const handleAddToCart = async () => {
        const currentUser = getCurrentUser();

        if (!currentUser) {
            setShowLoginModal(true);
            return;
        }

        try {
            setIsAdding(true);

            const cartItem = {
                userId: currentUser.id,
                productId: product.id,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
                quantity,
            };

            await addToCart(cartItem);
        } catch (error) {
            console.error("Failed to add product:", error);
        } finally {
            setIsAdding(false);
        }
    };
    const handleWishlist = async () => {
        const user = getCurrentUser();

        if (!user) {
            alert("Please login to add items to your wishlist.");
            navigate("/login");
            return;
        }

        const wishlistItem = await getWishlistItem(user.id, product.id);

        if (wishlistItem) {
            await removeFromWishlist(wishlistItem.id);
            setWishlisted(false);
            alert("Removed from wishlist 💔");
            return;
        }

        await addToWishlist({
            userId: user.id,
            productId: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            brand: product.brand,
            rating: product.rating,
        });

        setWishlisted(true);
        alert("Added to wishlist ❤️");
    };


    return (
        <div className="max-w-7xl mx-auto py-12 px-5 lg:px-8">
            <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500">

                <span className="hover:text-[#1F2340] cursor-pointer">
                    Home
                </span>

                <span>/</span>

                <span className="capitalize hover:text-[#1F2340] cursor-pointer">
                    {product.category}
                </span>

                <span>/</span>

                <span className="text-[#1F2340] font-medium truncate">
                    {product.title}
                </span>

            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
                {/* Product Image */}
                <div className="space-y-5">

                    {/* Main Image */}
                    <div className="relative h-full bg-gradient-to-br from-slate-50 via-white to-gray-100 rounded-3xl border border-gray-200 shadow-xl p-6 sm:p-8 lg:p-10 overflow-hidden">
                        <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-40"></div>

                        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-pink-100 rounded-full blur-3xl opacity-40"></div>
                        <div className="flex items-center justify-center h-full min-h-[500px] lg:min-h-[650px]">
                            <img
                                src={selectedImage}
                                alt={product.title}
                                className="w-full h-[420px] sm:h-[500px] lg:h-[580px] object-contain transition-transform duration-300 hover:scale-105"
                            />
                        </div>

                    </div>

                </div>

                {/* Product Info */}
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8 h-fit">
                    <h1 className="text-5xl font-bold text-[#1F2340] leading-tight">
                        {product.title}
                    </h1>
                    {/* Brand */}
                    <p className="text-sm uppercase tracking-widest text-gray-500 mt-3">
                        Brand: {product.brand}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mt-4">

                        <div className="flex items-center">
                            <Star
                                size={18}
                                className="fill-yellow-400 text-yellow-400"
                            />
                        </div>

                        <span className="font-semibold text-gray-800">
                            {product.rating || 5}
                        </span>

                        <span className="text-gray-500 text-sm">
                            ({product.reviews?.length || 128} Reviews)
                        </span>

                    </div>

                    {/* Price */}
                    <div className="mt-8 flex items-center gap-5">

                        <span className="text-5xl font-bold text-[#1F2340]">
                            ${product.price}
                        </span>

                        <span className="text-2xl text-gray-400 line-through">
                            $
                            {(
                                product.price +
                                (product.price * product.discountPercentage) / 100
                            ).toFixed(2)}
                        </span>

                        <span className="bg-red-100 text-red-600 font-semibold px-4 py-2 rounded-full text-sm">
                            {Math.round(product.discountPercentage)}% OFF
                        </span>

                    </div>
                    <div className="mt-8 space-y-5">

                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">
                                <ShieldCheck className="text-green-600" size={20} />
                            </div>

                            <div>
                                <p className="font-semibold text-[#1F2340]">
                                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Ready to ship today
                                </p>
                            </div>
                        </div>
                        {/* Product Highlights */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">

                            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 hover:shadow-md transition">
                                <ShieldCheck className="text-green-600 mb-3" size={24} />
                                <h3 className="font-semibold text-[#1F2340]">
                                    In Stock
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    Ready to ship
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 hover:shadow-md transition">
                                <Truck className="text-blue-600 mb-3" size={24} />
                                <h3 className="font-semibold text-[#1F2340]">
                                    Free Delivery
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    3–5 Business Days
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 hover:shadow-md transition">
                                <RotateCcw className="text-purple-600 mb-3" size={24} />
                                <h3 className="font-semibold text-[#1F2340]">
                                    Easy Returns
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    7-Day Return
                                </p>
                            </div>

                        </div>
                        {/* Description */}
                        <div className="mt-8">
                            <h2 className="text-2xl font-bold text-[#1F2340]">
                                Description
                            </h2>

                            <p className="mt-4 text-gray-600 leading-8 text-[17px]">
                                {product.description}
                            </p>
                        </div>
                        {/* Quantity */}
                        <div className="mt-10">

                            <h2 className="text-lg font-semibold text-[#1F2340] mb-4">
                                Quantity
                            </h2>

                            <div className="flex items-center w-fit rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">

                                <button
                                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                                    className="w-14 h-14 flex items-center justify-center hover:bg-gray-100 transition"
                                >
                                    <Minus size={18} />
                                </button>

                                <div className="w-16 h-14 flex items-center justify-center text-lg font-semibold border-x border-gray-200">
                                    {quantity}
                                </div>

                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-14 h-14 flex items-center justify-center hover:bg-gray-100 transition"
                                >
                                    <Plus size={18} />
                                </button>

                            </div>

                        </div>
                        {/* Add to Cart Button */}
                        <div className="mt-10 flex flex-row gap-3">

                            {/* Wishlist Button */}
                            <button
                                onClick={handleWishlist}
                                className="w-14 h-14 rounded-2xl border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-all duration-300"
                            >
                                <Heart
                                    size={22}
                                    className={`transition-colors duration-300 ${wishlisted
                                        ? "text-red-500 fill-red-500"
                                        : "text-gray-600 hover:text-red-500"
                                        }`}
                                />
                            </button>

                            {/* Add to Cart */}
                            <button
                                onClick={handleAddToCart}
                                disabled={isAdding}
                                className="flex-1 h-14 rounded-2xl bg-[#1F2340] text-white font-semibold flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base hover:bg-[#2f3564] hover:shadow-xl transition-all duration-300 disabled:opacity-70"
                            >
                                {isAdding ? (
                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <ShoppingCart size={20} />
                                        Add to Cart
                                    </>
                                )}
                            </button>

                        </div>
                    </div>

                </div>
            </div>
            <LoginRequiredModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />
        </div>
    );
};

export default ProductDetails;