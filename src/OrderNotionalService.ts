import { Client, Command } from "amps";

export class OrderNotionalService {
    private readonly responseTopic: string;
    private readonly url: string;
    private client = new Client("order-notional-reader");
    private readonly messageHandler: (message: any) => void;
    private readonly deskNotionalUpdatesTopic = "desk.notional.update";

    constructor(responseTopic: string, url: string, messageHandler: (message: any) => void) {
        this.responseTopic = responseTopic;
        this.url = url;
        this.messageHandler = messageHandler;
    }

    public async connect(): Promise<void> {
        try {
            await this.client.connect(this.url);
            const cmd = new Command("sow_and_subscribe").topic(this.deskNotionalUpdatesTopic);
            await this.client.execute(cmd, this.messageHandler);
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
