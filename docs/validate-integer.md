```
import { asyncValidate, IIntegerSchema } from '@bakku/etcapi';

const integerSchema: IIntegerSchema = {
  type: 'integer',
  validation: {
    isRequired: true,
    min: 1,
    max: 1000,
  },
};

let result: any;

result = await asyncValidate(integerSchema, 'abc', 'inputtedInteger');
console.log(result); // Error: `inputtedInteger is not integer!`
result = await asyncValidate(integerSchema, 1.1, 'inputtedInteger');
console.log(result); // Error: `inputtedInteger is not integer!`

result = await asyncValidate(integerSchema, undefined, 'inputtedInteger');
console.log(result); // Error: `inputtedInteger is required!`
result = await asyncValidate(integerSchema, 0, 'inputtedInteger');
console.log(result); // Error: `inputtedInteger must be >= 1 and <=100`

result = await asyncValidate(integerSchema, '123', 'inputtedInteger');
console.log(result); // 123
```
