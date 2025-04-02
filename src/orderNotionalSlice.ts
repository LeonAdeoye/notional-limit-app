import { createSlice }  from '@reduxjs/toolkit'
import { TraderNotionalInterface } from './TraderNotionalInterface';


const initialState: { orderNotionals: TraderNotionalInterface[] } = {
    orderNotionals: []
}

const orderNotionalSlice = createSlice({
    name: 'orderNotional',
    initialState,
    reducers: {
        updateNotional: ({orderNotionals}, {payload}) => {
            const index = orderNotionals.findIndex((notional) => notional.trader === payload.trader && notional.desk === payload.desk);
            if (index !== -1)
                orderNotionals[index] = payload;
            else
                orderNotionals.push(payload);
        },
    }
});

export default orderNotionalSlice.reducer;
export const { updateNotional } = orderNotionalSlice.actions;
