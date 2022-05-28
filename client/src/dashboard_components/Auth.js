import axios from "axios";

const isAuthenticated = () => {
    const token = sessionStorage.getItem("admin_token");

    return axios.get("http://localhost:5000/authenticate", {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        }
    })
    .then(res => {
        if (res.data.valid === "true"){
            return true;
        }
        else{
            return false;
        }
    });
}

export default { isAuthenticated };