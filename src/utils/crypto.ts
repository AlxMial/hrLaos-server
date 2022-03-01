import * as CryptoJS from 'crypto-js';

const key = 'undefined';

export function encryptStr(msg: any) {
  return CryptoJS.AES.encrypt(msg, key).toString();
}

export function decryptStr(msg: any) {
  return CryptoJS.AES.decrypt(msg, this.key).toString(CryptoJS.enc.Utf8);
}
