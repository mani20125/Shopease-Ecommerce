import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../services/userService";
import { Trash2 } from "lucide-react";


function ManageUsers() {

    const [users,setUsers] = useState([]);


    const loadUsers = async()=>{

        const data = await getUsers();

        setUsers(data);

    };


    useEffect(()=>{

        loadUsers();

    },[]);



    const handleDelete = async(user)=>{


        if(user.role === "admin"){

            alert("Admin account cannot be deleted");

            return;

        }


        const confirmDelete = window.confirm(
            "Delete this user?"
        );


        if(!confirmDelete) return;


        await deleteUser(user.id);


        setUsers(
            users.filter(
                item => item.id !== user.id
            )
        );

    };



    return (

        <div className="min-h-screen bg-[#F8F7FC] py-16">


            <div className="max-w-6xl mx-auto px-5">


                <h1 className="text-4xl font-bold text-[#1F2340]">
                    Manage Users
                </h1>


                <p className="text-gray-500 mt-2">
                    View and manage registered customers
                </p>



                <div className="bg-white rounded-3xl shadow-sm mt-8 overflow-hidden">


                    <table className="w-full">


                        <thead className="bg-gray-50">

                            <tr>

                                <th className="p-5 text-left">
                                    Name
                                </th>

                                <th className="p-5">
                                    Email
                                </th>

                                <th className="p-5">
                                    Role
                                </th>

                                <th className="p-5">
                                    Action
                                </th>

                            </tr>

                        </thead>



                        <tbody>


                        {users.map((user)=>(


                            <tr
                            key={user.id}
                            className="border-t"
                            >


                                <td className="p-5 font-medium">
                                    {user.name}
                                </td>


                                <td className="p-5 text-gray-500">
                                    {user.email}
                                </td>


                                <td className="p-5 text-center">

                                    <span
                                    className={
                                        user.role==="admin"
                                        ?
                                        "px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm"
                                        :
                                        "px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm"
                                    }
                                    >

                                    {user.role}

                                    </span>

                                </td>


                                <td className="p-5 text-center">


                                    {
                                    user.role !== "admin" && (

                                        <button
                                        onClick={()=>handleDelete(user)}
                                        className="text-red-500 hover:text-red-700"
                                        >

                                            <Trash2 size={20}/>

                                        </button>

                                    )
                                    }


                                </td>


                            </tr>


                        ))}


                        </tbody>


                    </table>


                </div>


            </div>


        </div>

    );

}


export default ManageUsers;