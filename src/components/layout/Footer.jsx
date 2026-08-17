function Footer() {

    return (

        <footer className="bg-[#1F2340] text-white">


            <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16">


                <div className="grid md:grid-cols-4 gap-10">


                    {/* Brand */}
                    <div className="md:col-span-1">

                        <h2 className="text-3xl font-bold">
                            ShopEase
                        </h2>


                        <p className="mt-4 text-gray-300 leading-relaxed">
                            Making online shopping simple,
                            secure, and enjoyable for everyone.
                        </p>


                    </div>



                    {/* Shop */}
                    <div>

                        <h3 className="text-lg font-semibold">
                            Shop
                        </h3>


                        <ul className="mt-4 space-y-3 text-gray-300">

                            <li>
                                Home
                            </li>

                            <li>
                                Shop
                            </li>

                            <li>
                                Categories
                            </li>

                            <li>
                                About
                            </li>

                        </ul>

                    </div>



                    {/* Support */}
                    <div>

                        <h3 className="text-lg font-semibold">
                            Support
                        </h3>


                        <ul className="mt-4 space-y-3 text-gray-300">

                            <li>
                                Contact Us
                            </li>

                            <li>
                                Help Center
                            </li>

                            <li>
                                Returns
                            </li>

                            <li>
                                Privacy Policy
                            </li>

                        </ul>

                    </div>




                    {/* Contact */}
                    <div>

                        <h3 className="text-lg font-semibold">
                            Contact
                        </h3>


                        <ul className="mt-4 space-y-3 text-gray-300">

                            <li>
                                support@shopease.com
                            </li>

                            <li>
                                +91 98765 43210
                            </li>

                            <li>
                                India
                            </li>

                        </ul>


                    </div>


                </div>



                {/* Bottom */}
                <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between gap-4 text-sm text-gray-400">


                    <p>
                        © 2026 ShopEase. All rights reserved.
                    </p>


                    <p>
                        Built with ❤️ for better shopping
                    </p>


                </div>


            </div>


        </footer>

    );

}


export default Footer;