import axios from "axios";


const orderApi = axios.create({

    baseURL: "http://localhost:3000"

});


export default orderApi;