import { Navigate } from "react-router-dom";
import { isAdmin, isLoggedIn } from "../../utils/auth";


function AdminRoute({ children }) {


    if (!isLoggedIn()) {

        return <Navigate to="/login" />;

    }


    if (!isAdmin()) {

        return <Navigate to="/" />;

    }


    return children;

}


export default AdminRoute;