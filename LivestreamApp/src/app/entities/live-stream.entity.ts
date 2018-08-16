import { WebsocketConfig } from "./websocket-config.entity";

export class LiveStream {

    constructor(
        public id: string,
        public title: string,
        public description: string,
        public countryCode: string,
        public websocketConfig: WebsocketConfig,
        public ip: string){
    }

    static deserialize(input: any): LiveStream {
        const id = input.Id;
        const title = input.Title;
        const description = input.Description;
        const countryCode = input.CountryCode;
        const websocketConfig = WebsocketConfig.deserialize(input.WebsocketConfig);
        const ip = input.Ip;

        return new LiveStream(id, title, description, countryCode, websocketConfig, ip);
    }
}