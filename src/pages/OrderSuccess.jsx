import { Link, useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";


function OrderSuccess() {

    const location = useLocation();

    const orderId = location.state?.orderId;


    return (

        <div className="min-h-screen bg-[#F8F7FC] flex items-center justify-center px-5">


            <div className="bg-white rounded-3xl p-10 text-center max-w-md shadow-sm">


                <div className="flex justify-center">

                    <CheckCircle
                        size={80}
                        className="text-green-500"
                        strokeWidth={1.5}
                    />

                </div>



                <h1 className="mt-6 text-3xl font-bold text-[#1F2340]">
                    Order Placed Successfully!
                </h1>



                <p className="mt-4 text-gray-500">
                    Thank you for shopping with ShopEase.
                    Your order has been confirmed.
                </p>



                {orderId && (

                    <div className="mt-6 bg-[#F8F7FC] rounded-2xl p-4">

                        <p className="text-sm text-gray-500">
                            Order ID
                        </p>


                        <p className="font-bold text-[#1F2340]">
                            #{orderId}
                        </p>

                    </div>

                )}



                <div className="mt-8 flex flex-col gap-3">


                    <Link
                        to="/orders"
                        className="bg-[#1F2340] text-white py-3 rounded-full hover:bg-[#343a5a] transition"
                    >
                        View My Orders
                    </Link>



                    <Link
                        to="/shop"
                        className="border border-[#1F2340] text-[#1F2340] py-3 rounded-full hover:bg-gray-50 transition"
                    >
                        Continue Shopping
                    </Link>


                </div>


            </div>


        </div>

    );
}


export default OrderSuccess;