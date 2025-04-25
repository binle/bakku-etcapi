```
import { Express } from '@bakku/common';
import { asyncValidate, IFileSchema } from '@bakku/etcapi';

const fileSchema: IFileSchema = {
  type: 'file',
  validation: {
    isRequired: true,
    maxSize: 100 * 1024 * 1024,
    mimetype: 'jpg',
  },
};

let result: any;

result = await asyncValidate(fileSchema, 'abc', 'inputtedFile');
console.log(result); // Error: `inputtedFile is not file!`
result = await asyncValidate(fileSchema, undefined, 'avatar');
console.log(result); // Error: `avatar is required!`

let tempFile = {
  size: 101 * 1024 * 1024,
  mimetype: 'jpg',
} as Express.Multer.File;
result = await asyncValidate(fileSchema, tempFile, 'avatar');
console.log(result); // Error: `avatar must be <=104857600` - (104857600 = 100 * 1024 * 1024)

tempFile = {
  size: 10 * 1024 * 1024,
  mimetype: 'doc',
} as Express.Multer.File;
result = await asyncValidate(fileSchema, tempFile, 'avatar');
console.log(result); // Error: Type of file avatar must be jpg.
```
