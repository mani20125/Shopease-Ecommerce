import productApi from "../api/productApi";
import adminProductApi from "../api/adminProductApi";

// Get all products
export const getProducts = async (limit = 0) => {
  try {
    const response = await productApi.get(`/products?limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get a single product
export const getProduct = async (id) => {

    console.log("PRODUCT ID RECEIVED:", id);

    try {

        try {

            const adminResponse = await adminProductApi.get(
                `/products/${id}`
            );

            console.log("ADMIN PRODUCT FOUND:", adminResponse.data);

            return adminResponse.data;


        } catch(error) {

            console.log("Not found in admin products");

        }


        const response = await productApi.get(
            `/products/${id}`
        );


        console.log("DUMMY PRODUCT FOUND:", response.data);

        return response.data;


    } catch(error) {

        console.log("PRODUCT ERROR:", error);

        throw error;

    }

};

// Search products
export const searchProducts = async (query) => {
  try {
    const response = await productApi.get(`/products/search?q=${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get products by category
export const getProductsByCategory = async (categories) => {
  try {
    let allProducts = [];

    for (const category of categories) {
      const response = await productApi.get(
        `/products/category/${category}`
      );

      allProducts = [
        ...allProducts,
        ...response.data.products,
      ];
    }

    return {
      products: allProducts,
    };

  } catch (error) {
    throw error;
  }
};

// Get combined products (DummyJSON + Admin products)

export const getAllProducts = async () => {

  const dummyResponse = await getProducts();

  const adminResponse = await adminProductApi.get("/products");


  const adminProducts = adminResponse.data.map(product => ({
    ...product,

    rating: product.rating || 5,

    reviews: product.reviews || 0,

    discountPercentage: product.discountPercentage || 0,

    brand: product.brand || "ShopEase"

  }));


  return [
    ...adminProducts,
    ...dummyResponse.products
  ];

};