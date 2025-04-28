import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatusCodes,
  ILogger,
  IMulterInjectedParams,
  Middleware,
  MulterMiddleware,
  newBakkuHttpError,
  Params,
  Post,
  Put,
  Queries,
  ResponseErrorSchema,
  ResponseSuccessSchema,
} from '@bakku/etcapi';
import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import {
  ListUserDto,
  ProfileRequestBodyDto,
  RequestParams,
  RequestQueries,
  UserDto,
  UserRequestBodyDto,
} from 'src/definitions';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(global.applicationContexts.rootPath, 'storage', 'user/temp_' + Date.now()));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname);
  },
});
const ProfileMulterMiddleware = (optionData: IMulterInjectedParams) =>
  MulterMiddleware({ ...optionData, options: { storage } });

const AdminPermissonMiddleware = () => {
  return Middleware((req: Request, response: Response, next: NextFunction) => {
    if (req.user?.role === 'ADMIN') {
      next();
      return;
    }
    throw newBakkuHttpError(HttpStatusCodes.METHOD_NOT_ALLOWED, {
      message: 'invalid permission',
      code: 'invalid permission',
    });
  });
};

@Controller({ name: 'UserController', path: 'user', useLogger: true })
class UserController {
  logger: ILogger;

  //================================================================================================
  @Get('filter')
  @ResponseSuccessSchema({ propertyType: ListUserDto })
  @ResponseErrorSchema([newBakkuHttpError(HttpStatusCodes.UNAUTHORIZED)])
  async filterUser(@Queries() queries: RequestQueries): Promise<ListUserDto> {
    // TODO
    this.logger.info('UserController == filterUser', { queries });
    return null as any;
  }

  //================================================================================================
  @Get('')
  @AdminPermissonMiddleware()
  @ResponseSuccessSchema({ propertyType: ListUserDto })
  @ResponseErrorSchema([newBakkuHttpError(HttpStatusCodes.UNAUTHORIZED)])
  async getUsers(@Queries() queries: RequestQueries): Promise<ListUserDto> {
    // TODO
    this.logger.info('UserController == getUsers', { queries });
    return null as any;
  }
  //================================================================================================
  @Get(':id')
  @AdminPermissonMiddleware()
  @ResponseSuccessSchema({ propertyType: UserDto })
  @ResponseErrorSchema([
    newBakkuHttpError(HttpStatusCodes.UNAUTHORIZED),
    newBakkuHttpError(HttpStatusCodes.BAD_REQUEST, { message: 'user not exist', code: 'invalid_user' }),
  ])
  async getUser(@Params() params: RequestParams): Promise<UserDto> {
    // TODO
    this.logger.info('UserController == getUser', { params });
    return null as any;
  }
  //================================================================================================
  @Post('')
  @AdminPermissonMiddleware()
  @ResponseSuccessSchema({ propertyType: UserDto })
  @ResponseErrorSchema([
    newBakkuHttpError(HttpStatusCodes.UNAUTHORIZED),
    newBakkuHttpError(HttpStatusCodes.BAD_REQUEST, { message: 'user not exist', code: 'invalid_user' }),
  ])
  async createUser(@Body() body: UserRequestBodyDto): Promise<UserDto> {
    // TODO
    this.logger.info('UserController == createUser', { body });
    return null as any;
  }
  //================================================================================================
  @Put(':id')
  @AdminPermissonMiddleware()
  @ResponseSuccessSchema({ propertyType: UserDto })
  @ResponseErrorSchema([
    newBakkuHttpError(HttpStatusCodes.UNAUTHORIZED),
    newBakkuHttpError(HttpStatusCodes.BAD_REQUEST, { message: 'user not exist', code: 'invalid_user' }),
  ])
  updateUser(@Params() params: RequestParams, @Body() body: UserRequestBodyDto): Promise<UserDto> {
    this.logger.info('UserController == updateUser', { params, body });
    // TODO
    return null as any;
  }
  //================================================================================================
  @Delete(':id')
  @AdminPermissonMiddleware()
  @ResponseErrorSchema([
    newBakkuHttpError(HttpStatusCodes.UNAUTHORIZED),
    newBakkuHttpError(HttpStatusCodes.BAD_REQUEST, { message: 'user not exist', code: 'invalid_user' }),
  ])
  async deleteUser(@Params() params: RequestParams): Promise<void> {
    this.logger.info('UserController == updateUser', { params });
    // TODO
  }

  //================================================================================================
  @Post(':id/profile', { bodyContentType: 'multipart/form-data', description: 'Save user profile.' })
  @ProfileMulterMiddleware({ single: { name: 'avartarFile' } })
  @AdminPermissonMiddleware()
  @ResponseSuccessSchema({ propertyType: UserDto })
  async saveUserProfile(@Body() body: ProfileRequestBodyDto): Promise<UserDto> {
    // body.avartarFile =>  req.file
    // TODO
    return null as any;
  }
}
