import adminProductApi from "../api/adminProductApi";


// Add product
export const addProduct = async(product)=>{

    const response = await adminProductApi.post(
        "/products",
        product
    );

    return response.data;

};



// Get admin products
export const getAdminProducts = async()=>{

    const response = await adminProductApi.get(
        "/products"
    );

    return response.data;

};



// Delete product
export const deleteProduct = async(id)=>{

    await adminProductApi.delete(
        `/products/${id}`
    );

};

export const getAdminProduct = async (id) => {

    const response = await adminProductApi.get(
        `/products/${id}`
    );

    return response.data;

};



export const updateProduct = async (id, product) => {

    const response = await adminProductApi.put(
        `/products/${id}`,
        product
    );

    return response.data;

};