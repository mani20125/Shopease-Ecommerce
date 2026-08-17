import { getCurrentUser } from "../utils/auth";
import { Link } from "react-router-dom";


function Profile() {

    const currentUser = getCurrentUser();


    if (!currentUser) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8F7FC]">

                <div className="text-center">

                    <h2 className="text-2xl font-bold text-[#1F2340]">
                        Please Login
                    </h2>

                    <Link
                        to="/login"
                        className="inline-block mt-5 px-6 py-3 rounded-full bg-[#1F2340] text-white"
                    >
                        Go To Login
                    </Link>

                </div>

            </div>
        );
    }


    return (

        <div className="min-h-screen bg-[#F8F7FC] py-16">

            <div className="max-w-5xl mx-auto px-5">


                {/* Profile Header */}

                <div className="bg-white rounded-3xl p-8 flex items-center gap-6 shadow-sm">


                    <div className="w-24 h-24 rounded-full bg-[#7C8CF8] flex items-center justify-center text-white text-4xl font-bold">

                        {currentUser.name
                            ?.charAt(0)
                            .toUpperCase()
                        }

                    </div>


                    <div>

                        <h1 className="text-3xl font-bold text-[#1F2340]">
                            {currentUser.name}
                        </h1>


                        <p className="mt-2 text-gray-500">
                            {currentUser.email}
                        </p>


                    </div>


                </div>




                {/* Account Information */}

                <div className="mt-8 bg-white rounded-3xl p-8 shadow-sm">


                    <h2 className="text-2xl font-bold text-[#1F2340]">
                        Account Information
                    </h2>


                    <div className="mt-6 grid md:grid-cols-2 gap-5">


                        <div className="bg-[#F8F7FC] rounded-2xl p-5">

                            <p className="text-sm text-gray-500">
                                Full Name
                            </p>

                            <p className="mt-2 font-semibold text-[#1F2340]">
                                {currentUser.name}
                            </p>

                        </div>



                        <div className="bg-[#F8F7FC] rounded-2xl p-5">

                            <p className="text-sm text-gray-500">
                                Email
                            </p>

                            <p className="mt-2 font-semibold text-[#1F2340]">
                                {currentUser.email}
                            </p>

                        </div>


                    </div>


                </div>




                {/* Actions */}

                <div className="mt-8 grid md:grid-cols-3 gap-5">


                    <Link
                        to="/orders"
                        className="bg-white rounded-3xl p-6 hover:shadow-lg transition"
                    >

                        <h3 className="font-bold text-xl text-[#1F2340]">
                            My Orders
                        </h3>

                        <p className="mt-2 text-gray-500">
                            Track your purchases
                        </p>

                    </Link>



                    <Link
                        to="/wishlist"
                        className="bg-white rounded-3xl p-6 hover:shadow-lg transition"
                    >

                        <h3 className="font-bold text-xl text-[#1F2340]">
                            Wishlist
                        </h3>

                        <p className="mt-2 text-gray-500">
                            View saved products
                        </p>

                    </Link>




                    <Link
                        to="/cart"
                        className="bg-white rounded-3xl p-6 hover:shadow-lg transition"
                    >

                        <h3 className="font-bold text-xl text-[#1F2340]">
                            Cart
                        </h3>

                        <p className="mt-2 text-gray-500">
                            View your cart items
                        </p>

                    </Link>


                </div>


            </div>

        </div>

    );
}


export default Profile;