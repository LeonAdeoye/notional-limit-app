import {NotionalInterface} from "./NotionalInterface";

export interface TraderNotionalInterface extends NotionalInterface {
    traderName: string;
    traderId: string;
    deskId?: string;
    deskName?: string;
}
