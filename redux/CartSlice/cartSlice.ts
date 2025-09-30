import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { ProductType } from '@/types/ProductTypes';

interface CartSliceState {
    cartProducts: ProductType[];
}

const initialState: CartSliceState = {
    cartProducts: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<ProductType>) => {
            state.cartProducts.push(action.payload);
        },
        deleteProduct: (state, action: PayloadAction<string>) => {
            state.cartProducts = state.cartProducts.filter(
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
            state.cartProducts = state.cartProducts.filter((product) =>
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
