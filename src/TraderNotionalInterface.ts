import {NotionalInterface} from "./NotionalInterface";

export interface TraderNotionalInterface extends NotionalInterface {
    trader: string;
    desk: string;
}
