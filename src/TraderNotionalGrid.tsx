import {AllCommunityModule, ColDef, ModuleRegistry} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import {useEffect, useState} from "react";
import {TraderNotionalInterface} from "./TraderNotionalInterface";
import {OrderNotionalService} from "./OrderNotionalService";
import {updateTraderNotional} from "./orderNotionalSlice";
import {useDispatch, useSelector} from "react-redux";
import {numberFormatter} from "./utilities";

ModuleRegistry.registerModules([AllCommunityModule]);

const TraderNotionalGrid = () => {
    const dispatch = useDispatch();
    const traderData: TraderNotionalInterface[] = useSelector((state) => state.orderNotional.traderOrderNotionals);

    const onMessage = ({data, header}:{ data: TraderNotionalInterface, header: any }): void => {
        if(header.command() === "p" || header.command() === "sow")
            dispatch(updateTraderNotional(data));
    }

    const [orderNotionalService] = useState<OrderNotionalService | null>
    (new OrderNotionalService("trader.notional.update","ws://localhost:9008/amps/json", onMessage));

    useEffect(() => {
        orderNotionalService?.connect().then(() => {
            console.log("Connected to AMPS");
        }).catch((error) => {
            console.error("Error connecting to AMPS: " + error);
        });
        return () => orderNotionalService?.disconnect();
    }, []);

    const [columnDefs] = useState<ColDef<TraderNotionalInterface>[]>( [
        { headerName: 'Trader', field: 'traderName', width: 150, filter: true},
        { headerName: 'Trader Id', field: 'traderId', width: 150, hide: true},
        { headerName: 'Desk', field: 'deskName', width: 200, filter: true},
        { headerName: 'Buy Notional Limit', field: 'buyNotionalLimit', valueFormatter: numberFormatter},
        { headerName: 'Current Buy Notional', field: 'currentBuyNotional' , valueFormatter: numberFormatter},
        { headerName: 'Current Buy Utilization %', field: 'buyUtilizationPercentage' },
        { headerName: 'Sell Notional Limit', field: 'sellNotionalLimit' , valueFormatter: numberFormatter},
        { headerName: 'Current Sell Notional', field: 'currentSellNotional' , valueFormatter: numberFormatter},
        { headerName: 'Current Sell Utilization %', field: 'sellUtilizationPercentage' },
        { headerName: 'Gross Notional Limit', field: 'grossNotionalLimit' , valueFormatter: numberFormatter},
        { headerName: 'Current Gross Notional', field: 'currentGrossNotional' , valueFormatter: numberFormatter},
        { headerName: 'Current Gross Utilization %', field: 'grossUtilizationPercentage', width: 220}
    ]);

    return (
        <div style={{ marginTop: 10, marginLeft: 10, height: 500, width: '99%'}}>
            <AgGridReact rowData={traderData} columnDefs={columnDefs}/>
        </div>
    );
}

export default TraderNotionalGrid;
