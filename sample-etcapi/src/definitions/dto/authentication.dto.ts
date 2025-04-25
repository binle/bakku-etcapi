import { DataProperty, DataPropertyOptional, IStringSchema, ValidationError } from '@bakku/etcapi/dist/src';

const passwordReg = new RegExp('"^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$"');

export class LoginRequestBodyDto {
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
  @DataPropertyOptional()
  rememberMe?: boolean;
}

export class LoginReponseBodyDto {
  @DataProperty()
  jwt: string;
}

export class ForgotPasswordRequestBodyDto {
  @DataProperty()
  username: string;
  @DataProperty({ validation: { format: 'isEmail' } })
  email: string;
}

export class ForgotPasswordResponseBodyDto {
  @DataProperty()
  nonce: string;
}

export class ResetPasswordRequestBodyDto {
  @DataProperty()
  username: string;
  @DataProperty()
  nonce: string;
  @DataProperty({ validation: { minLength: 6, maxLength: 6 } })
  code: string;
  @DataProperty({
    type: 'string',
    validation: {
      minLength: 8,
      validate: (data: string, pathName: string) => {
        // pathName => 'data.newPassword'

        if (!passwordReg.test(data)) {
          return new ValidationError(pathName, `${pathName} is not correct.`, 'PASSWORD_NOT_CORRECT');
        }
      },
    },
  } as IStringSchema)
  newPassword: string;
}
