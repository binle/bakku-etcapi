```
import moment from 'moment';
import { asyncValidate, IDateSchema } from '@bakku/etcapi';

// **Note: we convert to moment data for validation, so the format base on moment rules.**

let dateSchema: IDateSchema = {
  type: 'date',
  dateFormat: 'YYYY-MM-DD',
  validation: {
    isRequired: true,
    max: new Date('2023-01-01'),
    min: new Date('2020-01-01'),
  },
};

let result: any;

result = await asyncValidate(dateSchema, 'abc', 'inputtedDate');
console.log(result); // Error: `inputtedDate is not date!`
result = await asyncValidate(dateSchema, undefined, 'inputtedDate');
console.log(result); // Error: `inputtedDate is required!`
result = await asyncValidate(dateSchema, '2024-01-01', 'inputtedDate');
console.log(result); // Error: `inputtedDate must be >= 2020-01-01 00:00:00  and <= 2023-01-01 00:00:00`

result = await asyncValidate(dateSchema, '2022-01-01', 'inputtedDate');
console.log(result); // Date('2022-01-01')

// **Note: when you use convertToDateMoment, dateFormat will be ignored.**
dateSchema = {
  type: 'date',
  convertToDateMoment: (date) => moment(date, 'YYYY-MM-DD'),
  validation: {
    isRequired: true,
    max: new Date('2023-01-01'),
    min: new Date('2020-01-01'),
  },
};

// convert to local timezone
dateSchema = {
  type: 'date',
  convertToDateMoment: (data: string) => {
    const currentOffset = moment().utcOffset();
    return moment.utc(data, 'YYYY-MM-DD').utcOffset(currentOffset);
  },
  validation: {
    isRequired: true,
    max: new Date('2023-01-01'),
    min: new Date('2020-01-01'),
  },
};
```
