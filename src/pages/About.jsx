import WhyChooseUs from "../components/home/WhyChooseUs";
import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import storyImage from "../assets/story.png";
import { Link } from "react-router-dom";


function About() {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            const data = await getProducts();

            const products = data.products || data;

            setFeaturedProducts([
                products.find(item => item.category === "laptops"),
                products.find(item => item.category === "mens-shirts"),
                products.find(item => item.category === "smartphones"),
                products.find(item => item.category === "mens-shoes"),
            ].filter(Boolean));
        };

        loadProducts();
    }, []);

    return (

        <div>

            {/* Hero Section */}
            <section className="py-20 lg:py-28 bg-[#F8F7FC]">

                <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <div>

                        <p className="text-[#7C8CF8] font-semibold tracking-wide">
                            ABOUT SHOPEASE
                        </p>

                        <h1 className="mt-4 text-4xl md:text-6xl font-bold text-[#1F2340] leading-tight">
                            Your Everyday

                            Marketplace
                            <br />
                            For Everything You Love
                        </h1>


                        <p className="mt-6 text-gray-500 text-lg leading-relaxed max-w-xl">
                            ShopEase brings fashion, electronics, lifestyle products,
                            and daily essentials together in one simple shopping
                            experience.
                        </p>


                        <Link
                            to="/shop"
                            className="inline-block mt-8 px-8 py-3 rounded-full bg-[#1F2340] text-white font-medium hover:bg-[#2f3564] transition"
                        >
                            Explore Products
                        </Link>

                    </div>



                    {/* Product Collage */}
                    <div className="relative h-[520px]">

                        {/* Background Circle */}
                        <div className="absolute inset-10 rounded-full bg-[#F4F3FF]"></div>


                        {/* Floating Products */}

                        {featuredProducts[0] && (
                            <img
                                src={featuredProducts[0].images[0]}
                                alt={featuredProducts[0].title}
                                className="absolute top-10 left-10 w-36 h-36 object-contain bg-white rounded-3xl p-4 shadow-lg rotate-[-8deg]"
                            />
                        )}


                        {featuredProducts[1] && (
                            <img
                                src={featuredProducts[1].images[0]}
                                alt={featuredProducts[1].title}
                                className="absolute top-5 right-12 w-40 h-40 object-contain bg-white rounded-3xl p-4 shadow-lg rotate-6"
                            />
                        )}


                        {featuredProducts[2] && (
                            <img
                                src={featuredProducts[2].images[0]}
                                alt={featuredProducts[2].title}
                                className="absolute bottom-24 left-14 w-40 h-40 object-contain bg-white rounded-3xl p-4 shadow-lg rotate-6"
                            />
                        )}


                        {featuredProducts[3] && (
                            <img
                                src={featuredProducts[3].images[0]}
                                alt={featuredProducts[3].title}
                                className="absolute bottom-20 right-10 w-36 h-36 object-contain bg-white rounded-3xl p-4 shadow-lg rotate-[-6deg]"
                            />
                        )}



                        {/* Center Text */}

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-[-10px]">

                            <div className="text-center">

                                <h3 className="text-3xl font-bold text-[#1F2340]">
                                    ShopEase
                                </h3>

                                <p className="mt-2 text-gray-500">
                                    Everything you love,
                                    <br />
                                    in one place.
                                </p>

                            </div>

                        </div>



                        {/* Bottom Stats */}

                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg px-8 py-4 flex gap-10">

                            <div>
                                <h4 className="font-bold text-xl text-[#1F2340]">
                                    1K+
                                </h4>
                                <p className="text-xs text-gray-500">
                                    Products
                                </p>
                            </div>


                            <div>
                                <h4 className="font-bold text-xl text-[#1F2340]">
                                    5K+
                                </h4>
                                <p className="text-xs text-gray-500">
                                    Customers
                                </p>
                            </div>

                        </div>

                    </div>
                </div>



            </section >



            {/* Our Story Section */}
            <section className="py-20 bg-white">

                <div className="max-w-7xl mx-auto px-5 lg:px-8">

                    <div className="grid lg:grid-cols-2 gap-14 items-center">


                        {/* Left Visual */}
                        <div className="relative h-[520px] rounded-[40px] overflow-hidden">

                            <img
                                src={storyImage}
                                alt="ShopEase Story"
                                className="w-full h-full object-cover"
                            />



                            {/* Dark overlay behind quote */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent">
                            </div>


                            {/* Story Quote Overlay */}
                            <div className="absolute top-12 left-10 max-w-[260px]">

                                <h3 className="text-4xl font-bold leading-tight text-white">
                                    Shopping
                                    <br />
                                    made <span className="text-[#7C8CF8]">
                                        simple.
                                    </span>
                                </h3>


                                <p className="mt-5 text-base text-white/90 leading-relaxed">
                                    We bring everything you love
                                    into one easy shopping
                                    experience.
                                </p>

                            </div>


                        </div>


                        {/* Right Content */}
                        <div>

                            <p className="text-[#7C8CF8] font-semibold tracking-wide">
                                OUR STORY
                            </p>


                            <h2 className="mt-3 text-4xl font-bold text-[#1F2340]">
                                Built To Make Shopping Better
                            </h2>


                            <p className="mt-6 text-gray-500 leading-relaxed">
                                ShopEase was created with a simple idea:
                                bring everything customers need into one
                                convenient online marketplace.
                            </p>


                            <p className="mt-4 text-gray-500 leading-relaxed">
                                From fashion and electronics to lifestyle
                                essentials, we focus on providing quality
                                products with a smooth shopping experience.
                            </p>



                            {/* Features */}

                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">


                                <div className="bg-[#F8F7FC] rounded-2xl p-4">

                                    <h4 className="font-semibold text-[#1F2340]">
                                        ✓ Quality Products
                                    </h4>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Carefully selected products you can trust.
                                    </p>

                                </div>



                                <div className="bg-[#F8F7FC] rounded-2xl p-4">

                                    <h4 className="font-semibold text-[#1F2340]">
                                        ✓ Secure Payments
                                    </h4>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Safe and protected checkout experience.
                                    </p>

                                </div>



                                <div className="bg-[#F8F7FC] rounded-2xl p-4">

                                    <h4 className="font-semibold text-[#1F2340]">
                                        ✓ Fast Delivery
                                    </h4>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Quick delivery right to your doorstep.
                                    </p>

                                </div>



                                <div className="bg-[#F8F7FC] rounded-2xl p-4">

                                    <h4 className="font-semibold text-[#1F2340]">
                                        ✓ Easy Returns
                                    </h4>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Hassle-free return process.
                                    </p>

                                </div>


                            </div>


                        </div>


                    </div>

                </div>

            </section>




            <WhyChooseUs />

        </div >

    );
}


export default About;