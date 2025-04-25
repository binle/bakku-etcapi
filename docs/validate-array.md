```

import { asyncValidate, IArraySchema, IStringSchema } from '@bakku/etcapi';

const stringSchema: IStringSchema = {
  type: 'string',
  validation: {
    isRequired: true,
    minLength: 6,
    maxLength: 32,
  },
};

const arraySchema: IArraySchema = {
  type: 'array',
  itemSchema: stringSchema,
  validation: {
    isRequired: true,
    minLength: 1,
    maxLength: 100,
  },
};

let result: any;
result = await asyncValidate(arraySchema, 'abc', 'inputtedData');
console.log(result); // Error: `inputtedData is not array!`

result = await asyncValidate(arraySchema, undefined, 'inputtedData');
console.log(result); // Error: `inputtedData is required!`

result = await asyncValidate(arraySchema, [123], 'inputtedData');
console.log(result); // Error: `inputtedData[0] is not string!`

result = await asyncValidate(arraySchema, [], 'inputtedData');
console.log(result); // Error: `inputtedData must be has length >=1 and <=100!`
```
