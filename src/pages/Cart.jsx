import { useEffect, useState } from "react";
import { Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";



import {
    getCartItems,
    updateCartItem,
    removeFromCart,
} from "../services/cartService";
const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const data = await getCartItems();
                setCartItems(data);
            } catch (error) {
                setError("Failed to load cart.");
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);
    const handleQuantityChange = async (item, change) => {
        const newQuantity = item.quantity + change;

        if (newQuantity < 1) return;

        try {
            const updatedItem = {
                ...item,
                quantity: newQuantity,
            };

            await updateCartItem(item.id, updatedItem);

            setCartItems((prevItems) =>
                prevItems.map((cartItem) =>
                    cartItem.id === item.id ? updatedItem : cartItem
                )
            );
        } catch (error) {
            console.error("Failed to update quantity", error);
        }
    };

    const handleRemove = async (id) => {
        try {
            await removeFromCart(id);

            setCartItems((prevItems) =>
                prevItems.filter((item) => item.id !== id)
            );
        } catch (error) {
            console.error("Failed to remove item", error);
        }
    };

    if (loading) return <h2>Loading Cart...</h2>;

    if (error) return <h2>{error}</h2>;
    if (cartItems.length === 0) {

        return (
            <div className="max-w-7xl mx-auto py-20 px-5">

                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">

                    <div className="w-28 h-28 rounded-full bg-indigo-50 flex items-center justify-center mb-8">

                        <ShoppingCart
                            size={52}
                            className="text-[#1F2340]"
                        />

                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-[#1F2340]">
                        Your Cart is Empty
                    </h1>

                    <p className="text-gray-500 mt-4 max-w-md">
                        Looks like you haven't added any products yet.
                        Start shopping and fill your cart with amazing products.
                    </p>
                    <Link
                        to="/"
                        className="mt-8 inline-flex items-center gap-2 bg-[#1F2340] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#313862] hover:shadow-lg transition-all duration-300"
                    >
                        <ArrowLeft size={18} />
                        Continue Shopping
                    </Link>

                </div>

            </div>
        );
    }

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <div className="max-w-7xl mx-auto py-20 px-5">
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-[#1F2340]">
                    Shopping Cart
                </h1>

                <p className="text-gray-500 mt-2">
                    {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-3xl shadow-md border border-gray-200 p-5 md:p-6 mb-6 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex flex-col md:flex-row gap-6">

                                {/* Product Image */}
                                <div className="flex justify-center md:block">
                                    <div className="w-36 h-36 sm:w-40 sm:h-40 bg-gradient-to-br from-slate-50 to-gray-100 rounded-3xl shadow-sm border border-gray-200 flex items-center justify-center p-4">

                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                                        />

                                    </div>
                                </div>

                                {/* Product Details */}
                                <div className="flex-1">

                                    <h2 className="text-xl font-semibold text-[#1F2340]">
                                        {item.title}
                                    </h2>

                                    <p className="text-gray-500 mt-2">
                                        Price: ${item.price}
                                    </p>

                                    <p className="text-lg font-semibold mt-3">
                                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                                    </p>

                                    <div className="flex flex-wrap items-center justify-between gap-4 mt-6">

                                        <div className="flex items-center rounded-xl border border-gray-200 overflow-hidden">

                                            <button
                                                onClick={() => handleQuantityChange(item, -1)}
                                                className="w-12 h-12 hover:bg-gray-100 transition"
                                            >
                                                -
                                            </button>

                                            <span className="w-12 text-center font-semibold">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() => handleQuantityChange(item, 1)}
                                                className="w-12 h-12 hover:bg-gray-100 transition"
                                            >
                                                +
                                            </button>

                                        </div>

                                        <button
                                            onClick={() => handleRemove(item.id)}
                                            className="flex items-center gap-2 text-red-500 hover:text-red-600 transition"
                                        >
                                            <Trash2 size={18} />
                                            Remove
                                        </button>

                                    </div>

                                </div>

                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-white shadow rounded-xl p-6 h-fit sticky top-24">

                    <h2 className="text-2xl font-bold mb-6">
                        Order Summary
                    </h2>

                    <div className="flex justify-between mb-4">
                        <span>Subtotal</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between mb-4">
                        <span>Shipping</span>
                        <span className="text-green-600">Free</span>
                    </div>

                    <hr className="my-4" />

                    <div className="flex justify-between text-xl font-bold">
                        <span>Total</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>

                    <Link
                        to="/checkout"
                        className="block text-center w-full mt-6 bg-[#1F2340] text-white py-3 rounded-xl hover:bg-[#343a5a] transition"
                    >
                        Proceed to Checkout
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default Cart;