export interface NotionalInterface {
    buyNotionalLimit?: number;
    sellNotionalLimit?: number;
    grossNotionalLimit?: number;
    currentBuyNotional?: number;
    currentSellNotional?: number;
    currentGrossNotional?: number;
    currentBuyUtilization?: number;
    currentSellUtilization?: number;
    currentGrossUtilization?: number;
    side?: string;
}
