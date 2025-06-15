import { DataArrayProperty, DataFileProperty, DataProperty, StringSchema } from '@bakku/etcapi/dist/src';

export class FileUploadOneRequestBodyDto {
  @DataFileProperty()
  oneFile: Express.Multer.File;
  @DataProperty()
  filename: string;
}

export class FileUploadOneResponseBodyDto {
  @DataProperty()
  filepath: string;
}

export class FileUploadListRequestBodyDto {
  @DataProperty({ itemSchema: { type: 'file' }, validation: { isRequired: true, minLength: 1 } })
  listFiles: Express.Multer.File[];
}

export class FileUploadListResponseBodyDto {
  @DataArrayProperty({ itemSchema: StringSchema })
  filepath: string[];
}

export class FileUploadMapRequestBodyDto {
  @DataProperty({ itemSchema: { type: 'file' }, validation: { isRequired: true, minLength: 1 } })
  map1: Express.Multer.File[];
  @DataProperty({ itemSchema: { type: 'file' }, validation: { isRequired: true, minLength: 1 } })
  map2: Express.Multer.File[];
}

export class FileUploadMapResponseBodyDto {
  @DataArrayProperty({ itemSchema: StringSchema })
  map1: string[];
  @DataArrayProperty({ itemSchema: StringSchema })
  map2: string[];
}
