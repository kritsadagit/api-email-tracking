"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptMessage = exports.encryptMessage = exports.getUTC7Isodate = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const getUTC7Isodate = () => {
    return (0, moment_timezone_1.default)().utcOffset(7).toISOString(true);
};
exports.getUTC7Isodate = getUTC7Isodate;
const encryptMessage = (message, key) => {
    const encrypted = crypto_js_1.default.AES.encrypt(message, key);
    return encrypted.toString();
};
exports.encryptMessage = encryptMessage;
const decryptMessage = (ciphertext, key) => {
    const decrypted = crypto_js_1.default.AES.decrypt(ciphertext, key);
    return decrypted.toString(crypto_js_1.default.enc.Utf8);
};
exports.decryptMessage = decryptMessage;
//# sourceMappingURL=utils.js.map