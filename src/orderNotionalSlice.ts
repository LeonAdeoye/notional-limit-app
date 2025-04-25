import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { TraderNotionalInterface } from './TraderNotionalInterface';
import {DeskNotionalInterface} from "./DeskNotionalInterface";

const initialState: { orderNotionals: TraderNotionalInterface[] } = {
    orderNotionals: []
}

const orderNotionalSlice = createSlice({
    name: 'orderNotional',
    initialState,
    reducers: {
        updateDeskNotional: (state, action: PayloadAction<DeskNotionalInterface>) => {
            const index = state.orderNotionals.findIndex((notional) => notional.deskId === action.payload.deskId);
            if (index !== -1) {
                Object.keys(action.payload).forEach((key) => {
                    if (key in state.orderNotionals[index])
                        (state.orderNotionals[index] as any)[key] = (action.payload as any)[key];
                });
            } else {
                state.orderNotionals.push(action.payload as DeskNotionalInterface);
            }
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
