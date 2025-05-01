import {TraderNotionalInterface} from "./TraderNotionalInterface";
import {OrderInterface} from "./OrderInterface";

export interface NotionalBreachInterface extends TraderNotionalInterface, OrderInterface {
    breachType: string;
    limitPercentage: number;
    notionalLocal: number;
    notionalUSD: number;
}
