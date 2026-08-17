import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCartItems, removeFromCart } from "../services/cartService";
import { createOrder } from "../services/orderService";
import { User, Mail, CreditCard } from "lucide-react";
import { getCurrentUser } from "../utils/auth";

function Checkout() {

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const currentUser = getCurrentUser();


    useEffect(() => {

        const loadCart = async () => {

            const data = await getCartItems();

            setCartItems(data);

            setLoading(false);

        };


        loadCart();

    }, []);



    const totalPrice = cartItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );



    const handlePlaceOrder = async () => {

        try {


            const order = await createOrder(
                cartItems,
                totalPrice
            );


            for (const item of cartItems) {

                await removeFromCart(item.id);

            }


            alert("Order placed successfully");


            navigate("/order-success", {
                state: {
                    orderId: order.id
                }
            });


        } catch (error) {

            console.log(error);

            alert("Failed to place order");

        }

    };



    if (loading) {
        return (
            <div className="py-20 text-center">
                Loading checkout...
            </div>
        );
    }



    return (

        <div className="min-h-screen bg-[#F8F7FC] py-16">


            <div className="max-w-6xl mx-auto px-5">


                {/* Header */}

                <div>

                    <h1 className="text-4xl font-bold text-[#1F2340]">
                        Checkout
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Complete your purchase securely
                    </p>

                </div>




                <div className="grid lg:grid-cols-3 gap-8 mt-10">



                    {/* Left Section */}

                    <div className="lg:col-span-2 space-y-6">



                        {/* Customer Card */}

                        <div className="bg-white rounded-3xl p-6 shadow-sm">

                            <h2 className="text-xl font-bold text-[#1F2340]">
                                Delivery Information
                            </h2>


                            <div className="mt-5 space-y-3">


                                <div className="flex items-center gap-3 text-gray-600">

                                    <User size={20} className="text-[#7C8CF8]" />

                                    <span>
                                        {currentUser?.name}
                                    </span>

                                </div>



                                <div className="flex items-center gap-3 text-gray-600">

                                    <Mail size={20} className="text-[#7C8CF8]" />

                                    <span>
                                        {currentUser?.email}
                                    </span>

                                </div>


                            </div>


                        </div>




                        {/* Products */}

                        <div className="bg-white rounded-3xl p-6">


                            <h2 className="text-xl font-bold text-[#1F2340]">
                                Your Items
                            </h2>



                            <div className="mt-5 space-y-5">


                                {cartItems.map((item) => (


                                    <div
                                        key={item.id}
                                        className="flex items-center gap-5 border-b pb-5 last:border-none"
                                    >


                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="w-24 h-24 rounded-2xl bg-gray-50 object-contain p-2"
                                        />



                                        <div className="flex-1">


                                            <h3 className="font-semibold text-[#1F2340]">
                                                {item.title}
                                            </h3>


                                            <p className="text-gray-500 mt-1">
                                                Quantity: {item.quantity}
                                            </p>


                                        </div>



                                        <p className="font-bold text-[#1F2340]">

                                            ${(item.price * item.quantity).toFixed(2)}

                                        </p>


                                    </div>


                                ))}


                            </div>


                        </div>




                        {/* Payment */}

                        <div className="bg-white rounded-3xl p-6">


                            <h2 className="text-xl font-bold text-[#1F2340]">
                                Payment Method
                            </h2>


                            <div className="mt-5 space-y-3">


                                <div className="flex items-center gap-3 border rounded-2xl p-4">

                                    <input
                                        type="radio"
                                        checked
                                        readOnly
                                    />

                                    <CreditCard size={20} className="text-[#7C8CF8]" />

                                    <span>
                                        Cash on Delivery
                                    </span>

                                </div>


                                <div className="flex items-center gap-3 border rounded-2xl p-4 text-gray-400">

                                    <input
                                        type="radio"
                                        disabled
                                    />

                                    <span>
                                        Online Payment (Coming Soon)
                                    </span>

                                </div>


                            </div>


                        </div>


                    </div>





                    {/* Summary */}

                    <div className="bg-white rounded-3xl p-6 h-fit shadow-sm sticky top-24">


                        <h2 className="text-2xl font-bold text-[#1F2340]">
                            Order Summary
                        </h2>



                        <div className="mt-6 space-y-4">


                            <div className="flex justify-between text-gray-600">

                                <span>
                                    Subtotal
                                </span>

                                <span>
                                    ${totalPrice.toFixed(2)}
                                </span>

                            </div>



                            <div className="flex justify-between text-gray-600">

                                <span>
                                    Shipping
                                </span>

                                <span className="text-green-600">
                                    Free
                                </span>

                            </div>


                        </div>



                        <hr className="my-6" />



                        <div className="flex justify-between text-xl font-bold">

                            <span>
                                Total
                            </span>


                            <span>
                                ${totalPrice.toFixed(2)}
                            </span>

                        </div>




                        <button
                            onClick={handlePlaceOrder}
                            className="w-full mt-6 bg-[#1F2340] text-white py-4 rounded-2xl font-semibold hover:bg-[#343a5a] transition"
                        >

                            Place Order

                        </button>


                    </div>



                </div>


            </div>


        </div>

    );

}


export default Checkout;