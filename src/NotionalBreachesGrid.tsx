import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import {useEffect, useState} from "react";
import {NotionalBreachInterface} from "./NotionalBreachInterface";
import {ColDef} from "ag-grid-community";
import {updateNotionalBreach} from "./orderNotionalSlice";
import {useDispatch, useSelector} from "react-redux";
import {OrderNotionalService} from "./OrderNotionalService";
import {getLimitBreachTypeColour, getPercentageColour, getSideColour, numberFormatter} from "./utilities";

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
        { headerName: 'Desk', field: 'deskName', filter: true, pinned: 'left'},
        { headerName: 'Desk Id', field: 'deskId', hide: true},
        { headerName: 'Trader Id', field: 'traderId', hide: true},
        { headerName: 'Trader', field: 'traderName', filter: true, pinned: 'left'},
        { headerName: 'Breach Type', field: 'breachType', filter: true , width: 180,
            valueFormatter: (params) => `${params.data.limitPercentage} % ${params.data.breachType}`, cellStyle: params => getLimitBreachTypeColour(params)},
        { headerName: 'Order Id', field: 'orderId'},
        { headerName: 'Timestamp', field: 'tradeTimestamp', filter: true, width: 150, valueFormatter: (params) => `${params.value[3]}:${params.value[4]}:${params.value[5]}`},
        { headerName: 'Symbol', field: 'symbol', filter: true, width: 150},
        { headerName: 'Side', field: 'side', filter: true, width: 100, cellStyle: (params) => getSideColour(params)},
        { headerName: 'Price', field: 'price', width: 150},
        { headerName: 'Quantity', field: 'quantity', valueFormatter: numberFormatter, width: 180},
        { headerName: 'Currency', field: 'currency', width: 120},
        { headerName: 'Notional Local', field: 'notionalLocal', valueFormatter: numberFormatter},
        { headerName: 'Order Notional $', field: 'notionalUSD', valueFormatter: numberFormatter},
        { headerName: 'Buy Notional Limit $', field: 'buyNotionalLimit' , valueFormatter: numberFormatter },
        { headerName: 'Buy Notional $', field: 'currentBuyNotional' , valueFormatter: numberFormatter, width: 160},
        { headerName: 'Buy Utilization %', field: 'buyUtilizationPercentage' , width: 170, cellStyle: (params) => getPercentageColour(params)},
        { headerName: 'Sell Notional Limit $', field: 'sellNotionalLimit' , valueFormatter: numberFormatter},
        { headerName: 'Sell Notional $', field: 'currentSellNotional' , valueFormatter: numberFormatter, width: 160},
        { headerName: 'Sell Utilization %', field: 'sellUtilizationPercentage' , width: 170, cellStyle: (params) => getPercentageColour(params)},
        { headerName: 'Gross Notional Limit $', field: 'grossNotionalLimit' , valueFormatter: numberFormatter},
        { headerName: 'Gross Notional $', field: 'currentGrossNotional' , valueFormatter: numberFormatter, width: 170},
        { headerName: 'Gross Utilization %', field: 'grossUtilizationPercentage', width: 180, cellStyle: (params) => getPercentageColour(params) },
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
