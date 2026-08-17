import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../services/cartService";
import { Heart, ShoppingCart } from "lucide-react";
import { getCurrentUser } from "../utils/auth";
import {
    getWishlistItems,
    removeFromWishlist,
} from "../services/wishlistService";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const navigate = useNavigate();

    const user = getCurrentUser();

    const handleRemove = async (id) => {
        await removeFromWishlist(id);

        setWishlist((prevWishlist) =>
            prevWishlist.filter((item) => item.id !== id)
        );
    };
    const handleAddToCart = async (item) => {
        await addToCart({
            userId: user.id,
            productId: item.productId,
            title: item.title,
            price: item.price,
            thumbnail: item.thumbnail,
            quantity: 1,
        });
        await removeFromWishlist(item.id);

        setWishlist((prevWishlist) =>
            prevWishlist.filter((wishlistItem) => wishlistItem.id !== item.id)
        );
    };

    useEffect(() => {
        const fetchWishlist = async () => {
            if (!user) return;

            const items = await getWishlistItems(user.id);

            setWishlist(items);
        };

        fetchWishlist();
    }, [user]);

    return (
        <div className="max-w-7xl mx-auto px-5 py-10">
            {wishlist.length > 0 && (

                <div className="bg-gradient-to-r from-[#1F2340] to-[#7C8CF8] rounded-3xl py-8 px-8 text-white mb-10">

                    <div className="flex items-center gap-4">

                        <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center">
                            <Heart
                                size={34}
                                className="fill-white text-white"
                            />
                        </div>

                        <div>

                            <h1 className="text-4xl font-bold">
                                My Wishlist
                            </h1>

                            <p className="text-white/80 mt-1">
                                Save your favourite products and shop them anytime.
                            </p>

                        </div>

                    </div>

                    <div className="mt-8">

                        <div className="inline-flex bg-white/15 backdrop-blur-md rounded-full px-5 py-2">
                            <span className="font-semibold">
                                {wishlist.length}
                            </span>
                            &nbsp;
                            {wishlist.length === 1 ? "Saved Item" : "Saved Items"}
                        </div>

                    </div>

                </div>

            )}

            {wishlist.length === 0 ? (

                <div className="flex flex-col items-center justify-center py-24">

                    <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center">

                        <Heart
                            size={55}
                            strokeWidth={1.5}
                            className="text-gray-400"
                        />

                    </div>

                    <h2 className="mt-8 text-3xl font-bold text-[#1F2340]">
                        Your Wishlist is Empty
                    </h2>

                    <p className="mt-3 text-gray-500 text-center max-w-md">
                        Looks like you haven't saved any products yet.
                        Start exploring and save your favourites.
                    </p>

                    <button
                        onClick={() => navigate("/")}
                        className="mt-8 bg-[#7C8CF8] hover:bg-[#6979f5] text-white px-8 py-3 rounded-xl font-medium transition"
                    >
                        Continue Shopping
                    </button>

                </div>

            ) : (

                <div className="space-y-6 mt-8">

                    {wishlist.map((item) => (

                        <div
                            key={item.id}
                            className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                        >
                            <div className="flex flex-col md:flex-row">

                                {/* Product Image */}
                                <div className="w-full md:w-72 h-72 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="max-h-full object-contain hover:scale-105 transition duration-300"
                                    />
                                </div>

                                {/* Product Details */}
                                <div className="flex-1 p-6 flex flex-col justify-between">

                                    <div>

                                        <p className="text-sm text-[#7C8CF8] font-semibold uppercase tracking-wide">
                                            {item.brand}
                                        </p>

                                        <h2 className="text-3xl font-bold text-[#1F2340] mt-2 leading-tight">
                                            {item.title}
                                        </h2>

                                        <div className="flex items-center gap-4 mt-4">

                                            <span className="flex items-center gap-1 text-yellow-500 font-medium">
                                                ⭐ {item.rating}
                                            </span>

                                        </div>

                                        <div className="mt-6">

                                            <div className="flex items-center gap-3">
                                                <span className="text-3xl font-bold text-[#1F2340]">
                                                    ${item.price}
                                                </span>

                                                <span className="text-sm text-green-600 font-medium bg-green-100 px-3 py-1 rounded-full">
                                                    In Stock
                                                </span>
                                            </div>

                                        </div>

                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 mt-8">

                                        <button
                                            onClick={() => navigate(`/product/${item.productId}`)}
                                            className="flex-1 bg-[#1F2340] text-white py-3 rounded-xl font-semibold hover:bg-[#2d335e] hover:shadow-lg transition-all duration-300"
                                        >
                                            View Details
                                        </button>

                                        <button
                                            onClick={async () => {
                                                await handleAddToCart(item);
                                            }}
                                            className="flex-1 bg-[#7C8CF8] text-white py-3 rounded-xl font-semibold hover:bg-[#6979f5] hover:shadow-lg transition-all duration-300"
                                        >
                                            <div className="flex items-center justify-center gap-2">
                                                <ShoppingCart size={18} />
                                                <span>Add to Cart</span>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => handleRemove(item.id)}
                                            className="px-6 py-3 rounded-xl border border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition-all duration-300"
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            )}
        </div>
    );
};

export default Wishlist;