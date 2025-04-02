import {NotionalInterface} from "./NotionalInterface";

export interface TraderNotionalInterface extends NotionalInterface {
    trader: string;
    deskId?: string;
    deskName?: string;
}
