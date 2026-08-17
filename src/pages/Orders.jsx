import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";
import { ShoppingBag } from "lucide-react";

function Orders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchOrders = async () => {

            const user = getCurrentUser();

            if (!user) {
                setLoading(false);
                return;
            }


            try {

                const response = await fetch(
                    `http://localhost:3000/orders?userId=${user.id}`
                );


                const data = await response.json();

                setOrders(data);


            } catch (error) {

                console.log("Error fetching orders:", error);

            } finally {

                setLoading(false);

            }

        };


        fetchOrders();

    }, []);



    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8F7FC]">
                Loading orders...
            </div>
        );

    }



    return (

        <div className="min-h-screen bg-[#F8F7FC] py-16">


            <div className="max-w-5xl mx-auto px-5">


                <h1 className="text-4xl font-bold text-[#1F2340]">
                    My Orders
                </h1>


                <p className="mt-2 text-gray-500">
                    Track and manage your purchases
                </p>



                {orders.length === 0 ? (

                    // Empty state

                    <div className="mt-10 bg-white rounded-3xl p-12 text-center">


                        <div className="w-20 h-20 mx-auto rounded-full bg-[#E8EBFF] flex items-center justify-center">

                            <ShoppingBag
                                size={38}
                                strokeWidth={1.8}
                                className="text-[#7C8CF8]"
                            />

                        </div>


                        <h2 className="mt-5 text-2xl font-bold text-[#1F2340]">
                            No Orders Yet
                        </h2>


                        <p className="mt-3 text-gray-500">
                            You haven't placed any orders yet.
                        </p>


                        <Link
                            to="/shop"
                            className="inline-block mt-6 px-7 py-3 rounded-full bg-[#1F2340] text-white"
                        >
                            Start Shopping
                        </Link>


                    </div>


                ) : (


                    <div className="mt-10 space-y-5">


                        {orders.map((order) => (

                            <div
                                key={order.id}
                                className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition"
                            >


                                {/* Header */}

                                <div className="flex justify-between items-start">

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Order ID
                                        </p>

                                        <h2 className="text-xl font-bold text-[#1F2340]">
                                            #{order.id}
                                        </h2>

                                        <p className="text-gray-500 mt-2">
                                            {order.date}
                                        </p>

                                    </div>


                                    <div className="text-right">

                                        <p className="text-xl font-bold text-[#1F2340]">
                                            ${Number(order.total).toFixed(2)}
                                        </p>


                                        <span className="inline-block mt-3 px-4 py-2 rounded-full bg-[#EEF0FF] text-[#7C8CF8] text-sm font-medium">
                                            {order.status}
                                        </span>

                                    </div>


                                </div>




                                {/* Products Preview */}

                                <div className="mt-6 space-y-3">


                                    {order.items?.slice(0, 2).map((item) => (

                                        <div
                                            key={item.id}
                                            className="flex items-center gap-4 bg-[#F8F7FC] rounded-2xl p-3"
                                        >

                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                                className="w-16 h-16 object-contain rounded-xl bg-white"
                                            />


                                            <div className="flex-1">

                                                <h3 className="font-semibold text-[#1F2340]">
                                                    {item.title}
                                                </h3>


                                                <p className="text-sm text-gray-500">
                                                    Quantity: {item.quantity}
                                                </p>


                                            </div>


                                            <p className="font-semibold">
                                                ${item.price}
                                            </p>


                                        </div>

                                    ))}


                                </div>




                                {/* Footer */}

                                <div className="mt-6 pt-5 border-t flex justify-between items-center">


                                    <p className="text-gray-500 text-sm">
                                        {order.items?.length || 0} Items
                                    </p>



                                    <Link
                                        to={`/orders/${order.id}`}
                                        className="bg-[#1F2340] text-white px-6 py-3 rounded-full text-sm hover:bg-[#343a5a] transition"
                                    >
                                        View Details
                                    </Link>


                                </div>


                            </div>

                        ))}


                    </div>

                )}


            </div>


        </div>

    );
}


export default Orders;