export declare function Initialize3lasPlayer(ip: string, port: number, stramId: string): any;
export declare function Destroy3LasPlayer(): void;
export declare function GetUserAgentInfo(): UserAgentInfo;
export declare function CheckBrowserCompatibility(): boolean;
export declare function ChangeStream(streamId: string): void;
export declare interface UserAgentInfo {
  public isAndroid: boolean;
  public isIOS: boolean;
  public isWindows: boolean;
  public isLinux: boolean;
  public isBSD: boolean;
  public isMacOSX: boolean;
  public isInternetExplorer: boolean;
  public isSafari: boolean;
  public isOpera: boolean;
  public isChrome: boolean;
  public isFirefox: boolean;
  public webkitVer: string;
  public isNativeChrome: boolean;
  public OSName: string;
  public BrowserName: string;
}