import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import {useEffect, useState} from "react";
import {DeskNotionalInterface} from "./DeskNotionalInterface";
import {NotionalBreachInterface} from "./NotionalBreachInterface";
import {ColDef} from "ag-grid-community";
import {updateNotionalBreach} from "./orderNotionalSlice";
import {useDispatch, useSelector} from "react-redux";
import {OrderNotionalService} from "./OrderNotionalService";
import {numberFormatter} from "./utilities";

ModuleRegistry.registerModules([AllCommunityModule]);

const NotionalBreachesGrid = () => {
    const dispatch = useDispatch();

    const deskData: NotionalBreachInterface[] = useSelector((state) => state.orderNotional.notionalBreaches);

    const onMessage = ({data, header}:{ data: NotionalBreachInterface, header: any }): void => {
        if(header.command() === "p" || header.command() === "sow")
            dispatch(updateNotionalBreach(data));
    }

    const [orderNotionalService] = useState<OrderNotionalService | null>
    (new OrderNotionalService("trading.limit.breach","ws://localhost:9008/amps/json", onMessage));

    const [columnDefs] = useState<ColDef<NotionalBreachInterface>[]>([
        { headerName: 'Desk Name', field: 'deskName', filter: true},
        { headerName: 'Desk Id', field: 'deskId', hide: true},
        { headerName: 'Trader Id', field: 'traderId', hide: true},
        { headerName: 'Trader Name', field: 'traderName', filter: true},
        { headerName: 'Breach Type', field: 'breachType', filter: true},
        { headerName: 'Order Id', field: 'orderId'},
        { headerName: 'Symbol', field: 'symbol', filter: true},
        { headerName: 'Side', field: 'side'},
        { headerName: 'Price', field: 'price'},
        { headerName: 'Quantity', field: 'quantity', valueFormatter: numberFormatter},
        { headerName: 'Currency', field: 'currency'},
        { headerName: 'Notional Local', field: 'notionalLocal', valueFormatter: numberFormatter},
        { headerName: 'Notional USD', field: 'notionalUSD', valueFormatter: numberFormatter},
        { headerName: 'Limit Percentage', field: 'limitPercentage'},
        { headerName: 'Buy Notional Limit', field: 'buyNotionalLimit' , valueFormatter: numberFormatter },
        { headerName: 'Current Buy Notional', field: 'currentBuyNotional' , valueFormatter: numberFormatter},
        { headerName: 'Current Buy Utilization %', field: 'buyUtilizationPercentage' },
        { headerName: 'Sell Notional Limit', field: 'sellNotionalLimit' , valueFormatter: numberFormatter},
        { headerName: 'Current Sell Notional', field: 'currentSellNotional' , valueFormatter: numberFormatter},
        { headerName: 'Current Sell Utilization %', field: 'sellUtilizationPercentage' },
        { headerName: 'Gross Notional Limit', field: 'grossNotionalLimit' , valueFormatter: numberFormatter},
        { headerName: 'Current Gross Notional', field: 'currentGrossNotional' , valueFormatter: numberFormatter},
        { headerName: 'Current Gross Utilization %', field: 'grossUtilizationPercentage' }
    ]);

    useEffect(() => {
        orderNotionalService?.connect().then(() => {
            console.log("Connected to AMPS");
        }).catch((error) => {
            console.error("Error connecting to AMPS: " + error);
        });
        return () => orderNotionalService?.disconnect();
    }, []);


    return (
        <div style={{ marginTop: 10, marginLeft: 10, height: 500, width: '99%'}}>
            <AgGridReact rowData={deskData} columnDefs={columnDefs}/>
        </div>
    );
}

export default NotionalBreachesGrid;
