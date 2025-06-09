/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BakkuResource,
  Configuration,
  ControllerMethodPath,
  convertToSwaggerJson,
  DefaultApplicationConfiguration,
  DocumentRouter,
  GenerateDocumentHandler,
  HttpStatusCodes,
  IBakkuConfiguration,
  newBakkuHttpError,
} from '@bakku/etcapi';
import cors, { CorsOptions } from 'cors';
import { RequestHandler } from 'express';
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
      // NOTE: default api prefix is "",
      //  call to re-set it if you want to overwrite
      // .setApiPrefix('api')

      // NOTE: setNotFoundHandlerGlobal already exist in default value, which return 404,
      //  re-set it if you want to overwrite
      // .setNotFoundHandlerGlobal(this.getNotfoundHandler())
      .setCorsHandlerGlobal(this.getDefaultCorsHandler(BakkuResource.getResouceData().whitelist || ['*']))
      .addFilter(new DetectUserFilter(), new AuthorizedUserFilter())

      .setDocumentPath('doc')
      // NOTE: setGenerateDocumentHandler already exist in DefaultApplicationConfiguration,
      //  re-set it if you want to overwrite
      // .setGenerateDocumentHandler(
      //    this.getDocumentHandler(bakkuConfiguration.getConfiguration().documentPath as string))

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
      const swaggerJson = convertToSwaggerJson(existedApis);
      return [...swaggerUi.serve, swaggerUi.setup(swaggerJson)];
    };
  }

  private getDocumentHandler(docPath: string): GenerateDocumentHandler {
    return (existedApis: ControllerMethodPath) => DocumentRouter.getDocumentHandler(existedApis, docPath, {});
  }
}
