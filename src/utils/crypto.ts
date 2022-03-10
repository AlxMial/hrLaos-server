import * as CryptoJS from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EncryptService {
  ENC_KEY: any = 'bf3c199c2470cb477d907b1e0917c17b';
  IV: any = '5183666c72eec9e4';

  encrypt = (val: any) => {
    const cipher = CryptoJS.createCipheriv(
      'aes-256-cbc',
      this.ENC_KEY,
      this.IV,
    );
    let encrypted = cipher.update(val, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  };

  decrypt = (encrypted: any) => {
    const decipher = CryptoJS.createDecipheriv(
      'aes-256-cbc',
      this.ENC_KEY,
      this.IV,
    );
    const decrypted = decipher.update(encrypted, 'base64', 'utf8');
    return decrypted + decipher.final('utf8');
  };

  EncodeKey(id) {
    // if (this.IsNullOrEmpty(id)) {
    //   return '';
    // }
    id = this.encrypt(id.toString());
    const buf = Buffer.from(id, 'ascii');
    id = buf.toString('base64');
    return id;
  }

  DecodeKey(id: any) {
    // if (this.IsNullOrEmpty(id)) {
    //   return '';
    // }
    const buff = Buffer.from(id, 'base64');
    id = buff.toString('ascii');
    return this.decrypt(id);
  }
}
