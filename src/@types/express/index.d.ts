import { TokenPayload } from '../../interface/interface';
// referência gabriel gaspar
declare module 'express-serve-static-core' {
  interface Request {
    username?: TokenPayload
  }
}