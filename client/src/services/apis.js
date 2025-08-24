const API_URL = import.meta.env.VITE_BACKEND_URL;

export const productEndpoints = {
    GET_ALL: `${API_URL}/product`,
    GET_ONE: (id) => `${API_URL}/product/${id}`,
    ADD: `${API_URL}/product`,
    UPDATE: (id) => `${API_URL}/product/${id}`,
    DELETE: (id) => `${API_URL}/product/${id}`,
};
