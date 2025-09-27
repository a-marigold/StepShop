import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface filtrationState {
    options: string[];

    minPrice: number;

    maxPrice: number;
}

const initialState: filtrationState = {
    options: [],

    minPrice: 0,

    maxPrice: 6000,
};

export const filtrationSlice = createSlice({
    name: 'filtration',
    initialState,
    reducers: {
        addOption: (state, action: PayloadAction<string>) => {
            state.options.push(action.payload);
        },
        deleteOption: (state, action: PayloadAction<string>) => {
            state.options = state.options.filter(
                (option) => option !== action.payload
            );
        },
        setMinPrice: (state, action: PayloadAction<number>) => {
            state.minPrice = action.payload;
        },
        setMaxPrice: (state, action: PayloadAction<number>) => {
            state.maxPrice = action.payload;
        },
    },
});

export const { addOption, deleteOption, setMinPrice, setMaxPrice } =
    filtrationSlice.actions;
export default filtrationSlice.reducer;
