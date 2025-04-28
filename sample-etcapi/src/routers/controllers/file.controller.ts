import {
  Body,
  Controller,
  Get,
  ILogger,
  IMulterInjectedParams,
  MulterMiddleware,
  Params,
  Post,
  ResponseCustomDataHandler,
  ResponseSuccessSchema,
} from '@bakku/etcapi';
import multer from 'multer';
import path from 'path';
import { Response } from 'express';
import {
  FileUploadListyRequestBodyDto,
  FileUploadMapRequestBodyDto,
  FileUploadOneResponseBodyDto,
  FileUploadOneyRequestBodyDto,
  FileUploaListResponseBodyDto,
  FileUploaMapResponseBodyDto,
  RequestParams,
} from 'src/definitions';
import { createReadStream } from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(global.applicationContexts.rootPath, 'storage', 'file/temp_' + Date.now()));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname);
  },
});
const FileMulterMiddleware = (optionData: IMulterInjectedParams) =>
  MulterMiddleware({ ...optionData, options: { storage } });

@Controller({ name: 'FileController', path: 'file', useLogger: true })
class FileController {
  logger: ILogger;

  //================================================================================================
  @Post('upload/one', { bodyContentType: 'multipart/form-data' })
  @FileMulterMiddleware({ single: { name: 'oneFile' } })
  async uploadOne(@Body() body: FileUploadOneyRequestBodyDto): Promise<FileUploadOneResponseBodyDto> {
    this.logger.info('FileController == uploadOne', { body });
    // TODO
    return null as any;
  }
  //================================================================================================
  @Post('upload/list', { bodyContentType: 'multipart/form-data' })
  @FileMulterMiddleware({ array: { name: 'listFiles' } })
  async uploadList(@Body() body: FileUploadListyRequestBodyDto): Promise<FileUploaListResponseBodyDto> {
    this.logger.info('FileController == login', { body });
    // TODO
    return null as any;
  }
  //================================================================================================
  @Post('upload/map', { bodyContentType: 'multipart/form-data' })
  @FileMulterMiddleware({
    fields: [
      {
        name: 'map1',
      },
      { name: 'map2' },
    ],
  })
  async uploadMap(@Body() body: FileUploadMapRequestBodyDto): Promise<FileUploaMapResponseBodyDto> {
    this.logger.info('FileController == login', { body });
    // TODO
    return null as any;
  }

  //================================================================================================
  @Get(':id')
  @ResponseCustomDataHandler((filePath: string, res: Response) => {
    createReadStream(filePath).pipe(res);
  })
  @ResponseSuccessSchema({ description: 'file data', useDifferentResponse: true })
  async downloadFile(@Params() params: RequestParams) {
    this.logger.info('FileController == downloadFile', { params });
    let filePath = '';
    // TODO
    filePath = 'TODO with params.id';
    return filePath;
  }
}
