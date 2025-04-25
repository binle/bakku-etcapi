```
import { asyncValidate, IBooleanSchema } from '@bakku/etcapi';

const booleanSchema: IBooleanSchema = {
  type: 'boolean',
  validation: {
    isRequired: true,
  },
};

let result: any;
result = await asyncValidate(booleanSchema, 'abc', 'inputtedData');
console.log(result); // Error: `inputtedData is not boolean!`
result = await asyncValidate(booleanSchema, undefined, 'inputtedData');
console.log(result); // Error: `inputtedData is required!`

result = await asyncValidate(booleanSchema, 'true', 'inputtedData');
console.log(result); // true
```
