import cartApi from "../api/cartApi";
import { getCurrentUser } from "../utils/auth";

// Get all cart items
export const getCartItems = async () => {
    try {
        const currentUser = getCurrentUser();

        if (!currentUser) return [];

        const response = await cartApi.get(`/cart?userId=${currentUser.id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Add item to cart
// Add item to cart
export const addToCart = async (cartItem) => {
    try {
        console.log("Step 1: addToCart started");

        // Check if product already exists in cart
        const existingItems = await cartApi.get(
            `/cart?userId=${cartItem.userId}&productId=${cartItem.productId}`
        );

        console.log("Step 2: GET completed", existingItems.data);

        if (existingItems.data.length > 0) {
            console.log("Step 3: Product already exists");

            const existingItem = existingItems.data[0];

            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + cartItem.quantity,
            };

            const response = await cartApi.put(
                `/cart/${existingItem.id}`,
                updatedItem
            );

            console.log("Step 4: PUT completed");

            return response.data;
        }

        console.log("Step 5: Product not found, creating new item");

        const response = await cartApi.post("/cart", cartItem);

        console.log("Step 6: POST completed");

        return response.data;
    } catch (error) {
        console.error("Cart Service Error:", error);
        throw error;
    }
};

// Remove item from cart
export const removeFromCart = async (id) => {
    try {
        await cartApi.delete(`/cart/${id}`);
    } catch (error) {
        throw error;
    }
};

// Update quantity
export const updateCartItem = async (id, updatedItem) => {
    try {
        const response = await cartApi.put(`/cart/${id}`, updatedItem);
        return response.data;
    } catch (error) {
        throw error;
    }
};