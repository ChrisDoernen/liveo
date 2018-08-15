export interface IAppConfig {
    env: {
        name: string;
    };
    apiServer: {
        ip: string;
        port: number;
    };
}