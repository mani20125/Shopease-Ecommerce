import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import {
    ChevronLeft,
    ChevronRight,
    Package,
    Users,
    Truck,
} from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import accessories from "../../assets/heroImages/premaccessories.webp";
import beauty from "../../assets/heroImages/cosmetics.webp";
import electronics from "../../assets/heroImages/electronicgadgets.webp";
import footwear from "../../assets/heroImages/sneakers.webp";
import furniture from "../../assets/heroImages/homefurniture.webp";
import handbags from "../../assets/heroImages/bags.webp";
import menswear from "../../assets/heroImages/mensfashion.webp";
import watches from "../../assets/heroImages/premiumwatch.webp";
import womenswear from "../../assets/heroImages/womenfashion.webp";
const heroSlides = [
    {
        title: "Furniture",
        subtitle:
            "Transform your home with modern furniture designed for comfort, elegance, and everyday living.",
        button: "Shop Furniture",
        image: furniture,
        category: ["furniture"],
    },
    {
        title: "Men's Wear",
        subtitle:
            "Refresh your wardrobe with premium shirts, t-shirts, jeans, and jackets designed for everyday comfort and timeless style.",
        button: "Shop Men's Collection",
        image: menswear,
        category: [
            "mens-shirts",
            "mens-shoes"
        ],
    },
    {
        title: "Women's Wear",
        subtitle:
            "Explore elegant dresses, trendy outfits, handbags, and accessories curated to match every occasion and personal style.",
        button: "Shop Women's Collection",
        image: womenswear,
        category: [
            "womens-dresses",
            "womens-shoes",
            "womens-jewellery"
        ],
    },
    {
        title: "Electronics",
        subtitle:
            "Discover the latest smartphones, laptops, headphones, and smart gadgets that bring innovation to your everyday life.",
        button: "Shop Electronics",
        image: electronics,
        category: [
            "smartphones",
            "laptops",
            "tablets",
            "mobile-accessories"
        ],
    },
    {
        title: "Beauty",
        subtitle:
            "Shop skincare, makeup, and beauty essentials from trusted brands to help you look and feel your best every day.",
        button: "Shop Beauty",
        image: beauty,
        category: [
            "beauty",
            "fragrances",
            "skin-care"
        ],
    },
    {
        title: "Footwear",
        subtitle:
            "Step into comfort with stylish sneakers, casual shoes, and premium footwear for every season and lifestyle.",
        button: "Shop Footwear",
        image: footwear,
        category: [
            "mens-shoes",
            "womens-shoes"
        ],
    },
    {
        title: "Handbags",
        subtitle:
            "Complete your look with premium handbags and fashion accessories that blend elegance with everyday practicality.",
        button: "Shop Handbags",
        image: handbags,
        category: [
            "womens-bags"
        ],
    },
    {
        title: "Watches",
        subtitle:
            "Discover timeless watches that combine precision, craftsmanship, and modern design for every occasion.",
        button: "Shop Watches",
        image: watches,
        category: [
            "mens-watches",
            "womens-watches"
        ],
    },
    {
        title: "Accessories",
        subtitle:
            "Find sunglasses, wallets, belts, jewelry, and more to add the perfect finishing touch to your everyday style.",
        button: "Shop Accessories",
        image: accessories,
        category: [
            "sunglasses",
            "bags",
            "jewellery"
        ],
    },
];
function Hero() {
    const [activeSlide, setActiveSlide] = useState(0);
    const navigate = useNavigate();
    const swiperRef = useRef(null);
    return (
        <section className="w-full">
            <div className="w-full bg-[#F8F7FC] py-10 lg:py-14">
                <div className="max-w-7xl mx-auto px-5 lg:px-12 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[520px]">
                    {/* Left */}
                    {/* Left */}
                    <div className="relative order-2 lg:order-1">

                        <AnimatePresence mode="wait">

                            <motion.div
                                key={activeSlide}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.5 }}
                            >

                                <p className="uppercase tracking-[0.25em] text-xs lg:text-sm text-gray-500 mb-4 lg:mb-6">
                                    New Collection
                                </p>

                                <h1 className="fade-up text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight lg:leading-[0.95] text-[#1F2340] transition-all duration-500">
                                    {heroSlides[activeSlide].title}
                                </h1>

                                <p className="fade-up mt-5 lg:mt-8 text-base lg:text-lg leading-7 lg:leading-8 max-w-xl text-gray-500 transition-all duration-500">
                                    {heroSlides[activeSlide].subtitle}
                                </p>

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/category/${encodeURIComponent(
                                                JSON.stringify(heroSlides[activeSlide].category)
                                            )}?title=${heroSlides[activeSlide].title}`
                                        )
                                    }
                                    className="mt-8 lg:mt-10 w-full sm:w-fit group bg-[#1F2340] text-white rounded-full pl-6 lg:pl-8 pr-3 py-3 flex items-center justify-between gap-5 hover:shadow-xl hover:scale-105 transition-all duration-300"
                                >

                                    <span className="font-medium">
                                        {heroSlides[activeSlide].button}
                                    </span>

                                    <div className="w-10 h-10 rounded-full bg-white text-[#1F2340] flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                                        →
                                    </div>

                                </button>

                                <div className="mt-8 lg:mt-14 grid grid-cols-3 gap-4 lg:flex lg:flex-wrap lg:gap-10">
                                    {/* Premium Products */}
                                    <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-3">
                                        <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-white shadow-md flex items-center justify-center mx-auto lg:mx-0">
                                            <Package size={20} className="text-[#6D5DF6]" />
                                        </div>

                                        <div className="text-center lg:text-left">
                                            <h4 className="font-bold text-[#1F2340]">500+</h4>
                                            <p className="text-sm text-gray-500">
                                                Premium Products
                                            </p>
                                        </div>
                                    </div>

                                    {/* Happy Customers */}
                                    <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-3">
                                        <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-white shadow-md flex items-center justify-center mx-auto lg:mx-0">
                                            <Users size={20} className="text-[#6D5DF6]" />
                                        </div>

                                        <div className="text-center lg:text-left">
                                            <h4 className="font-bold text-[#1F2340]">10K+</h4>
                                            <p className="text-sm text-gray-500">
                                                Happy Customers
                                            </p>
                                        </div>
                                    </div>

                                    {/* Free Shipping */}
                                    <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-3">
                                        <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-white shadow-md flex items-center justify-center mx-auto lg:mx-0">
                                            <Truck size={20} className="text-[#6D5DF6]" />
                                        </div>

                                        <div className="text-center lg:text-left">
                                            <h4 className="font-bold text-[#1F2340]">Free</h4>
                                            <p className="text-sm text-gray-500">
                                                Shipping
                                            </p>
                                        </div>
                                    </div>

                                </div>

                            </motion.div>

                        </AnimatePresence>

                    </div>

                    {/* Right */}

                    {/* Right */}
                    <div className="relative flex justify-center items-center overflow-hidden lg:overflow-visible order-1 lg:order-2">

                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            className="hidden lg:flex absolute left-0 lg:-left-8 z-30 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center hover:bg-[#1F2340] hover:text-white transition"
                        >
                            <ChevronLeft size={22} />
                        </button>

                        <Swiper
                            modules={[Autoplay, Pagination]}
                            speed={1000}
                            onSwiper={(swiper) => (swiperRef.current = swiper)}
                            slidesPerView={1}
                            loop={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            pagination={{ clickable: true }}
                            onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
                            className="w-[280px] h-[280px] sm:w-[330px] sm:h-[330px] md:w-[420px] md:h-[420px] lg:w-[460px] lg:h-[460px] rounded-[32px] overflow-hidden bg-[#ECECFF] shadow-xl"
                        >
                            {heroSlides.map((slide, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="w-full h-full object-cover transition-all duration-1000"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            className="hidden lg:flex absolute right-0 lg:-right-8 z-30 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center hover:bg-[#1F2340] hover:text-white transition"
                        >
                            <ChevronRight size={22} />
                        </button>


                    </div>

                </div>
            </div>
        </section>
    );
}

export default Hero;