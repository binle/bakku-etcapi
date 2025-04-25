import { DataArrayProperty, DataFileProperty, DataProperty, StringSchema } from '@bakku/etcapi/dist/src';

export class FileUploadOneyRequestBodyDto {
  @DataFileProperty()
  oneFile: Express.Multer.File;
  @DataProperty()
  filename: string;
}

export class FileUploadOneResponseBodyDto {
  @DataProperty()
  filepath: string;
}

export class FileUploadListyRequestBodyDto {
  @DataProperty({ itemSchema: { type: 'file' }, validation: { isRequired: true, minLength: 1 } })
  listFiles: Express.Multer.File[];
}

export class FileUploaListResponseBodyDto {
  @DataArrayProperty({ itemSchema: StringSchema })
  filepath: string[];
}

export class FileUploadMapRequestBodyDto {
  @DataProperty({ itemSchema: { type: 'file' }, validation: { isRequired: true, minLength: 1 } })
  map1: Express.Multer.File[];
  @DataProperty({ itemSchema: { type: 'file' }, validation: { isRequired: true, minLength: 1 } })
  map2: Express.Multer.File[];
}

export class FileUploaMapResponseBodyDto {
  @DataArrayProperty({ itemSchema: StringSchema })
  map1: string[];
  @DataArrayProperty({ itemSchema: StringSchema })
  map2: string[];
}
