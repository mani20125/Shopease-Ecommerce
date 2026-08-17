import {
    Sparkles,
    Zap,
    Target,
    Globe
} from "lucide-react";


function WhyChooseUs() {

    const features = [
        {
            icon: Sparkles,
            title: "Curated Collections",
            desc: "Discover carefully selected products across fashion, electronics, and lifestyle categories."
        },
        {
            icon: Zap,
            title: "Seamless Shopping",
            desc: "Enjoy easy search, smart filters, wishlist, and a smooth shopping experience."
        },
        {
            icon: Target,
            title: "Personalized Experience",
            desc: "Find products that match your interests with a simple and intuitive platform."
        },
        {
            icon: Globe,
            title: "Modern Marketplace",
            desc: "A user-friendly shopping destination designed for everyday needs."
        }
    ];


    return (

        <section className="py-20 bg-[#F8F7FC]">

            <div className="max-w-7xl mx-auto px-5 lg:px-8">


                {/* Heading */}
                <div className="text-center max-w-2xl mx-auto">


                    <p className="text-[#7C8CF8] font-semibold tracking-wide">
                        WHY CHOOSE US
                    </p>


                    <h2 className="mt-3 text-4xl font-bold text-[#1F2340]">
                        Why Customers Love ShopEase
                    </h2>


                    <p className="mt-5 text-gray-500">
                        From discovery to checkout, ShopEase
                        creates a simple, reliable, and enjoyable
                        shopping experience.
                    </p>


                </div>



                {/* Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">


                    {features.map((feature) => {

                        const Icon = feature.icon;


                        return (

                            <div
                                key={feature.title}
                                className="bg-white border border-gray-100 rounded-3xl p-6 hover:-translate-y-2 hover:shadow-xl transition duration-300"
                            >


                                <div className="w-14 h-14 rounded-2xl bg-[#EDEBFF] flex items-center justify-center">

                                    <Icon
                                        size={28}
                                        className="text-[#1F2340]"
                                    />

                                </div>



                                <h3 className="mt-6 text-xl font-bold text-[#1F2340]">
                                    {feature.title}
                                </h3>



                                <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                                    {feature.desc}
                                </p>


                            </div>

                        );

                    })}


                </div>


            </div>


        </section>

    );

}


export default WhyChooseUs;