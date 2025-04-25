# 1. validate directive a value

```
import { asyncValidate, ISchemaGeneral, ValidationError } from '@bakku/etcapi';

const passwordSchema: ISchemaGeneral = {
  type: 'string',
  validation: {
    isRequired: true,
    validate: (data: string, pathName?: string) => {
      if (data.length < 6 && data.length > 32) {
        return new ValidationError(
          pathName || '',
          `"${pathName}" are not correct password length. It should be in rang [6-32]`
        );
      }
    },
  },
};

const passwordResult = await asyncValidate(passwordSchema, 'abc', 'password');
console.log(passwordResult); // ==>Error: `"password" are not correct password length. It should be in rang [6-32]`

```

# 2. Validate an Object

```

const objectSchema: ISchemaGeneral = {
  type: 'object',
  properties: {
    password: passwordSchema,
  },
};
const result = await asyncValidate(objectSchema, { password: 'abc' });
console.log(result); // ==>Error: `"data.password" are not correct password length. It should be in rang [6-32]`
```
