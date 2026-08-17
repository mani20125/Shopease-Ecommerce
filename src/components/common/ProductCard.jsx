import { useState, useEffect } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../utils/auth";
import {
  addToWishlist,
  getWishlistItem,
  removeFromWishlist,
} from "../../services/wishlistService";


const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [wishlisted, setWishlisted] = useState(false);
  useEffect(() => {
    const checkWishlist = async () => {
      const user = getCurrentUser();

      if (!user) {
        setWishlisted(false);
        return;
      }

      const wishlistItem = await getWishlistItem(user.id, product.id);

      setWishlisted(!!wishlistItem);
    };

    checkWishlist();
  }, [product.id]);

  const handleWishlist = async (e) => {
    e.stopPropagation();

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
  };
  console.log(product);
  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
    >

      {/* Product Image */}
      <div className="relative overflow-hidden">

        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Discount Badge */}
        <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
          -{Math.round(product.discountPercentage)}%
        </span>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-red-500 hover:text-white transition"
        >
          <FaHeart
            className={`transition-colors duration-300 ${wishlisted
                ? "text-red-500"
                : "text-gray-500 group-hover:text-red-500"
              }`}
          />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-5">

        {/* Brand */}
        <p className="text-sm text-gray-500">
          {product.brand}
        </p>

        {/* Product Name */}
        <h3 className="mt-1 text-lg font-semibold text-[#1F2340] line-clamp-2">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-3">
          <FaStar className="text-yellow-400" />
          <span className="text-sm font-medium">
            {product.rating}
          </span>
        </div>

        {/* Price & Cart */}
        <div className="flex items-center justify-between mt-5">

          <h4 className="text-2xl font-bold text-[#1F2340]">
            ${product.price}
          </h4>

          <button className="w-11 h-11 rounded-full bg-[#1F2340] text-white flex items-center justify-center hover:scale-110 transition">
            <FiShoppingCart />
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;