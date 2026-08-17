import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";


const SalesChart = ({ orders }) => {


    const data = orders.map((order, index) => ({

        name: `#${index + 1}`,

        amount: order.total

    }));


    return (

        <div className="bg-white rounded-3xl p-6 shadow-sm mt-8">


            <h2 className="text-2xl font-bold text-[#1F2340] mb-6">
                Sales Overview
            </h2>



            <ResponsiveContainer width="100%" height={350}>

                <BarChart data={data}>


                    <CartesianGrid
                        strokeDasharray="3 3"
                    />


                    <XAxis
                        dataKey="name"
                    />


                    <YAxis />


                    <Tooltip
                        formatter={(value) =>
                            [`$${value}`, "Revenue"]
                        }
                    />


                    <Bar
                        dataKey="amount"
                        fill="#7C8CF8"
                        radius={[10, 10, 0, 0]}
                    />


                </BarChart>


            </ResponsiveContainer>


        </div>

    );

};


export default SalesChart;