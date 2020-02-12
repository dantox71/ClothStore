import axios from "axios";

const setAuthHeader = token => {
    if (token) {
        axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common("authorization");
    }
};

export default setAuthHeader;