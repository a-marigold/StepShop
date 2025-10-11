import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { ClientProductType } from '@/types/ClientProductType';

interface CartSliceState {
    cartProducts: ClientProductType[];

    //
    totalAmount: number;
}

const initialState: CartSliceState = {
    cartProducts: [],

    totalAmount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<ClientProductType>) => {
            if (
                !state.cartProducts.find(
                    (product) => product.title === action.payload.title
                )
            ) {
                state.cartProducts.push(action.payload);
            } else {
                state.cartProducts = state.cartProducts.map((product) =>
                    product.title === action.payload.title
                        ? {
                              ...product,
                              quantity: product.quantity + 1,
                          }
                        : product
                );
            }
        },
        deleteProduct: (state, action: PayloadAction<{ title: string }>) => {
            state.cartProducts = state.cartProducts.filter(
                (product) => product.title !== action.payload.title
            );
        },

        increaseProductQuantity: (
            state,
            action: PayloadAction<{ title: string }>
        ) => {
            state.cartProducts = state.cartProducts.map((product) =>
                product.title === action.payload.title
                    ? {
                          ...product,
                          quantity: product.quantity + 1,
                      }
                    : product
            );
        },
        decreaseProductQuantity: (
            state,
            action: PayloadAction<{ title: string }>
        ) => {
            state.cartProducts = state.cartProducts.map((product) =>
                product.title === action.payload.title
                    ? {
                          ...product,
                          quantity: product.quantity - 1,
                      }
                    : product
            );
        },

        increaseTotalAmount: (state, action: PayloadAction<number>) => {
            state.totalAmount += action.payload;
        },
        decreaseTotalAmount: (state, action: PayloadAction<number>) => {
            state.totalAmount -= action.payload;
        },
    },
});

export const {
    addProduct,
    deleteProduct,
    increaseProductQuantity,
    decreaseProductQuantity,
    increaseTotalAmount,
    decreaseTotalAmount,
} = cartSlice.actions;
export default cartSlice.reducer;
