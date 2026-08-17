import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAdminStats } from "../../services/adminService";
import { getAnalytics } from "../../services/analyticsService";
import SalesChart from "../../components/admin/SalesChart";
import { getAllOrders } from "../../services/orderService";
import {
    Package,
    Users,
    ShoppingCart,
    DollarSign
} from "lucide-react";
function AdminDashboard() {
    const [stats, setStats] = useState({
        products: 0,
        users: 0,
        orders: 0
    });
    const [analytics, setAnalytics] = useState({
        productsCount: 0,
        usersCount: 0,
        ordersCount: 0,
        revenue: 0
    });
    const [orders, setOrders] = useState([]);
    const cards = [
        {
            title: "Products",
            value: analytics.productsCount,
            icon: Package,
            path: "/admin/products"
        },
        {
            title: "Users",
            value: analytics.usersCount,
            icon: Users,
            path: "/admin/users"
        },
        {
            title: "Orders",
            value: analytics.ordersCount,
            icon: ShoppingCart,
            path: "/admin/orders"
        },
        {
            title: "Revenue",
            value: `$${analytics.revenue.toFixed(2)}`,
            icon: DollarSign,
        }
    ];

    useEffect(() => {

        const loadAnalytics = async () => {

            const data = await getAnalytics();

            setAnalytics(data);

        };


        loadAnalytics();

    }, []);

    useEffect(() => {

        const loadOrders = async () => {

            const data = await getAllOrders();

            setOrders(data);

        };


        loadOrders();


    }, []);

    useEffect(() => {

        const loadStats = async () => {

            const data = await getAdminStats();

            setStats(data);

        };


        loadStats();

    }, []);

    return (

        <div className="min-h-screen bg-[#F8F7FC] py-16">


            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                {
                    cards.map((card) => {

                        const Icon = card.icon;

                        return (

                            <Link
                                to={card.path}
                                key={card.title}
                                className="
                                bg-white
                                rounded-3xl
                                p-6
                                shadow-sm
                                border
                                border-gray-100
                                hover:shadow-lg
                                transition
                                block
                                "
                            >


                                <div className="
                                            flex    
                                            justify-between    
                                            items-center    
                                            ">


                                    <div>

                                        <p className="text-gray-500">
                                            {card.title}
                                        </p>


                                        <h2 className="
                                                    text-3xl
                                                    font-bold
                                                    text-[#1F2340]
                                                    mt-3
                                                    ">
                                            {card.value}
                                        </h2>


                                    </div>


                                    <div
                                        className="
                                                w-14
                                                h-14
                                                rounded-2xl
                                                bg-[#EEF0FF]
                                                flex
                                                items-center
                                                justify-center
                                                "
                                    >

                                        <Icon
                                            size={28}
                                            className="text-[#7C8CF8]"
                                        />


                                    </div>


                                </div>


                            </Link>

                        )

                    })
                }

            </div>

            <SalesChart orders={orders} />


        </div>

    );

}


export default AdminDashboard;