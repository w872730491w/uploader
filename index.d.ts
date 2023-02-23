import type { AxiosInstance } from "axios";

interface ResponseConfig {
    driver: "local" | "qiniu" | "aliyun" | "tencent";
    config: { [key: string]: any };
}

interface Progress {
    loaded: number;
    total: number;
    percent: number;
}

interface Config {
    type: "image" | "video" | "file";
    onSuccess?: Function;
    onFail?: Function;
    onGetConfig: (setConfig: Uploader["setConfig"], data: { [key: string]: any }) => void;
    onProgress?: (progress: Progress) => void;
}

declare class Uploader {
    config?: ResponseConfig["config"];
    type: Config["type"];
    driver?: ResponseConfig["driver"];
    uploader?: AxiosInstance;
    onSuccess: Function;
    onFail: Function;
    constructor(config: Config);
    onGetConfig: Config["onGetConfig"];
    onProgress: Config["onProgress"];
    setConfig: (config: ResponseConfig) => void;
    setAliyun: (config: { [key: string]: any }) => void;
    send: (file: File) => void;
}

export default Uploader;
