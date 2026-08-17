import { FaArrowRight } from "react-icons/fa6";
import furniture from "../../assets/categoryimages/furniturecategory.webp";
import men from "../../assets/categoryimages/menscategory.webp";
import women from "../../assets/categoryimages/womencategory.webp";
import electronics from "../../assets/categoryimages/electroniccategory.webp";
import beauty from "../../assets/categoryimages/beautycategory.webp";
import watches from "../../assets/categoryimages/watchescategory.webp";
import accessories from "../../assets/categoryimages/accessorycategory.webp";
import { useNavigate } from "react-router-dom";
const categories = [
    {
        title: "Furniture",
        category: [
            "furniture"
        ],
        image: furniture,
    },

    {
        title: "Men's Wear",
        category: [
            "mens-shirts",
            "mens-shoes"
        ],
        image: men,
    },

    {
        title: "Women's Wear",
        category: [
            "womens-dresses",
            "womens-shoes",
            "womens-jewellery"
        ],
        image: women,
    },

    {
        title: "Electronics",
        category: [
            "smartphones",
            "laptops",
            "tablets",
            "mobile-accessories"
        ],
        image: electronics,
    },

    {
        title: "Beauty",
        category: [
            "beauty",
            "fragrances",
            "skin-care"
        ],
        image: beauty,
    },

    {
        title: "Watches",
        category: [
            "mens-watches",
            "womens-watches"
        ],
        image: watches,
    },

    {
        title: "Accessories",
        category: [
            "sunglasses",
            "bags",
            "jewellery"
        ],
        image: accessories,
    },
];
const Categories = () => {
    const navigate = useNavigate();
    return (
        <section className="py-14 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-5 lg:px-8">

                <h2 className="text-3xl lg:text-4xl font-bold text-center text-[#1F2340]">
                    Shop by Categories
                </h2>

                <p className="text-sm lg:text-base text-gray-500 text-center mt-3 lg:mt-4 max-w-xl mx-auto">
                    Discover our carefully curated collections designed for every style,
                    occasion, and lifestyle.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 mt-12">

                    {categories.map((category) => (

                        <div
                            key={category.title}
                            onClick={() =>
                                navigate(
                                    `/category/${encodeURIComponent(JSON.stringify(category.category))}?title=${category.title}`
                                )
                            }
                            className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer"
                        >

                            <div className="relative overflow-hidden">

                                <img
                                    src={category.image}
                                    alt={category.title}
                                    className="w-full h-44 md:h-60 lg:h-72 object-contain bg-[#F8F7FC] transition-transform duration-700 group-hover:scale-105"
                                />

                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-500 flex items-center justify-center">

                                    <button className="opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-500 bg-white text-[#1F2340] px-6 py-3 rounded-full font-medium shadow-lg">
                                        Shop Now
                                    </button>

                                </div>

                            </div>

                            <div className="flex justify-between items-center p-3 lg:p-6">

                                <h3 className="text-sm lg:text-xl font-semibold text-[#1F2340] leading-tight">
                                    {category.title}
                                </h3>

                                <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-full bg-[#F4F3FF] flex items-center justify-center group-hover:bg-[#1F2340] group-hover:text-white transition-all duration-300">
                                    <FaArrowRight />
                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>
        </section>
    );
};

export default Categories;