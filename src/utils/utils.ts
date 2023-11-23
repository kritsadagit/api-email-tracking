import moment from "moment-timezone";
import CryptoJS from "crypto-js";

export const getUTC7Isodate = (): string => {
  return moment().utcOffset(7).toISOString(true);
};

export const encryptMessage = (
  message: string | CryptoJS.lib.WordArray,
  key: string | CryptoJS.lib.WordArray
) => {
  const encrypted = CryptoJS.AES.encrypt(message, key);
  return encrypted.toString();
};

export const decryptMessage = (
  ciphertext: string | CryptoJS.lib.CipherParams,
  key: string | CryptoJS.lib.WordArray
) => {
  const decrypted = CryptoJS.AES.decrypt(ciphertext, key);
  return decrypted.toString(CryptoJS.enc.Utf8);
};
