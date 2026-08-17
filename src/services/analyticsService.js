import { getAdminProducts } from "./adminProductService";
import { getUsers } from "./userService";
import { getAllOrders } from "./orderService";


export const getAnalytics = async () => {

    const products = await getAdminProducts();

    const users = await getUsers();

    const orders = await getAllOrders();



    const revenue = orders.reduce(
        (total, order) =>
            total + order.total,
        0
    );


    return {

        productsCount: products.length,

        usersCount: users.length,

        ordersCount: orders.length,

        revenue

    };

};