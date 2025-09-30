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
        increaseProductQuantity: (
            state,
            action: PayloadAction<{ title: string }>
        ) => {
            state.cartProducts = state.cartProducts.map((product) =>
                product.title === action.payload.title
                    ? // TODO: Get escape of non-null assertion
                      { ...product, quantity: product.quantity! + 1 }
                    : product
            );
        },
        decreaseProductQuantity: (
            state,
            action: PayloadAction<{ title: string }>
        ) => {
            state.cartProducts = state.cartProducts.map((product) =>
                product.title === action.payload.title
                    ? // TODO: Get escape of non-null assertion
                      { ...product, quantity: product.quantity! - 1 }
                    : product
            );
        },
    },
});

export const {
    addProduct,
    deleteProduct,
    increaseProductQuantity,
    decreaseProductQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
