export const AppConfigToken = "appConfig";

export class AppConfig {
    platform: string;
    architecture: string;
    port: string;
    production: boolean;
    simulate: boolean;
    standalone: boolean;
    executable: boolean;
    database: string;
    loglevel: string;
    logdirectory: string;
    ffmpegPath: string;
    staticFilesBaseDirectory: string;
    workingDirectory: string;
};