```
import { asyncValidate, IObjectSchema, IStringSchema } from '@bakku/etcapi';

const stringSchema: IStringSchema = {
  type: 'string',
  validation: {
    isRequired: true,
    minLength: 6,
    maxLength: 32,
  },
};

const objectSchema: IObjectSchema = {
  type: 'object',
  properties: {
    name: stringSchema,
  },
  validation: {
    isRequired: true,
    isNotAlowExtProperties: true,
  },
};

let result: any;
result = await asyncValidate(objectSchema, 'abc', 'inputtedData');
console.log(result); // Error: `inputtedData is not object!`

result = await asyncValidate(objectSchema, undefined, 'inputtedData');
console.log(result); // Error: `inputtedData is required!`

result = await asyncValidate(objectSchema, { name: 123 }, 'inputtedData');
console.log(result); // Error: `inputtedData.name is not string!`

result = await asyncValidate(objectSchema, { name: 'test', test: 'name' }, 'inputtedData');
console.log(result); // Error: `test is not allowed exist in inputtedData`
```
