// Uploader v1.0.0 Copyright (c) 2023 wwy and contributors
'use strict';

const axios = require('axios');
const qiniu = require('qiniu-js');
const COS = require('cos-js-sdk-v5');
const qetagJs = require('qetag-js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    const n = Object.create(null);
    if (e) {
        for (const k in e) {
            if (k !== 'default') {
                const d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        }
    }
    n["default"] = e;
    return Object.freeze(n);
}

const axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
const qiniu__namespace = /*#__PURE__*/_interopNamespace(qiniu);
const COS__default = /*#__PURE__*/_interopDefaultLegacy(COS);

class uploader {
    constructor({ type, onSuccess, onFail, onGetConfig, onProgress }) {
        this.type = type;
        this.onSuccess = onSuccess;
        this.onFail = onFail;
        this.onGetConfig = onGetConfig;
        this.onProgress = onProgress;
    }

    getConfig() {
        return new Promise((resolve, reject) => {
            this.onGetConfig(
                (config) => {
                    this.setConfig.call(this, config);
                    resolve();
                },
                {
                    type: this.type,
                }
            );
        });
    }

    setConfig({ driver, config }) {
        this.driver = driver;
        this.config = config;
        switch (driver) {
            case "aliyun":
                this.setAliyun(config);
                break;
            case "qiniu":
                this.setQiniu(config);
                break;
            case "tencent":
                this.setTencent(config);
                break;
            case "local":
                this.setLocal(config);
                break;
            default:
                this.onFail(new Error("没有可用的driver"));
                break;
        }
    }

    setTencent(config) {
        const tempKeys = config.tempKeys;
        const credentials = tempKeys.credentials;
        this.uploader = new COS__default["default"]({
            getAuthorization: (options, callback) => {
                callback({
                    TmpSecretId: credentials.tmpSecretId,
                    TmpSecretKey: credentials.tmpSecretKey,
                    SecurityToken: credentials.sessionToken,
                    StartTime: tempKeys.startTime, // 时间戳，单位秒，如：1580000000
                    ExpiredTime: tempKeys.expiredTime, // 时间戳，单位秒，如：1580000000
                });
            },
        });
    }

    setAliyun(config) {
        const data = new FormData();

        if (Object.keys(config["callback-var"]).length) {
            for (const [key, value] of Object.entries(config["callback-var"])) {
                if (typeof value === "string") {
                    data.append(key, value);
                }
            }
        }

        data.append("OSSAccessKeyId", config.accessid);
        data.append("policy", config.policy);
        data.append("signature", config.signature);
        data.append("callback", config.callback);
        data.append("success_action_status", "200");
        data.append("x-oss-forbid-overwrite", "true");

        this.uploader = axios__default["default"].create({
            method: "POST",
            headers: {
                "Content-type": "multipart/form-data",
            },
            data,
            onUploadProgress: (res) => {
                this.onProgress(res);
            },
        });
    }

    setQiniu(config) {
        console.log(config);
        this.uploader = qiniu__namespace.upload(this.file, config.prefix + "1", config.token);
    }

    setLocal(config) {
        const data = new FormData();

        data.append("auth", config.auth);
        data.append("file", this.file);

        this.uploader = axios__default["default"].create({
            method: "POST",
            headers: {
                "Content-type": "multipart/form-data",
            },
            data,
            onUploadProgress: (res) => {
                this.onProgress(res);
            },
        });
    }

    checkMimeType(fileMime, allowMime) {
        if (allowMime === "*") {
            return true;
        }

        if (Array.isArray(allowMime)) {
            let res = false;
            for (const v of allowMime) {
                if (this.checkMimeTypeByString(fileMime, v)) {
                    res = true;
                    break;
                }
            }
            return res;
        }

        return this.checkMimeTypeByString(fileMime, allowMime);
    }

    checkMimeTypeByString(fileMime, allowMime) {
        if (allowMime.includes("/*") !== false && fileMime.indexOf(allowMime.replace(/\/\*$/, "/") === 0)) {
            return true;
        }
        if (allowMime === fileMime) {
            return true;
        }
        return false;
    }

    async getKey(file) {
        const qfile = new qetagJs.File({
            file: file,
            blockSize: 4 * 1024 * 1024,
            batch: qetagJs.utils.guid(),
        });

        try {
            return await new qetagJs.Normal(qfile, 25).get();
        } catch (error) {
            return file.name;
        }
    }

    async send(file) {
        this.file = file;

        if ((this.config && this.config.expire_time && Math.round(new Date().getTime() / 1000 - 28800) > this.config.expire_time) || !this.config) {
            await this.getConfig(file);
        }

        if (this.uploader == undefined) {
            return;
        }

        const config = this.config;

        // if (!this.checkMimeType(file.type, config.mime_types)) {
        //     return this.onFail(new Error("File type is not allowed"));
        // }

        // if (file.size > config.max_size) {
        //     return this.onFail(new Error("The file is too large"));
        // }

        switch (this.driver) {
            case "aliyun":
                var data = this.uploader.defaults.data;
                var key = await this.getKey(this.file);
                data.append("key", config.dir + key);
                data.append("file", this.file);
                this.uploader
                    .request({
                        url: config.host,
                        data,
                    })
                    .then((res) => {
                        this.onSuccess(res.data);
                    })
                    .catch(async (err) => {
                        // await import('fast-xml-parser');
                        // console.log(XMLParser);
                        // parseString()
                        console.log(err);
                        this.onFail(err);
                    });
                break;
            case "qiniu":
                this.uploader.subscribe({
                    next: (res) => {
                        this.onProgress(res);
                    },
                    error: (err) => {
                        this.onFail(err);
                    },
                    complete: (res) => {
                        this.onSuccess(res);
                    },
                });
                break;
            case "tencent":
                var key = await this.getKey(this.file);
                this.uploader.putObject(
                    {
                        Bucket: config.bucket /* 存储桶: */,
                        Region: config.region /* 存储桶所在地域，必须字段 */,
                        Key: config.path + key /* 必须是字符串  前面拼接存储桶文件名 */,
                        StorageClass: "STANDARD", // 固定值
                        Body: file, // 上传文件对象
                        onProgress: (progressData) => {
                            this.onProgress(progressData);
                        },
                    },
                    async (err, data) => {
                        if (data) {
                            if (data.statusCode === 200) {
                                try {
                                    const res = await axios__default["default"].post(config.callback_url, {
                                        etag: data.ETag,
                                        sessionToken: config.tempKeys.credentials.sessionToken,
                                        auth: config.auth,
                                        localtion: data.Location,
                                        mimetype: file.type,
                                        size: file.size,
                                    });
                                    return this.onSuccess(res.data);
                                } catch (error) {
                                    return this.onFail(error);
                                }
                            }
                            this.onFail(data);
                        } else {
                            this.onFail(err);
                        }
                    }
                );
                break;
            case "local":
                this.uploader.defaults.data.append("key", config.prefix + (await this.getKey(file)));
                this.uploader
                    .request({
                        url: config.host,
                        data: this.uploader.defaults.data,
                    })
                    .then((res) => {
                        this.onSuccess(res.data);
                    })
                    .catch((err) => {
                        this.onFail(err);
                    });
                break;
        }
    }
}

module.exports = uploader;
//# sourceMappingURL=uploader.cjs.map
