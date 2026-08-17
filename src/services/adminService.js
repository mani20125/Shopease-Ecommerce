import adminProductApi from "../api/adminProductApi";
import orderApi from "../api/orderApi";


export const getAdminStats = async () => {

    const products = await adminProductApi.get("/products");

    const users = await fetch(
        "http://localhost:3000/users"
    );

    const orders = await orderApi.get("/orders");


    const usersData = await users.json();


    return {

        products: products.data.length,

        users: usersData.length,

        orders: orders.data.length

    };

};