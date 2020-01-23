import axios from "axios";

const setAuthHeader = token => {
    if (token) {
        axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
        console.log("Token header set");
    } else {
        delete axios.defaults.headers.common("authorization");
        console.log("Token header removed");
    }
};

export default setAuthHeader;