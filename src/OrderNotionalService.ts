import { Client, Command } from "amps";

export class OrderNotionalService {
    private readonly responseTopic: string;
    private readonly url: string;
    private client = new Client("order-notional-reader");
    private readonly messageHandler: (message: any) => void;
    private readonly requestTopic = "trading.gui.initialization.request";
    private static readonly requestId = crypto.randomUUID();

    constructor(responseTopic: string, url: string, messageHandler: (message: any) => void) {
        this.responseTopic = responseTopic;
        this.url = url;
        this.messageHandler = messageHandler;
    }

    public async connect(): Promise<void> {
        try {
            await this.client.connect(this.url);
            const cmd = new Command("sow_and_subscribe").topic(this.responseTopic).filter('/requestId = "' + OrderNotionalService.requestId + '"')
            await this.client.execute(cmd, this.messageHandler);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async initializeNotionalValues(): Promise<any[]> {
        try {
            const cmd = new Command("publish").topic(this.requestTopic).data({ requestId: OrderNotionalService.requestId });
            await this.client.execute(cmd);
        } catch (e) {
            console.error("Error sending initialization message: ", e);
        }
    }

    private disconnect(): void {
        if(this.client.isConnected)
            this.client.disconnect();
    }

}
