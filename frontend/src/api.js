import { toast } from "react-toastify";
import { apiUrl } from "./config";

export const getAllBikes = async () => {
    let token = localStorage.getItem("token");
    try {
        const response = await fetch(apiUrl + "bike/getAllBikes", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        const responseJson = await response.json();
        if (responseJson.status === 0) {
            toast.error(responseJson.message);
            throw new Error(responseJson.response);
        }
        return JSON.parse(responseJson.data);
    } catch (error) {
        toast.error(error.message);
        throw new Error(error.message);
    }
};

export const getAllEmployees = async () => {
    let token = localStorage.getItem("token");
    try {
        const response = await fetch(apiUrl + "getAllUsers", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        const responseJson = await response.json();
        if (responseJson.status === 0) {
            toast.error(responseJson.message);
            throw new Error(responseJson.response);
        }
        return JSON.parse(responseJson.data);
    } catch (error) {
        toast.error(error.message);
        throw new Error(error.message);
    }
};

export const getAllAssembleBikes = async (data) => {
    let token = localStorage.getItem("token");
    try {
        const response = await fetch(apiUrl + "bike/getAllAssembleBikes", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        if (response.status === 401) {
            toast.error("Unauthorized");
            throw new Error("Unauthorized Access");
        }
        const responseJson = await response.json();
        if (responseJson.status === 0) {
            toast.error(responseJson.message);
            throw new Error(responseJson.response);
        }
        return responseJson;
    } catch (error) {
        toast.error(error.message);
        throw new Error(error.message);
    }
};

export const getAllAssembleBikesByEmpId = async (data) => {
    let token = localStorage.getItem("token");
    try {
        const response = await fetch(apiUrl + "bike/getAssembleBikesByEmpId", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        if (response.status === 401) {
            toast.error("Unauthorized");
            throw new Error("Unauthorized Access");
        }
        const responseJson = await response.json();
        if (responseJson.status === 0) {
            toast.error(responseJson.message);
            throw new Error(responseJson.response);
        }
        return responseJson;
    } catch (error) {
        toast.error(error.message);
        throw new Error(error.message);
    }
};

export const startAssemblebike = async (data) => {
    let token = localStorage.getItem("token");
    try {
        const response = await fetch(apiUrl + "bike/startAssembleBike", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        if (response.status === 401) {
            toast.error("Unauthorized");
            throw new Error("Unauthorized Access");
        }
        const responseJson = await response.json();
        if (responseJson.status === 0) {
            toast.error(responseJson.message);
            throw new Error(responseJson.response);
        }
        return responseJson;
    } catch (error) {
        toast.error(error.message);
        throw new Error(error.message);
    }
};

export const completeAssemblebike = async (data) => {
    let token = localStorage.getItem("token");
    try {
        const response = await fetch(apiUrl + "bike/completeAssembleBike", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        if (response.status === 401) {
            toast.error("Unauthorized");
            throw new Error("Unauthorized Access");
        }
        const responseJson = await response.json();
        if (responseJson.status === 0) {
            toast.error(responseJson.message);
            throw new Error(responseJson.response);
        }
        return responseJson;
    } catch (error) {
        toast.error(error.message);
        throw new Error(error.message);
    }
};

export const getProgressAssembleBikeByEmployee = async (data) => {
    let token = localStorage.getItem("token");
    try {
        const response = await fetch(apiUrl + "bike/getProgressAssembleBikeByEmployeeId", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        if (response.status === 401) {
            toast.error("Unauthorized");
            throw new Error("Unauthorized Access");
        }
        const responseJson = await response.json();
        if (responseJson.status === 0) {
            toast.error(responseJson.message);
            throw new Error(responseJson.response);
        }
        return JSON.parse(responseJson.data);
    } catch (error) {
        toast.error(error.message);
        throw new Error(error.message);
    }
};

export const logoutUser = async () => {
    let token = localStorage.getItem("token");
    let userId = localStorage.getItem("userId");
    try {
        const response = await fetch(apiUrl + "logout", {
            method: "POST",
            body: JSON.stringify({ userId: userId }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 401) {
            window.location.replace("/login");
            toast.error("Unauthorized");
            throw new Error("Unauthorized Access");
        }
        const responseJson = await response.json();
        if (responseJson.status === 0) {
            toast.error(responseJson.message);
            throw new Error(responseJson.response);
        }
        localStorage.clear();
        return responseJson;
    } catch (error) {
        toast.error(error.message);
        throw new Error(error.message);
    }
};

export const logInApi = async (data) => {
    try {
        const response = await fetch(apiUrl + "login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const responseJson = await response.json();
        if (response.ok) {
            return responseJson;
        } else {
            throw new Error(responseJson.message);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};