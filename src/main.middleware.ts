import { Injectable } from '@nestjs/common';
import { AES } from 'crypto-js';
@Injectable()
export class MainMiddleware {
  use(req, res, next) {
    //desencriptar
    const _data = req.body;
    for (const key in _data) {
      if (Object.prototype.hasOwnProperty.call(_data, key)) {
        const element = _data[key];
        if (typeof element == 'string') {
          _data[key] = AES.decrypt(element, process.env.KEY_ENCRYPT).toString();
        }
      }
    }
    req.body = _data;
    next();
  }
}
