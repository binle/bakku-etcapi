```
import { asyncValidate, INumberSchema } from '@bakku/etcapi';

const numberSchema: INumberSchema = {
  type: 'number',
  validation: {
    isRequired: true,
    min: 1,
    max: 1000,
  },
};

let result: any;

result = await asyncValidate(numberSchema, 'abc', 'inputtedNumber');
console.log(result); // Error: `inputtedNumber is not number!`
result = await asyncValidate(numberSchema, undefined, 'inputtedNumber');
console.log(result); // Error: `inputtedNumber is required!`
result = await asyncValidate(numberSchema, 0, 'inputtedNumber');
console.log(result); // Error: `inputtedNumber must be >= 1 and <=100`

result = await asyncValidate(numberSchema, '12.34', 'inputtedNumber');
console.log(result); // 12.34
```
