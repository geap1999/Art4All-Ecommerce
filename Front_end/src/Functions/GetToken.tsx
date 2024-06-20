import { jwtDecode } from "jwt-decode";

const getToken = () => {
    const token = localStorage.getItem('token');
    let decoded = ""
    if (token !== null) {
        decoded = jwtDecode(token);
        return decoded;
    }
}

export default getToken;