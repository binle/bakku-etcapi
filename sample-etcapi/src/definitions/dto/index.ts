import { DataProperty, DataPropertyOptional } from '@bakku/etcapi/dist/src';

export * from './authentication.dto';
export * from './user.dto';
export * from './file.dto';

export class RequestParams {
  @DataProperty()
  id: string;
}

export class RequestQueries {
  @DataPropertyOptional()
  searchText?: string;
  @DataPropertyOptional()
  sortType?: string;
  @DataPropertyOptional()
  sortName?: string;
}
