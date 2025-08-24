import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { productEndpoints } from "../../services/apis";
import { toast } from "react-toastify";

// 🔹 Thunks
export const fetchProducts = createAsyncThunk(
    "products/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(productEndpoints.GET_ALL);
            return res.data.products;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const createProductThunk = createAsyncThunk(
    "products/create",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await axios.post(productEndpoints.ADD, payload);
            toast.success("Product added successfully");
            return res.data;
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const updateProductThunk = createAsyncThunk(
    "products/update",
    async ({ id, payload }, { rejectWithValue }) => {
        try {
            const res = await axios.put(productEndpoints.UPDATE(id), payload);
            toast.success("Product updated successfully");
            return res.data;
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const deleteProductThunk = createAsyncThunk(
    "products/delete",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(productEndpoints.DELETE(id));
            toast.success("Product deleted successfully");
            return id;
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// 🔹 Slice
const productsSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        loading: false,
        error: null,
        editing: null,
    },
    reducers: {
        setEditing: (state, action) => {
            state.editing = action.payload;
        },
        clearEditing: (state) => {
            state.editing = null;
        },
    },
    extraReducers: (builder) => {
        // fetch
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // create
        builder
            .addCase(createProductThunk.fulfilled, (state, action) => {
                state.items.push(action.payload);
            });

        // update
        builder
            .addCase(updateProductThunk.fulfilled, (state, action) => {
                state.items = state.items.map((p) =>
                    p._id === action.payload._id ? action.payload : p
                );
            });

        // delete
        builder
            .addCase(deleteProductThunk.fulfilled, (state, action) => {
                state.items = state.items.filter((p) => p._id !== action.payload);
            });
    },
});

export const { setEditing, clearEditing } = productsSlice.actions;
export default productsSlice.reducer;
