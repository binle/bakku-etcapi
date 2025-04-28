/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Configuration,
  ControllerMethodPath,
  convertToSwaggerJson,
  DefaultApplicationConfiguration,
  DocumentRouter,
  GenerateDocumentHandler,
  HttpStatusCodes,
  IBakkuConfiguration,
  IBakkuHttpError,
  INumberSchema,
  IObjectSchema,
  ISchemaCore,
  IStringSchema,
  newBakkuHttpError,
  NumberSchema,
  StringSchema,
  TypeGetErrorSchema,
  TypeGetSuccessSchema,
} from '@bakku/etcapi';
import cors, { CorsOptions } from 'cors';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { AuthorizedUserFilter, DetectUserFilter } from './filters';

@Configuration()
class SampleConfiguration extends DefaultApplicationConfiguration {
  constructor() {
    super();
  }

  configure(bakkuConfiguration: IBakkuConfiguration): IBakkuConfiguration {
    super
      .configure(bakkuConfiguration)
      .setCorsHandlerGlobal(this.getDefaultCorsHandler(['*']))
      .setResponseDataHandlerGlobal(this.getReponseDataHandler())
      .setErrorHandlerGlobal(this.getErrorHandler())
      .addFilter(new DetectUserFilter(), new AuthorizedUserFilter())
      .setDocumentPath('doc')
      .setGenerateDocumentHandler(this.getDocumentHandler(bakkuConfiguration.getConfiguration().documentPath as string))
      .setSwaggerDocumentPath('swagger')
      .setGenerateSwaggerDocumentHandlers(
        this.getSwaggerDocumentHandler(bakkuConfiguration.getConfiguration().swaggerDocumentPath as string)
      );
    return bakkuConfiguration;
  }

  getNotfoundHandler() {
    return () => {
      throw newBakkuHttpError(HttpStatusCodes.NOT_FOUND, { message: 'page is not exist, please contact admin!' });
    };
  }

  getDefaultCorsHandler(whitelist: string[]): RequestHandler {
    const corsOptions: CorsOptions = {
      origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin || whitelist.includes('*') || whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(
            newBakkuHttpError(HttpStatusCodes.METHOD_NOT_ALLOWED, {
              code: 'invalid_cors',
              message: 'Not allowed by CORS!',
            })
          );
        }
      },
    };
    return cors(corsOptions);
  }

  private getSwaggerDocumentHandler(swaggerPath: string): GenerateDocumentHandler {
    return (existedApis: ControllerMethodPath): RequestHandler | RequestHandler[] => {
      const swaggerJson = convertToSwaggerJson(existedApis, {
        getErrorSchemaGlobal: this.getErrorSchema(),
        getSuccessSchemaGlobal: this.getSuccessSchema(),
      });
      return [...swaggerUi.serve, swaggerUi.setup(swaggerJson)];
      // return [...swaggerUi.serve, swaggerUi.setup(temp)];
    };
  }

  private getDocumentHandler(docPath: string): GenerateDocumentHandler {
    return (existedApis: ControllerMethodPath) =>
      DocumentRouter.getDocumentHandler(existedApis, docPath, {
        getSuccessSchemaGlobal: this.getSuccessSchema(),
        getErrorSchemaGlobal: this.getErrorSchema(),
      });
  }

  private getReponseDataHandler() {
    return (data: any, res: Response) => {
      res.send(data);
    };
  }

  private getSuccessSchema(): TypeGetSuccessSchema {
    return (dataSchema?: ISchemaCore) => dataSchema;
  }

  private getErrorHandler() {
    return (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
      console.log('getErrorHandler======================', err);
      const error = err as IBakkuHttpError;
      const status = error.status || 500;
      const message = status < 500 ? error.message : 'Internal Server Error';
      const code = error.code;
      const data = error.data;
      res.status(status).json({ status, code, message, data });
    };
  }

  private getErrorSchema(): TypeGetErrorSchema {
    return () =>
      ({
        type: 'object',
        description: 'Request failed :',
        properties: {
          status: { ...NumberSchema, validation: { isRequired: true } } as INumberSchema,
          message: { ...StringSchema, validation: { isRequired: true } } as IStringSchema,
          code: StringSchema,
          data: {
            type: 'object',
            description: 'Data relate to the error. It can be exist or not!',
          } as IObjectSchema,
        } as IObjectSchema<IBakkuHttpError>,
      } as IObjectSchema);
  }
}
