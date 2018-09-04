declare class PCMAudioPlayer {
    
    constructor();
    SetVolume(value: number): void;
    GetVolume(): number;
    MobileUnmute(): void;
    DecodeAudioData();
    CreateBuffer();
    PushBuffer(data);
}

declare class AudioFormatReader {
    
    constructor(UserAgenInfo, ErrorCallback, DataReadyCallback);
    PushData(data): void;
    SamplesAvailable(): boolean;
    PopSamples();
    PurgeData(): void;
    Poke(): void;
}

declare function CreateAudioFormatReader(UserAgenInfo, MIME: string, ErrorCallback, DataReadyCallback): any;

declare class WebSocketClient {

    constructor(URI, ErrorCallback, ConnectCallback, DataReadyCallback, DisconnectCallback);
    GetStatus(): boolean;
}