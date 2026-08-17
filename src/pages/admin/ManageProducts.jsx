import { useEffect, useState } from "react";
import { getAdminProducts, deleteProduct } from "../../services/adminProductService";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";


function ManageProducts() {

    const [products, setProducts] = useState([]);


    const fetchProducts = async () => {

        const data = await getAdminProducts();

        setProducts(data);

    };


    useEffect(() => {

        fetchProducts();

    }, []);



    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this product?"
        );


        if (!confirmDelete) return;


        await deleteProduct(id);


        setProducts(
            products.filter(
                product => product.id !== id
            )
        );

    };



    return (

        <div className="min-h-screen bg-[#F8F7FC] py-16">


            <div className="max-w-6xl mx-auto px-5">


                <div className="flex justify-between items-center mb-8">


                    <div>

                        <h1 className="text-4xl font-bold text-[#1F2340]">
                            Manage Products
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Add, edit and manage store products
                        </p>

                    </div>



                    <Link
                        to="/admin/add-product"
                        className="flex items-center gap-2 bg-[#1F2340] text-white px-5 py-3 rounded-xl"
                    >

                        <Plus size={18} />

                        Add Product

                    </Link>


                </div>





                <div className="bg-white rounded-3xl shadow-sm overflow-hidden">


                    <table className="w-full">


                        <thead className="bg-gray-50">

                            <tr>

                                <th className="p-5 text-left">
                                    Product
                                </th>

                                <th className="p-5">
                                    Price
                                </th>

                                <th className="p-5">
                                    Stock
                                </th>

                                <th className="p-5">
                                    Action
                                </th>

                            </tr>

                        </thead>



                        <tbody>


                            {products.map((product) => (


                                <tr
                                    key={product.id}
                                    className="border-t"
                                >


                                    <td className="p-5 flex items-center gap-4">


                                        <img
                                            src={product.thumbnail}
                                            className="w-16 h-16 object-contain rounded-xl bg-gray-100"
                                        />


                                        <div>

                                            <h3 className="font-semibold text-[#1F2340]">
                                                {product.title}
                                            </h3>


                                            <p className="text-sm text-gray-500">
                                                {product.category}
                                            </p>


                                        </div>


                                    </td>




                                    <td className="p-5 text-center">

                                        ${product.price}

                                    </td>




                                    <td className="p-5 text-center">

                                        {product.stock}

                                    </td>




                                    <td className="p-5 text-center">

                                        <div className="flex justify-center gap-4">


                                            <Link
                                                to={`/admin/edit-product/${product.id}`}
                                                className="text-[#7C8CF8] hover:text-[#5968e8]"
                                            >
                                                <Pencil size={20} />
                                            </Link>


                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >

                                                <Trash2 size={20} />

                                            </button>


                                        </div>

                                    </td>


                                </tr>


                            ))}


                        </tbody>


                    </table>


                    {
                        products.length === 0 && (

                            <div className="p-10 text-center text-gray-500">

                                No products added yet.

                            </div>

                        )
                    }


                </div>


            </div>


        </div>

    );

}


export default ManageProducts;