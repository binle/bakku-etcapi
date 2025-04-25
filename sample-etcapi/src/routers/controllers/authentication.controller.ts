import {
  Body,
  Controller,
  HttpStatusCodes,
  ILogger,
  newBakkuHttpError,
  Post,
  ResponseErrorSchema,
  ResponseSuccessSchema,
} from '@bakku/etcapi';
import {
  ForgotPasswordRequestBodyDto,
  ForgotPasswordResponseBodyDto,
  LoginReponseBodyDto,
  LoginRequestBodyDto,
  ResetPasswordRequestBodyDto,
} from 'src/definitions';

@Controller({ name: 'AuthenticationController', path: 'auth' })
class AuthenticationController {
  logger: ILogger;
  _bakku_logger_file = __filename;

  //================================================================================================
  @Post('login')
  @ResponseSuccessSchema({ propertyType: LoginReponseBodyDto })
  @ResponseErrorSchema([
    newBakkuHttpError(HttpStatusCodes.BAD_REQUEST, { message: 'invalid user', code: 'invalid_user' }),
    newBakkuHttpError(HttpStatusCodes.BAD_REQUEST, { message: 'invalid password', code: 'invalid_password' }),
    newBakkuHttpError(HttpStatusCodes.BAD_REQUEST, { message: 'user is not active', code: 'inactive_user' }),
  ])
  async login(@Body() body: LoginRequestBodyDto): Promise<LoginReponseBodyDto> {
    this.logger.info('AuthenticationController == login', { body });
    // TODO
    return {
      jwt: '',
    };
  }

  //================================================================================================
  @Post('forgot-password')
  @ResponseSuccessSchema({ propertyType: ForgotPasswordResponseBodyDto })
  @ResponseErrorSchema([newBakkuHttpError(HttpStatusCodes.BAD_REQUEST)])
  async forgotPassword(@Body() body: ForgotPasswordRequestBodyDto): Promise<ForgotPasswordResponseBodyDto> {
    this.logger.info('AuthenticationController == forgotPassword', { body });
    // TODO
    return { nonce: '' };
  }

  //================================================================================================
  @Post('reset-password')
  @ResponseErrorSchema([newBakkuHttpError(HttpStatusCodes.BAD_REQUEST)])
  async resetPassword(@Body() body: ResetPasswordRequestBodyDto): Promise<void> {
    this.logger.info('AuthenticationController == resetPassword', { body });
    // TODO
  }
}
