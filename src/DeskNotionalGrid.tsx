import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import {useEffect, useState} from "react";
import {DeskNotionalInterface} from "./DeskNotionalInterface";
import {ColDef} from "ag-grid-community";
import {updateDeskNotional} from "./orderNotionalSlice";
import {useDispatch, useSelector} from "react-redux";
import {OrderNotionalService} from "./OrderNotionalService";
import {getPercentageColour, getSideColour, numberFormatter} from "./utilities";

ModuleRegistry.registerModules([AllCommunityModule]);

const DeskNotionalGrid = () => {
    const dispatch = useDispatch();
    const deskData: DeskNotionalInterface[] = useSelector((state) => state.orderNotional.deskOrderNotionals);

    const onMessage = ({data, header}:{ data: DeskNotionalInterface, header: any }): void => {
        if(header.command() === "p" || header.command() === "sow")
            dispatch(updateDeskNotional(data));
    }

    const [orderNotionalService] = useState<OrderNotionalService | null>
    (new OrderNotionalService("desk.notional.update","ws://localhost:9008/amps/json", onMessage));

    useEffect(() => {
        orderNotionalService?.connect().then(() => {
            console.log("Connected to AMPS");
        }).catch((error) => {
            console.error("Error connecting to AMPS: " + error);
        });
        return () => orderNotionalService?.disconnect();
    }, []);

    const [columnDefs] = useState<ColDef<DeskNotionalInterface>[]>([
        { headerName: 'DeskName', field: 'deskName', filter: true},
        { headerName: 'Desk Id', field: 'deskId', hide: true},
        { headerName: 'Buy Notional Limit', field: 'buyNotionalLimit' , valueFormatter: numberFormatter},
        { headerName: 'Current Buy Notional', field: 'currentBuyNotional' , valueFormatter: numberFormatter},
        { headerName: 'Current Buy Utilization %', field: 'buyUtilizationPercentage', cellStyle: (params) => getPercentageColour(params)},
        { headerName: 'Sell Notional Limit', field: 'sellNotionalLimit' , valueFormatter: numberFormatter},
        { headerName: 'Current Sell Notional', field: 'currentSellNotional' , valueFormatter: numberFormatter},
        { headerName: 'Current Sell Utilization %', field: 'sellUtilizationPercentage', cellStyle: (params) => getPercentageColour(params)},
        { headerName: 'Gross Notional Limit', field: 'grossNotionalLimit' , valueFormatter: numberFormatter},
        { headerName: 'Current Gross Notional', field: 'currentGrossNotional' , valueFormatter: numberFormatter},
        { headerName: 'Current Gross Utilization %', field: 'grossUtilizationPercentage' , width: 220, cellStyle: (params) => getPercentageColour(params)},
    ]);

    return (
        <div style={{ marginTop: 10, marginLeft: 10, height: 500, width: '99%'}}>
            <AgGridReact rowData={deskData} columnDefs={columnDefs}/>
        </div>
    );
}

export default DeskNotionalGrid;
