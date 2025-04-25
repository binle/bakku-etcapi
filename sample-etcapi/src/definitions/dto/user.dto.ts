import {
  DataArrayProperty,
  DataEnumProperty,
  DataFilePropertyOptional,
  DataProperty,
  DataPropertyOptional,
  getEnumData,
  IStringSchema,
  ValidationError,
} from '@bakku/etcapi/dist/src';
import multer from 'multer';

const passwordReg = new RegExp('"^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$"');

export enum GenderEnum {
  male = 'male',
  fremale = 'fremale',
}

export class ProfileDto {
  @DataProperty()
  avartar: string;
  @DataProperty()
  fullname: string;
  @DataEnumProperty({ enumData: getEnumData(GenderEnum) })
  gender: GenderEnum;
  @DataProperty()
  birthday: Date;
}

export class UserDto {
  @DataProperty()
  id: string;
  @DataProperty()
  username: string;
  @DataProperty()
  email: string;
  @DataProperty()
  role: string;

  @DataPropertyOptional({ propertyType: ProfileDto })
  profile?: ProfileDto;
}

export class ListUserDto {
  @DataProperty()
  count: number;
  @DataArrayProperty({ itemSchema: { propertyType: UserDto } })
  users: UserDto[];
}

export class UserRequestBodyDto {
  @DataProperty()
  username: string;
  @DataProperty({
    type: 'string',
    validation: {
      minLength: 8,
      validate: (data: string, pathName: string) => {
        // pathName => 'data.password'
        if (!passwordReg.test(data)) {
          return new ValidationError(pathName, `${pathName} is not correct.`, 'PASSWORD_NOT_CORRECT');
        }
      },
    },
  } as IStringSchema)
  password: string;

  @DataProperty({ validation: { format: 'isEmail' } })
  email: string;
  @DataProperty()
  role: string;
}

export class ProfileRequestBodyDto {
  @DataProperty()
  fullname: string;
  @DataEnumProperty({ enumData: getEnumData(GenderEnum) })
  gender: GenderEnum;
  @DataProperty()
  birthday: Date;

  @DataFilePropertyOptional()
  avartarFile?: Express.Multer.File;
}
