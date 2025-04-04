import {AllCommunityModule, ColDef, ModuleRegistry} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import {useEffect, useState} from "react";
import {TraderNotionalInterface} from "./TraderNotionalInterface";
import {OrderNotionalService} from "./OrderNotionalService";
import {updateDeskNotional} from "./orderNotionalSlice";
import {useDispatch} from "react-redux";

ModuleRegistry.registerModules([AllCommunityModule]);

const TraderNotionalGrid = () => {
    const dispatch = useDispatch();
    const onMessage = (message: any): void =>
    {
        switch (message.header.command())
        {
            case "sow":
                postMessage({messageType: "snapshot", orderNotional: message.data});
                console.log("Order notional snapshot received: ", message.data);
                break;
            case "p":
                postMessage({messageType: "update", orderNotional: message.data});
                console.log("Order notional update received: ", message.data);
                dispatch(updateDeskNotional(message.data));
                break;
            default:
                break;
        }
    }

    const [orderNotionalService] = useState<OrderNotionalService | null>
    (new OrderNotionalService("trading.notional.update", "ws://localhost:9008/amps/json", onMessage));

    const [traderData, setTraderData] =  useState<TraderNotionalInterface[]>([
        { trader: 'Harper Hall', desk: '', buyNotionalLimit: 1000, sellNotionalLimit: 2000, grossNotionalLimit: 1000, currentBuyNotional: 100, currentSellNotional: 100, currentGrossNotional: 100, currentBuyUtilization: 10, currentSellUtilization: 10, currentGrossUtilization: 10 },
        { trader: 'Horatio Hall', desk: '',  buyNotionalLimit: 4000, sellNotionalLimit: 4000, grossNotionalLimit: 1000, currentBuyNotional: 600, currentSellNotional: 100, currentGrossNotional: 100, currentBuyUtilization: 10, currentSellUtilization: 10, currentGrossUtilization: 10 },
        { trader: 'David Hall', desk: '',  buyNotionalLimit: 5000, sellNotionalLimit: 5000, grossNotionalLimit: 2000, currentBuyNotional: 100, currentSellNotional: 400, currentGrossNotional: 100, currentBuyUtilization: 10, currentSellUtilization: 10, currentGrossUtilization: 10 },
        { trader: 'Saori Hall', desk: '',  buyNotionalLimit: 5000, sellNotionalLimit: 5000, grossNotionalLimit: 2000, currentBuyNotional: 100, currentSellNotional: 400, currentGrossNotional: 100, currentBuyUtilization: 10, currentSellUtilization: 10, currentGrossUtilization: 10 },
        { trader: 'Leon Hall', desk: '',  buyNotionalLimit: 5000, sellNotionalLimit: 5000, grossNotionalLimit: 2000, currentBuyNotional: 100, currentSellNotional: 400, currentGrossNotional: 100, currentBuyUtilization: 10, currentSellUtilization: 10, currentGrossUtilization: 10 }
    ]);

    const [columnDefs] = useState<ColDef<TraderNotionalInterface>[]>( [
        { headerName: 'Trader', field: 'trader', width: 150, filter: true},
        { headerName: 'Desk', field: 'desk', width: 200, filter: true},
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



    useEffect(() =>
    {
        orderNotionalService?.connect().then(() => {
            console.log("Connected to AMPS");
        }).catch((error) => {
            console.error("Error connecting to AMPS: " + error);
        });
        return () => orderNotionalService?.disconnect();
    }, []);

    return (
        <div style={{ marginTop: 10, marginLeft: 10, height: 500, width: '99%'}}>
            <AgGridReact rowData={traderData} columnDefs={columnDefs}/>
        </div>
    );
}

export default TraderNotionalGrid;
