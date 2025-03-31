import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

ModuleRegistry.registerModules([AllCommunityModule]);

const TraderNotionalGrid = () => {
    const traderData = [
        { trader: 'Harper Hall', buyNotionalLimit: 1000, sellNotionalLimit: 2000, grossNotionalLimit: 1000, currentBuyNotional: 100, currentSellNotional: 100, currentGrossNotional: 100, currentBuyUtilization: 10, currentSellUtilization: 10, currentGrossUtilization: 10 },
        { trader: 'Horatio Hall', buyNotionalLimit: 4000, sellNotionalLimit: 4000, grossNotionalLimit: 1000, currentBuyNotional: 600, currentSellNotional: 100, currentGrossNotional: 100, currentBuyUtilization: 10, currentSellUtilization: 10, currentGrossUtilization: 10 },
        { trader: 'David Hall', buyNotionalLimit: 5000, sellNotionalLimit: 5000, grossNotionalLimit: 2000, currentBuyNotional: 100, currentSellNotional: 400, currentGrossNotional: 100, currentBuyUtilization: 10, currentSellUtilization: 10, currentGrossUtilization: 10 },
        { trader: 'Saori Hall', buyNotionalLimit: 5000, sellNotionalLimit: 5000, grossNotionalLimit: 2000, currentBuyNotional: 100, currentSellNotional: 400, currentGrossNotional: 100, currentBuyUtilization: 10, currentSellUtilization: 10, currentGrossUtilization: 10 },
        { trader: 'Leon Hall', buyNotionalLimit: 5000, sellNotionalLimit: 5000, grossNotionalLimit: 2000, currentBuyNotional: 100, currentSellNotional: 400, currentGrossNotional: 100, currentBuyUtilization: 10, currentSellUtilization: 10, currentGrossUtilization: 10 }
    ];

    const columnDefs = [
        { headerName: 'Trader', field: 'trader' },
        { headerName: 'Buy Notional Limit', field: 'buyNotionalLimit' },
        { headerName: 'Current Buy Notional', field: 'currentBuyNotional' },
        { headerName: 'Current Buy Utilization %', field: 'currentBuyUtilization' },

        { headerName: 'Sell Notional Limit', field: 'sellNotionalLimit' },
        { headerName: 'Current Sell Notional', field: 'currentSellNotional' },
        { headerName: 'Current Sell Utilization %', field: 'currentSellUtilization' },

        { headerName: 'Gross Notional Limit', field: 'grossNotionalLimit' },
        { headerName: 'Current Gross Notional', field: 'currentGrossNotional' },
        { headerName: 'Current Gross Utilization %', field: 'currentGrossUtilization' }
    ];
    return (
        <div style={{ marginTop: 10, marginLeft: 10, height: 500, width: '99%'}}>
            <AgGridReact rowData={traderData} columnDefs={columnDefs}/>
        </div>
    );
}

export default TraderNotionalGrid;
