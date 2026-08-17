import orderApi from "../api/orderApi";
import { getCurrentUser } from "../utils/auth";


export const createOrder = async (cartItems, totalPrice) => {

    const user = getCurrentUser();

    if (!user) {
        throw new Error("User not logged in");
    }


    const order = {

        userId: user.id,

        items: cartItems,

        total: totalPrice,

        status: "Confirmed",

        date: new Date().toLocaleDateString(),

    };


    const response = await orderApi.post("/orders", order);


    return response.data;

};

// Get all orders (Admin)
export const getAllOrders = async () => {

    const response = await orderApi.get("/orders");

    return response.data;

};



// Update order status (Admin)
export const updateOrderStatus = async (id, status) => {

    const response = await orderApi.patch(
        `/orders/${id}`,
        {
            status
        }
    );

    return response.data;

};