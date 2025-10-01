import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { ProductType } from '@/types/ProductTypes';

interface CartSliceState {
    cartProducts: ProductType[];

    totalAmount: number;
}

// TODO: Add totalAmount and totalProductPrice
const initialState: CartSliceState = {
    cartProducts: [],
    totalAmount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<ProductType>) => {
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
                              quantity: product.quantity
                                  ? product.quantity + 1
                                  : product.quantity,
                          }
                        : product
                );
            }
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
                    ? {
                          ...product,
                          quantity: product.quantity
                              ? product.quantity + 1
                              : product.quantity,
                      }
                    : product
            );
        },
        decreaseProductQuantity: (
            state,
            action: PayloadAction<{ title: string }>
        ) => {
            state.cartProducts = state.cartProducts
                .map((product) =>
                    product.title === action.payload.title
                        ? {
                              ...product,
                              quantity: product.quantity
                                  ? product.quantity - 1
                                  : product.quantity,
                          }
                        : product
                )
                .filter((product) => product.quantity! > 0);
        },

        increaseTotalAmount: (state, action: PayloadAction<number>) => {
            state.totalAmount += action.payload;
        },
        decreaseTotalAmount: (state, action: PayloadAction<number>) => {
            // if (action.payload.quantity !== 1) {
            state.totalAmount -= action.payload;
            // }
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
