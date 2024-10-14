import { Injectable } from '@nestjs/common';
import { AES, enc } from 'crypto-js';
@Injectable()
export class MainMiddleware {
  use(req, res, next) {
    //desencriptar
    if (process.env.NODE_ENV === 'production') {
      const _data = req.body;
      for (const key in _data) {
        if (Object.prototype.hasOwnProperty.call(_data, key)) {
          const element = _data[key];
          if (typeof element == 'string') {
            const decrypted = AES.decrypt(
              element,
              process.env.KEY_ENCRYPT,
            ).toString(enc.Utf8);

            _data[key] = decrypted;
          }
        }
      }
      req.body = _data;
    }

    next();
  }
}
