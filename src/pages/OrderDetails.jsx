import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import orderApi from "../api/orderApi";


function OrderDetails() {

    const { id } = useParams();

    const [order, setOrder] = useState(null);


    useEffect(() => {

        const fetchOrder = async () => {

            try {

                const response = await orderApi.get(
                    `/orders/${id}`
                );

                setOrder(response.data);


            } catch (error) {

                console.log("Failed to load order", error);

            }

        };


        fetchOrder();


    }, [id]);



    if (!order) {

        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading order...
            </div>
        );

    }

    const statuses = [
        "Confirmed",
        "Processing",
        "Shipped",
        "Delivered"
    ];


    const currentStatusIndex = statuses.indexOf(order.status);


    return (

        <div className="min-h-screen bg-[#F8F7FC] py-16">


            <div className="max-w-5xl mx-auto px-5">


                <h1 className="text-4xl font-bold text-[#1F2340]">
                    Order Details
                </h1>


                <p className="mt-2 text-gray-500">
                    Order #{order.id}
                </p>



                <div className="mt-8 bg-white rounded-3xl p-8">


                    <div className="flex justify-between items-center">


                        <div>

                            <h2 className="text-xl font-bold text-[#1F2340]">
                                Products
                            </h2>

                            <p className="text-gray-500 mt-1">
                                Placed on {order.date}
                            </p>

                        </div>


                        <span className="
                            px-4 py-2 rounded-full
                            bg-[#E8EBFF]
                            text-[#7C8CF8]
                        ">
                            {order.status}
                        </span>


                    </div>




                    <div className="mt-8 space-y-5">


                        {order.items.map((item) => (

                            <div
                                key={item.id}
                                className="
                                flex items-center gap-5
                                border-b pb-5
                                "
                            >


                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="
                                    w-20 h-20
                                    object-contain
                                    rounded-xl
                                    bg-gray-50
                                    "
                                />


                                <div className="flex-1">

                                    <h3 className="font-semibold text-[#1F2340]">
                                        {item.title}
                                    </h3>


                                    <p className="text-gray-500 mt-1">
                                        Quantity: {item.quantity}
                                    </p>


                                </div>


                                <p className="font-bold">
                                    ${item.price}
                                </p>


                            </div>

                        ))}


                    </div>
                    <div className="mt-10 border-t pt-8">


                        <h2 className="text-xl font-bold text-[#1F2340]">
                            Order Status
                        </h2>


                        <div className="mt-8">


                            {statuses.map((status, index) => (

                                <div
                                    key={status}
                                    className="flex gap-5"
                                >


                                    {/* Timeline indicator */}
                                    <div className="flex flex-col items-center">


                                        <div
                                            className={`
                                                    w-9 h-9 rounded-full flex items-center justify-center font-semibold
                                                    ${index <= currentStatusIndex
                                                    ? "bg-[#7C8CF8] text-white"
                                                    : "bg-gray-200 text-gray-400"
                                                    }
                                            `}
                                        >
                                            ✓
                                        </div>



                                        {index !== statuses.length - 1 && (

                                            <div
                                                className={`
                                                        w-0.5 h-12
                                                        ${index < currentStatusIndex
                                                        ? "bg-[#7C8CF8]"
                                                        : "bg-gray-200"
                                                    }
                                                `}
                                            />

                                        )}


                                    </div>




                                    {/* Status Text */}
                                    <div className="pb-10">


                                        <h3
                                            className={`
                                                    font-semibold
                                                    ${index <= currentStatusIndex
                                                    ? "text-[#1F2340]"
                                                    : "text-gray-400"
                                                }
                                            `}
                                        >
                                            Order {status}
                                        </h3>


                                        <p className="mt-1 text-sm text-gray-500">
                                            {index === 0 && "Your order has been confirmed"}
                                            {index === 1 && "Your order is being prepared"}
                                            {index === 2 && "Your order is on the way"}
                                            {index === 3 && "Your order has been delivered"}
                                        </p>


                                    </div>


                                </div>

                            ))}


                        </div>


                    </div>


                    <div className="mt-8 flex justify-between text-xl font-bold">

                        <span>
                            Total Amount
                        </span>


                        <span>
                            ${order.total.toFixed(2)}
                        </span>


                    </div>


                </div>


            </div>


        </div>

    );

}


export default OrderDetails;