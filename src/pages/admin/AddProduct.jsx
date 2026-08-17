import { useState } from "react";
import { addProduct } from "../../services/adminProductService";
import { useNavigate } from "react-router-dom";


function AddProduct() {

    const navigate = useNavigate();


    const [formData, setFormData] = useState({

        title: "",
        category: "",
        price: "",
        thumbnail: "",
        description: "",
        stock: ""

    });



    const [loading, setLoading] = useState(false);



    const handleChange = (e)=>{

        setFormData({

            ...formData,
            [e.target.name]: e.target.value

        });

    };



    const handleSubmit = async(e)=>{

        e.preventDefault();

        setLoading(true);


        try {


            await addProduct({

                ...formData,

                price:Number(formData.price),

                stock:Number(formData.stock)

            });



            alert("Product added successfully");


            navigate("/admin");


        }
        catch(error){

            console.log(error);

            alert("Failed to add product");

        }
        finally{

            setLoading(false);

        }


    };



    return (

        <div className="min-h-screen bg-[#F8F7FC] py-16">


            <div className="max-w-3xl mx-auto px-5">


                <div className="bg-white rounded-3xl p-8 shadow-sm">


                    <h1 className="text-3xl font-bold text-[#1F2340]">
                        Add Product
                    </h1>


                    <p className="text-gray-500 mt-2">
                        Add a new product to ShopEase
                    </p>



                    <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                    >



                        <input
                        name="title"
                        placeholder="Product Name"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3 outline-none"
                        required
                        />



                        <input
                        name="category"
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3 outline-none"
                        required
                        />



                        <input
                        name="price"
                        type="number"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3 outline-none"
                        required
                        />



                        <input
                        name="stock"
                        type="number"
                        placeholder="Stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3 outline-none"
                        required
                        />



                        <input
                        name="thumbnail"
                        placeholder="Image URL"
                        value={formData.thumbnail}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3 outline-none"
                        required
                        />



                        <textarea

                        name="description"

                        placeholder="Product Description"

                        value={formData.description}

                        onChange={handleChange}

                        rows="4"

                        className="w-full border rounded-xl px-4 py-3 outline-none"

                        />




                        <button
                        disabled={loading}
                        className="w-full bg-[#1F2340] text-white py-3 rounded-xl font-semibold hover:bg-[#343a5a] transition"
                        >

                            {loading ? "Adding..." : "Add Product"}

                        </button>



                    </form>



                </div>


            </div>


        </div>

    );

}


export default AddProduct;