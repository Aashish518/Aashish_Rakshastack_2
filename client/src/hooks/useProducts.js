import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchProducts,
    createProductThunk,
    updateProductThunk,
    deleteProductThunk,
    setEditing,
    clearEditing,
} from "../store/products/productsSlice";

export const useProducts = () => {
    const dispatch = useDispatch();
    const { items, loading, error, editing } = useSelector((s) => s.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const add = async (payload) => {
        await dispatch(createProductThunk(payload));
        dispatch(fetchProducts());
    };

    const update = async (id, payload) => {
        await dispatch(updateProductThunk({ id, payload }));
        dispatch(fetchProducts());
    };

    const remove = async (id) => {
        await dispatch(deleteProductThunk(id));
        dispatch(fetchProducts());
    };

    const startEdit = (product) => dispatch(setEditing(product));
    const cancelEdit = () => dispatch(clearEditing());

    const addOrUpdate = async (payload) => {
        if (editing?._id) {
            await update(editing._id, payload);
        } else {
            await add(payload);
        }
    };

    return {
        products: items,
        loading,
        error,
        editingProduct: editing,
        addOrUpdate,
        remove,
        startEdit,
        cancelEdit,
    };
};
