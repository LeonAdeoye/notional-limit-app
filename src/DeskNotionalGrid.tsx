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
    const deskData: DeskNotionalInterface[] = useSelector((state) => state.orderNotional.orderNotionals);

    const onMessage = ({data, header}:{ data: DeskNotionalInterface, header: any }): void => {
        switch (header.command()) {
            case "sow":
                break;
            case "p":
                dispatch(updateDeskNotional(data));
                break;
            default:
                break;
        }
    }

    const [orderNotionalService] = useState<OrderNotionalService | null>
    (new OrderNotionalService("trading.notional.update", "ws://localhost:9008/amps/json", onMessage));

    useEffect(() => {
        orderNotionalService?.connect().then(() => {
            console.log("Connected to AMPS");
        }).catch((error) => {
            console.error("Error connecting to AMPS: " + error);
        });
        return () => orderNotionalService?.disconnect();
    }, []);

    // const [deskData] =  useState<DeskNotionalInterface[]>([
    //     {
    //         deskName: 'Delta One',
    //         deskId: '1',
    //         buyNotionalLimit: 1000,
    //         sellNotionalLimit: 2000,
    //         grossNotionalLimit: 1000,
    //         currentBuyNotional: 100,
    //         currentSellNotional: 100,
    //         currentGrossNotional: 100,
    //         currentBuyUtilization: 10,
    //         currentSellUtilization: 10,
    //         currentGrossUtilization: 10
    //     },
    //     {
    //         deskName: 'Sales Trading Hong Kong',
    //         deskId: '2',
    //         buyNotionalLimit: 4000,
    //         sellNotionalLimit: 4000,
    //         grossNotionalLimit: 1000,
    //         currentBuyNotional: 600,
    //         currentSellNotional: 100,
    //         currentGrossNotional: 100,
    //         currentBuyUtilization: 10,
    //         currentSellUtilization: 10,
    //         currentGrossUtilization: 10
    //     },
    //     {
    //         deskName: 'Program Trading Japan',
    //         deskId: '3',
    //         buyNotionalLimit: 5000,
    //         sellNotionalLimit: 5000,
    //         grossNotionalLimit: 2000,
    //         currentBuyNotional: 100,
    //         currentSellNotional: 400,
    //         currentGrossNotional: 100,
    //         currentBuyUtilization: 10,
    //         currentSellUtilization: 10,
    //         currentGrossUtilization: 10
    //     }
    // ]);

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
