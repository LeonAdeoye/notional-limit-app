import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { TraderNotionalInterface } from './TraderNotionalInterface';
import {DeskNotionalInterface} from "./DeskNotionalInterface";
import {NotionalBreachInterface} from "./NotionalBreachInterface";

const initialState: { deskOrderNotionals: DeskNotionalInterface[], traderOrderNotionals: TraderNotionalInterface[], notionalBreaches: NotionalBreachInterface[]} = {
    deskOrderNotionals: [],
    traderOrderNotionals: [],
    notionalBreaches: []
}

const orderNotionalSlice = createSlice({
    name: 'orderNotional',
    initialState,
    reducers: {
        updateDeskNotional: (state, action: PayloadAction<DeskNotionalInterface>) => {
            const index = state.deskOrderNotionals.findIndex((notional) => notional.deskId === action.payload.deskId);
            if (index !== -1) {
                state.deskOrderNotionals[index] = {
                    ...state.deskOrderNotionals[index],
                    ...action.payload,
                };
            } else {
                state.deskOrderNotionals.push(action.payload as DeskNotionalInterface);
            }
        },
        updateTraderNotional: (state, action: PayloadAction<TraderNotionalInterface>) => {
            const index = state.traderOrderNotionals.findIndex((notional) => notional.traderId === action.payload.traderId);
            if (index !== -1) {
                state.traderOrderNotionals[index] = {
                    ...state.traderOrderNotionals[index],
                    ...action.payload,
                };
            } else {
                state.traderOrderNotionals.push(action.payload as TraderNotionalInterface);
            }
        },
        updateNotionalBreach: (state, action: PayloadAction<NotionalBreachInterface> ) => {
            const index = state.notionalBreaches.findIndex((breach) => breach.orderId === action.payload.traderId && breach.deskId === action.payload.orderId);
            if (index !== -1) {
                state.notionalBreaches[index] = {
                    ...state.notionalBreaches[index],
                    ...action.payload,
                };
            } else {
                state.notionalBreaches.push(action.payload as NotionalBreachInterface);
            }
        }
    }
});

export default orderNotionalSlice.reducer;
export const { updateDeskNotional, updateTraderNotional, updateNotionalBreach } = orderNotionalSlice.actions;
