import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import {useEffect, useState} from "react";
import {DeskNotionalInterface} from "./DeskNotionalInterface";
import {ColDef} from "ag-grid-community";
import {updateDeskNotional} from "./orderNotionalSlice";
import {useDispatch, useSelector} from "react-redux";
import {OrderNotionalService} from "./OrderNotionalService";

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
        { headerName: 'Desk ID', field: 'deskId', hide: true},
        { headerName: 'Buy Notional Limit', field: 'buyNotionalLimit' },
        { headerName: 'Current Buy Notional', field: 'currentBuyNotional' },
        { headerName: 'Current Buy Utilization %', field: 'buyUtilizationPercentage' },
        { headerName: 'Sell Notional Limit', field: 'sellNotionalLimit' },
        { headerName: 'Current Sell Notional', field: 'currentSellNotional' },
        { headerName: 'Current Sell Utilization %', field: 'sellUtilizationPercentage' },
        { headerName: 'Gross Notional Limit', field: 'grossNotionalLimit' },
        { headerName: 'Current Gross Notional', field: 'currentGrossNotional' },
        { headerName: 'Current Gross Utilization %', field: 'grossUtilizationPercentage' , width: 220}
    ]);

    return (
        <div style={{ marginTop: 10, marginLeft: 10, height: 500, width: '99%'}}>
            <AgGridReact rowData={deskData} columnDefs={columnDefs}/>
        </div>
    );
}

export default DeskNotionalGrid;
