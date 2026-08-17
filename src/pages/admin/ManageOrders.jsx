import { useEffect, useState } from "react";
import {
    getAllOrders,
    updateOrderStatus
} from "../../services/orderService";
import { getUsers } from "../../services/userService";


function ManageOrders() {


    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);


    const loadOrders = async () => {

        const ordersData = await getAllOrders();

        const usersData = await getUsers();


        setOrders(ordersData);

        setUsers(usersData);

    };



    useEffect(() => {

        loadOrders();

    }, []);



    const handleStatusChange = async (id, status) => {


        const updated = await updateOrderStatus(
            id,
            status
        );


        setOrders(
            orders.map(order =>
                order.id === id
                    ? updated
                    : order
            )
        );

    };



    return (

        <div className="min-h-screen bg-[#F8F7FC] py-16">


            <div className="max-w-6xl mx-auto px-5">


                <h1 className="text-4xl font-bold text-[#1F2340]">
                    Manage Orders
                </h1>


                <p className="text-gray-500 mt-2">
                    Track and update customer orders
                </p>



                <div className="space-y-6 mt-8">


                    {
                        orders.map(order => (


                            <div
                                key={order.id}
                                className="bg-white rounded-3xl p-6 shadow-sm"
                            >


                                <div className="flex justify-between items-center">


                                    <div>

                                        <h2 className="font-bold text-[#1F2340]">
                                            Order #{order.id}
                                        </h2>


                                        {
                                            users
                                                .filter(user => user.id === order.userId)
                                                .map(user => (

                                                    <div key={user.id}>

                                                        <p className="text-gray-500 mt-1">
                                                            Customer: {user.name}
                                                        </p>

                                                        <p className="text-gray-500 text-sm">
                                                            {user.email}
                                                        </p>

                                                    </div>

                                                ))
                                        }


                                        <p className="mt-2 font-semibold">
                                            Total: ${order.total}
                                        </p>

                                    </div>




                                    <div>


                                        <select

                                            value={order.status}

                                            onChange={(e) =>
                                                handleStatusChange(
                                                    order.id,
                                                    e.target.value
                                                )
                                            }

                                            className="border rounded-xl px-4 py-2"

                                        >

                                            <option>
                                                Confirmed
                                            </option>

                                            <option>
                                                Processing
                                            </option>

                                            <option>
                                                Shipped
                                            </option>

                                            <option>
                                                Delivered
                                            </option>


                                        </select>


                                    </div>


                                </div>



                                <div className="mt-5 border-t pt-5">


                                    <p className="font-semibold">
                                        Products
                                    </p>


                                    {
                                        order.items?.map(item => (

                                            <div
                                                key={item.id}
                                                className="flex justify-between text-sm mt-2"
                                            >

                                                <span>
                                                    {item.title} × {item.quantity}
                                                </span>


                                                <span>
                                                    ${item.price}
                                                </span>

                                            </div>

                                        ))
                                    }


                                </div>



                            </div>


                        ))
                    }


                </div>



            </div>


        </div>

    );

}


export default ManageOrders;