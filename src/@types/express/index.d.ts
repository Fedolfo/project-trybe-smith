import { TokenPayload } from '../../interface/interface';
// referencia gabriel gaspar
declare module 'express-serve-static-core' {
  interface Request {
    username?: TokenPayload
  }
}