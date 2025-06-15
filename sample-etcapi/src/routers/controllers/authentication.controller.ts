import { Body, Controller, HttpStatusCodes, ILogger, newBakkuHttpError, Post } from '@bakku/etcapi';
import {
  ForgotPasswordRequestBodyDto,
  ForgotPasswordResponseBodyDto,
  LoginRequestBodyDto,
  LoginResponseBodyDto,
  ResetPasswordRequestBodyDto,
} from 'src/definitions';

@Controller({ name: 'AuthenticationController', path: 'auth', useLogger: true })
class AuthenticationController {
  logger: ILogger;

  //================================================================================================
  @Post('login', {
    successSchema: { propertyType: LoginResponseBodyDto },
    errorData: [
      newBakkuHttpError(HttpStatusCodes.BAD_REQUEST, { message: 'invalid user', code: 'invalid_user' }),
      newBakkuHttpError(HttpStatusCodes.BAD_REQUEST, { message: 'invalid password', code: 'invalid_password' }),
      newBakkuHttpError(HttpStatusCodes.BAD_REQUEST, { message: 'user is not active', code: 'inactive_user' }),
    ],
  })
  async login(@Body() body: LoginRequestBodyDto): Promise<LoginResponseBodyDto> {
    this.logger.info('AuthenticationController == login', { body });
    // TODO
    return {
      jwt: '',
    };
  }

  //================================================================================================
  @Post('forgot-password', {
    successSchema: { propertyType: ForgotPasswordResponseBodyDto },
    errorData: [newBakkuHttpError(HttpStatusCodes.BAD_REQUEST)],
  })
  async forgotPassword(@Body() body: ForgotPasswordRequestBodyDto): Promise<ForgotPasswordResponseBodyDto> {
    this.logger.info('AuthenticationController == forgotPassword', { body });
    // TODO
    return { nonce: '' };
  }

  //================================================================================================
  @Post('reset-password', { errorData: newBakkuHttpError(HttpStatusCodes.BAD_REQUEST) })
  async resetPassword(@Body() body: ResetPasswordRequestBodyDto): Promise<void> {
    this.logger.info('AuthenticationController == resetPassword', { body });
    // TODO
  }
}
