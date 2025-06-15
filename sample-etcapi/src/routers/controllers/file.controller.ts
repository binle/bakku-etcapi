/* eslint-disable @typescript-eslint/no-explicit-any */
import { Body, Controller, Get, ILogger, IMulterInjectedParams, Params, Post } from '@bakku/etcapi';
import multer from 'multer';
import path from 'path';
import { Response } from 'express';
import {
  FileUploadListRequestBodyDto,
  FileUploadMapRequestBodyDto,
  FileUploadOneResponseBodyDto,
  FileUploadOneRequestBodyDto,
  FileUploadListResponseBodyDto,
  FileUploadMapResponseBodyDto,
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
const options = { storage };

@Controller({ name: 'FileController', path: 'file', useLogger: true })
class FileController {
  logger: ILogger;

  //================================================================================================
  @Post('upload/one', {
    multer: { single: { name: 'oneFile' }, options },
    bodyContentType: 'multipart/form-data',
  })
  async uploadOne(@Body() body: FileUploadOneRequestBodyDto): Promise<FileUploadOneResponseBodyDto> {
    this.logger.info('FileController == uploadOne', { body });
    // TODO
    return null as any;
  }
  //================================================================================================
  @Post('upload/list', {
    multer: { array: { name: 'listFiles' }, options },
    bodyContentType: 'multipart/form-data',
  })
  async uploadList(@Body() body: FileUploadListRequestBodyDto): Promise<FileUploadListResponseBodyDto> {
    this.logger.info('FileController == login', { body });
    // TODO
    return null as any;
  }
  //================================================================================================
  @Post('upload/map', {
    bodyContentType: 'multipart/form-data',
    multer: {
      fields: [
        {
          name: 'map1',
        },
        { name: 'map2' },
      ],
      options,
    },
  })
  async uploadMap(@Body() body: FileUploadMapRequestBodyDto): Promise<FileUploadMapResponseBodyDto> {
    this.logger.info('FileController == login', { body });
    // TODO
    return null as any;
  }

  //================================================================================================
  @Get(':id', {
    customSuccessHandler: (filePath: string, res: Response) => createReadStream(filePath).pipe(res),
    successSchema: { description: 'file data' },
  })
  async downloadFile(@Params() params: RequestParams) {
    this.logger.info('FileController == downloadFile', { params });
    let filePath = '';
    // do somethings
    filePath = 'TODO with params.id';
    return filePath;
  }
}
