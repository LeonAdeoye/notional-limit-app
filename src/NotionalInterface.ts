export interface NotionalInterface {
    buyNotionalLimit?: number;
    sellNotionalLimit?: number;
    grossNotionalLimit?: number;
    currentBuyNotional?: number;
    currentSellNotional?: number;
    currentGrossNotional?: number;
    buyUtilizationPercentage?: number;
    sellUtilizationPercentage?: number;
    grossUtilizationPercentage?: number;
    side?: string;
}
