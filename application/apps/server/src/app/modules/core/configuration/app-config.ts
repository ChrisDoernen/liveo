export class AppConfig {
    platform: string;
    architecture: string;
    port: string;
    production: boolean;
    simulate: boolean;
    standalone: boolean;

    /**
     * Reflects if the application is packaged as an executable.
     */
    executable: boolean;

    /**
     * Whether the application is executed from the repository. If true, the file
     * structure for serving static files is different from the file structure of artifacts.
     */
    repository: boolean;

    /**
     * The base directory to look for "client" and "admin" SPA's as determined from @see repository.
     */
    staticFilesBaseDirectory: string;

    database: string;
    loglevel: string;
    logdirectory: string;
    ffmpegPath: string;

    /**
     * The directory the application (either an executable or the liveo-server.js file) is executed in.
     */
    applicationDirectory: string;
};
