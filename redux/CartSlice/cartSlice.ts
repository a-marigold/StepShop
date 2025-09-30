import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { ProductType } from '@/types/ProductTypes';

interface CartSliceState {
    products: ProductType[];
}

const initialState: CartSliceState = {
    products: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<ProductType>) => {
            state.products.push(action.payload);
        },
        deleteProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter(
                (product) => product.title !== action.payload
            );
        },
        setProductQuantity: (
            state,
            action: PayloadAction<{
                title: string;
                newQuantity: number;
            }>
        ) => {
            state.products = state.products.filter((product) =>
                product.title === action.payload.title
                    ? (product.quantity = action.payload.newQuantity)
                    : product
            );
        },
    },
});

export const { addProduct, deleteProduct, setProductQuantity } =
    cartSlice.actions;
export default cartSlice.reducer;
