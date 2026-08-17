import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getAdminProduct,
    updateProduct
} from "../../services/adminProductService";


function EditProduct(){

    const {id} = useParams();
    const navigate = useNavigate();


    const [product,setProduct] = useState({

        title:"",
        category:"",
        price:"",
        stock:"",
        thumbnail:"",
        description:""

    });



    useEffect(()=>{

        const loadProduct = async()=>{

            const data = await getAdminProduct(id);

            setProduct(data);

        };


        loadProduct();


    },[id]);




    const handleChange=(e)=>{

        setProduct({

            ...product,
            [e.target.name]:e.target.value

        });

    };



    const handleSubmit=async(e)=>{

        e.preventDefault();


        await updateProduct(
            id,
            {
                ...product,
                price:Number(product.price),
                stock:Number(product.stock)
            }
        );


        alert("Product updated");


        navigate("/admin/products");


    };



    return (

        <div className="min-h-screen bg-[#F8F7FC] py-16">

            <div className="max-w-3xl mx-auto px-5">


                <div className="bg-white p-8 rounded-3xl">


                    <h1 className="text-3xl font-bold text-[#1F2340]">
                        Edit Product
                    </h1>



                    <form
                    onSubmit={handleSubmit}
                    className="space-y-5 mt-8"
                    >


                    {
                    [
                    "title",
                    "category",
                    "price",
                    "stock",
                    "thumbnail"
                    ].map(field=>(

                        <input

                        key={field}

                        name={field}

                        value={product[field]}

                        onChange={handleChange}

                        className="w-full border rounded-xl px-4 py-3"

                        placeholder={field}

                        />

                    ))
                    }



                    <textarea

                    name="description"

                    value={product.description}

                    onChange={handleChange}

                    className="w-full border rounded-xl px-4 py-3"

                    placeholder="Description"

                    />



                    <button

                    className="w-full bg-[#1F2340] text-white py-3 rounded-xl"

                    >

                    Save Changes

                    </button>



                    </form>



                </div>


            </div>


        </div>

    );

}


export default EditProduct;