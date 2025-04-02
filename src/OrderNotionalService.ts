import { Client, Command } from "amps";

export class OrderNotionalService
{
    private readonly topic: string;
    private readonly url: string;
    private client = new Client("order-notional-reader");

    constructor(topic: string, url: string)
    {
        this.topic = topic;
        this.url = url;
    }

    public async connect(): Promise<void>
    {
        try
        {
            await this.client.connect(this.url);
            const cmd = new Command("sow_and_subscribe").topic(this.topic);
            await this.client.execute(cmd, this.onMessage);
            console.log("Order notional service is connected to AMPS using URL: ", this.url);
        }
        catch (e)
        {
            console.error(e);
        }
    }

    private onMessage(message: any): void
    {
        switch (message.header.command())
        {
            case "sow":
                postMessage({messageType: "snapshot", orderNotional: message.data});
                console.log("Order notional snapshot received: ", message.data);
                break;
            case "p":
                postMessage({messageType: "update", orderNotional: message.data});
                console.log("Order notional update received: ", message.data);
                break;
            default:
                break;
        }
    }

    private disconnect(): void
    {
        if(this.client.isConnected)
            this.client.disconnect();
    }

}
