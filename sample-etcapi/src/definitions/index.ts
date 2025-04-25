import { DataEnumProperty, DataProperty, getEnumData } from '@bakku/etcapi';

export interface IJWTUser {
  id: string;
  role: string;
}

export interface IApplicationResource {
  port: number | string;
  host?: string;
}

export * from './dto';
