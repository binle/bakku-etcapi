```
import { asyncValidate, getEnumData, IEnumSchema } from '@bakku/etcapi';

enum TempEnum {
  active = 'active',
  inactive = 'inactive',
  normal = 'normal',
}

const enumSchema: IEnumSchema = {
  type: 'enum',
  enumData: getEnumData(TempEnum),
  validation: {
    isRequired: true,
  },
};

let result: any;

result = await asyncValidate(enumSchema, 'abc', 'inputtedEnum');
console.log(result); // Error: `inputtedEnum is not enum's values [active,inactive,normal]!`
result = await asyncValidate(enumSchema, undefined, 'inputtedEnum');
console.log(result); // Error: `inputtedEnum is required!`
```
