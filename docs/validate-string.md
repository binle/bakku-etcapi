```
import { asyncValidate, IStringSchema } from '@bakku/etcapi';

const stringSchema: IStringSchema = {
  type: 'string',
  validation: {
    isRequired: true,
    minLength: 6,
    maxLength: 32,
  },
};

let result: any;

result = await asyncValidate(stringSchema, 12, 'inputtedString');
console.log(result); // Error: `inputtedString is not string!`
result = await asyncValidate(stringSchema, '', 'inputtedString');
console.log(result); // Error: `inputtedString is required!`
result = await asyncValidate(stringSchema, 'abc', 'inputtedString');
console.log(result); // Error: `inputtedString must have length >= 6 and <=32`

const emailSchema: IStringSchema = {
  type: 'string',
  validation: {
    isRequired: true,
    format: 'isEmail',
  },
};

result = await asyncValidate(emailSchema, '@acb', 'inputtedEmail');
console.log(result); // Error: `inputtedEmail is not email.`

const passwordSchema: IStringSchema = {
  type: 'string',
  validation: {
    isRequired: true,
    format: new RegExp('^(?=.*?[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$'),
  },
};
result = await asyncValidate(passwordSchema, 'Abc', 'inputtedPassword');
console.log(result); // Error: `inputtedPassword is not correct the format.`
```
