export class WebsocketConfig {

    constructor(
        public type: string,
        public mimeType: string,
        public port: number) {
    }

    public static deserialize(input: any): WebsocketConfig {
        const type = input.Type;
        const mimeType = input.MimeType;
        const port = input.Port;

        return new WebsocketConfig(type, mimeType, port);
    }
}
