import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { TraderNotionalInterface } from './TraderNotionalInterface';


const initialState: { orderNotionals: TraderNotionalInterface[] } = {
    orderNotionals: []
}

const orderNotionalSlice = createSlice({
    name: 'orderNotional',
    initialState,
    reducers: {
        updateDeskNotional: (state, action: PayloadAction<TraderNotionalInterface>) => {
            const index = state.orderNotionals.findIndex((notional) => notional.deskId === action.payload.deskId);
            if (index !== -1)
                state.orderNotionals[index] = action.payload;
            else
                state.orderNotionals.push(action.payload);
        },
        updateTraderNotional: (state, action: PayloadAction<TraderNotionalInterface>) => {
            const index = state.orderNotionals.findIndex((notional) => notional.traderId === action.payload.traderId);
            if (index !== -1)
                state.orderNotionals[index] = action.payload;
            else
                state.orderNotionals.push(action.payload);
        },
    }
});

export default orderNotionalSlice.reducer;
export const { updateDeskNotional, updateTraderNotional } = orderNotionalSlice.actions;
