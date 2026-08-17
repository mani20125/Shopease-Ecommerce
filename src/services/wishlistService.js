const BASE_URL = "http://localhost:3000/wishlist";

// Get wishlist items of current user
export const getWishlistItems = async (userId) => {
    const response = await fetch(`${BASE_URL}?userId=${userId}`);
    return await response.json();
};

// Check if a product is already in wishlist
export const isWishlisted = async (userId, productId) => {
    const response = await fetch(
        `${BASE_URL}?userId=${userId}&productId=${productId}`
    );

    const items = await response.json();

    return items.length > 0;
};
export const getWishlistItem = async (userId, productId) => {
    const response = await fetch(
        `${BASE_URL}?userId=${userId}&productId=${productId}`
    );

    const items = await response.json();
    return items.length > 0 ? items[0] : null;
};

// Add product to wishlist
export const addToWishlist = async (wishlistItem) => {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(wishlistItem),
    });

    return await response.json();
};

// Remove product from wishlist
export const removeFromWishlist = async (id) => {
    await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });
};