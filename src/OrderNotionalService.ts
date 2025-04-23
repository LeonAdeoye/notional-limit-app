import { Client, Command } from "amps";

export class OrderNotionalService {
    private readonly topic: string;
    private readonly url: string;
    private client = new Client("order-notional-reader");
    private readonly messageHandler: (message: any) => void;

    constructor(topic: string, url: string, messageHandler: (message: any) => void) {
        this.topic = topic;
        this.url = url;
        this.messageHandler = messageHandler;
    }

    public async connect(): Promise<void> {
        try {
            await this.client.connect(this.url);
            const cmd = new Command("sow_and_subscribe").topic(this.topic);
            await this.client.execute(cmd, this.messageHandler);
            console.log("Order notional service is connected to AMPS using URL: ", this.url);
        }
        catch (e) {
            console.error(e);
        }
    }

    private disconnect(): void {
        if(this.client.isConnected)
            this.client.disconnect();
    }

}
