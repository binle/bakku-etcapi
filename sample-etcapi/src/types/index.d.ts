/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.jpg';
declare module '*.png';
declare module '*.json' {
  const value: any;
  export default value;
}
import { IApplicationResouce, IJWTUser } from 'src/definitions';
declare module 'express' {
  export interface Request {
    user?: IJWTUser;
  }
}
declare global {
  // eslint-disable-next-line prefer-const, no-var
  var applicationContexts: {
    resource: IApplicationResource;
    rootPath: string;
  };
}
export {};
