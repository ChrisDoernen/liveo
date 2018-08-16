declare class HTMLPlayerControls {
    
    constructor(divID);

    public ToggleActivityLight(): void;

    public SetPlayState(state: boolean): void;

    public OnPlayClick(): void;

    public OnVolumeChange(): void;
}