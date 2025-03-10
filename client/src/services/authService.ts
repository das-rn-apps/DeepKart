import api from ".";

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await api.post("/users/login", { email, password });
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Login failed');
        } else {
            throw new Error(error.message || 'An error occurred during login.');
        }
    }
};

export const registerUser = async (
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string
) => {
    try {
        const response = await api.post("/users/register", {
            username,
            email,
            password,
            firstName,
            lastName,
            phoneNumber,
        });
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            console.log("Registration step 3: ", error.response.data, `${api.defaults.baseURL}/users/register`);
            throw new Error(error.response.data.message || 'Registration failed');
        } else {
            throw new Error(error.message || 'An error occurred during registration.');
        }
    }
};