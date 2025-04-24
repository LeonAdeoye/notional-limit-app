import {AllCommunityModule, ColDef, ModuleRegistry} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import {useState} from "react";
import {TraderNotionalInterface} from "./TraderNotionalInterface";

ModuleRegistry.registerModules([AllCommunityModule]);

const TraderNotionalGrid = () => {
    const [traderData] =  useState<TraderNotionalInterface[]>([
        {
            traderName: 'Harper Hall',
            traderId: '1',
            deskName: 'Sales Trading Hong Kong',
            deskId: '1',
            buyNotionalLimit: 1000,
            sellNotionalLimit: 2000,
            grossNotionalLimit: 1000,
            currentBuyNotional: 100,
            currentSellNotional: 100,
            currentGrossNotional: 100,
            currentBuyUtilization: 10,
            currentSellUtilization: 10,
            currentGrossUtilization: 10
        },
        {
            traderName: 'Horatio Hall',
            traderId: '2',
            deskName: 'Sales Trading Hong Kong',
            deskId: '1',
            buyNotionalLimit: 4000,
            sellNotionalLimit: 4000,
            grossNotionalLimit: 1000,
            currentBuyNotional: 600,
            currentSellNotional: 100,
            currentGrossNotional: 100,
            currentBuyUtilization: 10,
            currentSellUtilization: 10,
            currentGrossUtilization: 10
        },
        {
            traderName: 'David Hall',
            traderId: '2',
            deskName: 'Program Trading Japan',
            deskId: '3',
            buyNotionalLimit: 5000,
            sellNotionalLimit: 5000,
            grossNotionalLimit: 2000,
            currentBuyNotional: 100,
            currentSellNotional: 400,
            currentGrossNotional: 100,
            currentBuyUtilization: 10,
            currentSellUtilization: 10,
            currentGrossUtilization: 10
        },
        {
            traderName: 'Saori Hall',
            traderId: '4',
            deskName: 'Program Trading Japan',
            deskId: '4',
            buyNotionalLimit: 5000,
            sellNotionalLimit: 5000,
            grossNotionalLimit: 2000,
            currentBuyNotional: 100,
            currentSellNotional: 400,
            currentGrossNotional: 100,
            currentBuyUtilization: 10,
            currentSellUtilization: 10,
            currentGrossUtilization: 10
        },
        {
            traderName: 'Leon Hall',
            traderId: '5',
            deskName: 'Delta One',
            deskId: '5',
            buyNotionalLimit: 5000,
            sellNotionalLimit: 5000,
            grossNotionalLimit: 2000,
            currentBuyNotional: 100,
            currentSellNotional: 400,
            currentGrossNotional: 100,
            currentBuyUtilization: 10,
            currentSellUtilization: 10,
            currentGrossUtilization: 10 }
    ]);

    const [columnDefs] = useState<ColDef<TraderNotionalInterface>[]>( [
        { headerName: 'Trader', field: 'traderName', width: 150, filter: true},
        { headerName: 'Trader ID', field: 'traderId', width: 150, hide: true},
        { headerName: 'Desk', field: 'deskName', width: 200, filter: true},
        { headerName: 'Buy Notional Limit', field: 'buyNotionalLimit'},
        { headerName: 'Current Buy Notional', field: 'currentBuyNotional' },
        { headerName: 'Current Buy Utilization %', field: 'currentBuyUtilization' },
        { headerName: 'Sell Notional Limit', field: 'sellNotionalLimit' },
        { headerName: 'Current Sell Notional', field: 'currentSellNotional' },
        { headerName: 'Current Sell Utilization %', field: 'currentSellUtilization' },
        { headerName: 'Gross Notional Limit', field: 'grossNotionalLimit' },
        { headerName: 'Current Gross Notional', field: 'currentGrossNotional' },
        { headerName: 'Current Gross Utilization %', field: 'currentGrossUtilization', width: 220}
    ]);

    return (
        <div style={{ marginTop: 10, marginLeft: 10, height: 500, width: '99%'}}>
            <AgGridReact rowData={traderData} columnDefs={columnDefs}/>
        </div>
    );
}

export default TraderNotionalGrid;
