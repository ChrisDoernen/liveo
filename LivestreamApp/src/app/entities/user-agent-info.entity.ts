export class UserAgentInfo {

    constructor(public oSName: string,
        public browser: string,
        public isAndroid: boolean,
        public isIOS: boolean,
        public isWindows: boolean,
        public isLinux: boolean,
        public isBSD: boolean,
        public isMacOSX: boolean,
        public isInternetExplore: boolean,
        public isSafari: boolean,
        public isOpera: boolean,
        public isChrome: boolean,
        public isFirefox: boolean,
        public isNativeChrome) { 
    }
}