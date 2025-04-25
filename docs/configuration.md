# 1. Overwview

- Use `@Configuration` in the configuration class to define configuration for your server.
- There is only one class (with @Configuration) is allowed, if you have more than one, it will throw error.
- The class must implement `IApplicationConfiguration`. in the best, you shoule be extends `AbstractApplicationConfiguration` or `DefaultApplicationConfiguration` and overwrite function if needed.

EX:

```
@Configuration()
class SampleConfiguration extends AbstractApplicationConfiguration {
  constructor() {
    super();
  }

  // your configuration
  configure(bakkuConfiguration: IBakkuConfiguration): IBakkuConfiguration {
     bakkuConfiguration
      .setApiPrefix('api')
      .setJSONParsingHandlerGlobal(this.getJSONParsingHandlerGlobal())
      .setUrlEncodeHandlerGlobal(this.getUrlEncodeHandlerGlobal())
      .setCookieHandlerGlobal(this.getCookieHandlerGlobal())
    return bakkuConfiguration;
  }

  private getJSONParsingHandlerGlobal() {
    return express.json();
  }


  private getUrlEncodeHandlerGlobal() {
    return express.urlencoded({ extended: true });
  }

  private getCookieHandlerGlobal() {
    return cookieParser();
  }
```

### NOTE: all hanlders at above are implemented in `DefaultApplicationConfiguration`, you can extends `DefaultApplicationConfiguration` and continue process your config if need.

```
@Configuration()
class SampleConfiguration extends DefaultApplicationConfiguration {
  constructor() {
    super();
  }

  // config your hanlders if needed
  configure(bakkuConfiguration: IBakkuConfiguration): IBakkuConfiguration {
    super
      .configure(bakkuConfiguration)
      .setNotFoundHandlerGlobal(this.getNotfoundHandler());
    return bakkuConfiguration;
  }

  private getNotfoundHandler() {
    //Request, Reponse, NextFunction from express handler request.
    return (_req: Request, _res: Reponse, _next: NextFunction) => {
      throw newBakkuHttpError(HttpStatusCodes.NOT_FOUND, { message: 'page is not exist, please contact admin!' });
    };
  }

```

# 2 Configuration

### 2.1 setApiPrefix(prefix: string): IBakkuConfiguration

set prefix path for all APIs in your controllers.

- in `DefaultApplicationConfiguration`, the default prefix is `api`, so all APIs will have prefix `api` in the first url path. EX: `[domain]/api/user`, `[domain]/api/login` ...

```
@Configuration()
class SampleConfiguration extends DefaultApplicationConfiguration {
  constructor() {
    super();
  }

  // config your hanlders if needed
  configure(bakkuConfiguration: IBakkuConfiguration): IBakkuConfiguration {
    super
      .configure(bakkuConfiguration)
      .setApiPrefix('sampleAPI'); // set your prefix => `[domain]/sampleAPI/user` `[domain]/sampleAPI/login`
    return bakkuConfiguration;
  }
```

### 2.2 setCorsHandlerGlobal(handler: RequestHandler): IBakkuConfiguration

- config your CORS hanlder, if you not set, it will re-use the default cors from `express`

```
@Configuration()
class SampleConfiguration extends DefaultApplicationConfiguration {
  constructor() {
    super();
  }

  // config your hanlders if needed
  configure(bakkuConfiguration: IBakkuConfiguration): IBakkuConfiguration {
    super
      .configure(bakkuConfiguration)
      .setCorsHandlerGlobal(this.getDefaultCorsHandler());
    return bakkuConfiguration;
  }

  private getDefaultCorsHandler(whitelist: string[]): RequestHandler {
    const whitelist = ['*'];
    // whiteList should be get from resouce config.
    // EX: whitelist = global.appResouces.corsWhiteList;

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
```

### 2.3 setJSONParsingHandlerGlobal(handler: RequestHandler): IBakkuConfiguration

- config your JSON parsing hanlder if needed, default it is not set.
- if your config extends `DefaultApplicationConfiguration`, the handler use `express.json()`

```
@Configuration()
class SampleConfiguration extends DefaultApplicationConfiguration {
  constructor() {
    super();
  }

  // config your hanlders if needed
  configure(bakkuConfiguration: IBakkuConfiguration): IBakkuConfiguration {
    super
      .configure(bakkuConfiguration)
      .setJSONParsingHandlerGlobal(this.getJSONParsingHandlerGlobal());
    return bakkuConfiguration;
  }

  private getJSONParsingHandlerGlobal() {
    // apply your JSON parsing
    const sampleOption = {...};
    return express.json(sampleOption);
  }
```

### 2.4 setUrlEncodeHandlerGlobal(handler: RequestHandler): IBakkuConfiguration

- config your Url encode hanlder if needed, default it is not set.
- if your config extends `DefaultApplicationConfiguration`, the handler use `express.urlencoded({ extended: true })`

```
@Configuration()
class SampleConfiguration extends DefaultApplicationConfiguration {
  constructor() {
    super();
  }

  // config your hanlders if needed
  configure(bakkuConfiguration: IBakkuConfiguration): IBakkuConfiguration {
    super
      .configure(bakkuConfiguration)
      .setUrlEncodeHandlerGlobal(this.getUrlEncodeHandlerGlobal());
    return bakkuConfiguration;
  }

  private getUrlEncodeHandlerGlobal() {
    // apply your url encode parsing
    return express.urlencoded({extended: false});
  }
```

### 2.5 setCookieHandlerGlobal(handler: RequestHandler): IBakkuConfiguration

- config your Cookie hanlder if needed, default it is not set.
- if your config extends `DefaultApplicationConfiguration`, the handler use `cookie-parser` library - `cookieParser()`

```
@Configuration()
class SampleConfiguration extends DefaultApplicationConfiguration {
  constructor() {
    super();
  }

  // config your hanlders if needed
  configure(bakkuConfiguration: IBakkuConfiguration): IBakkuConfiguration {
    super
      .configure(bakkuConfiguration)
      .setCookieHandlerGlobal(this.getCookieHandlerGlobal());
    return bakkuConfiguration;
  }

  private getCookieHandlerGlobal() {
    return cookieParser();
    // return cookieParser('secret', {...yourOption});
  }
```

### 2.6 setNotFoundHandlerGlobal(handler: RequestHandler): IBakkuConfiguration

- config your not found hanlder if needed, if you not set it, you have self do it in each API.
- if your config extends `DefaultApplicationConfiguration`, the default handler is

```
  (_req: Request, _res: Response, _next: NextFunction) => {
    throw newBakkuHttpError(HttpStatusCodes.NOT_FOUND);
  }
```

EX:

```
@Configuration()
class SampleConfiguration extends DefaultApplicationConfiguration {
  constructor() {
    super();
  }

  // config your hanlders if needed
  configure(bakkuConfiguration: IBakkuConfiguration): IBakkuConfiguration {
    super
      .configure(bakkuConfiguration)
      .setNotFoundHandlerGlobal(this.getNotfoundHandler());
    return bakkuConfiguration;
  }

  private getNotfoundHandler() {
    // apply your not found handler
    return (_req: Request, _res: Reponse, _next: NextFunction) => {
      throw newBakkuHttpError(HttpStatusCodes.NOT_FOUND, { message: 'Page is not exist, please contact admin!' });
    };
  }
```

### 2.7 setErrorHandlerGlobal(handler: ErrorRequestHandler): IBakkuConfiguration

- config your error hanlder if needed, you have self do it in each API.
- in `DefaultApplicationConfiguration`, the default handler is

```
  (error: IBakkuHttpError, _req: Request, res: Response, _next: NextFunction): void => {
    const status = error.status || 500;
    const message = status < 500 ? error.message : 'Internal Server Error';
    const code = error.code;
    const data = error.data;
    res.status(status).json({ ok: false, error: { status, code, message, data } });
  }
```

EX:

```
@Configuration()
class SampleConfiguration extends DefaultApplicationConfiguration {
  constructor() {
    super();
  }

  // config your hanlders if needed
  configure(bakkuConfiguration: IBakkuConfiguration): IBakkuConfiguration {
    super
      .configure(bakkuConfiguration)
      .setErrorHandlerGlobal(this.getErrorHandler());
    return bakkuConfiguration;
  }

   private getErrorHandler() {
    return (error: IBakkuHttpError, _req: Request, res: Response, _next: NextFunction): void => {
      // apply your logic
      // EX: logger.error('Error  ===========', error);;
      //
      const status = error.status || 500;
      const message = status < 500 ? error.message : 'Internal Server Error';
      const code = error.code;
      const data = error.data;
      res.status(status).json({ status, code, message, data });
    };
  }
```

### 2.7 setErrorHandlerGlobal(handler: ErrorRequestHandler): IBakkuConfiguration

- config your error hanlder if needed, you have self do it in each API.
- in `DefaultApplicationConfiguration`, the default handler is

```
  (error: IBakkuHttpError, _req: Request, res: Response, _next: NextFunction): void => {
    const status = error.status || 500;
    const message = status < 500 ? error.message : 'Internal Server Error';
    const code = error.code;
    const data = error.data;
    res.status(status).json({ ok: false, error: { status, code, message, data } });
  }
```

EX:

```
@Configuration()
class SampleConfiguration extends DefaultApplicationConfiguration {
  constructor() {
    super();
  }

  // config your hanlders if needed
  configure(bakkuConfiguration: IBakkuConfiguration): IBakkuConfiguration {
    super
      .configure(bakkuConfiguration)
      .setErrorHandlerGlobal(this.getErrorHandler());
    return bakkuConfiguration;
  }

   private getErrorHandler() {
    return (error: IBakkuHttpError, _req: Request, res: Response, _next: NextFunction): void => {
      // apply your logic
      // EX: logger.error('Error  ===========', error);;
      //
      const status = error.status || 500;
      const message = status < 500 ? error.message : 'Internal Server Error';
      const code = error.code;
      const data = error.data;
      res.status(status).json({ status, code, message, data });
    };
  }
```

### 2.8 setResponseDataHandlerGlobal(responseDataHandlerGlobal: ResponseDataHandler): IBakkuConfiguration

- handle response return data, default is

```
(data: any, res: Response) => res.send({ ok: true, data })
```

EX:

```
@Configuration()
class SampleConfiguration extends DefaultApplicationConfiguration {
  constructor() {
    super();
  }

  // config your hanlders if needed
  configure(bakkuConfiguration: IBakkuConfiguration): IBakkuConfiguration {
    super
      .configure(bakkuConfiguration)
      .setResponseDataHandlerGlobal((data: any, res: Response) => {
        // do somethings
        res.status(200).send({ ok: true, data });
        // or custome response data format
        // res.status(200).send(data);
      });
    return bakkuConfiguration;
  }
```

if you change the response format, [refer this for more customization](./customization.md)

### 2.9 setDocumentPath(documentPath: string): IBakkuConfiguration

- config path for document URL (API document), use to generate document page.
- default empty, the document page is not generate.
- must include `setGenerateDocumentHandler(generateHandler: GenerateDocumentHandler): IBakkuConfiguration`

[refer this for more customization](./customization.md)

### 2.10 setGenerateDocumentHandler(generateHandler: GenerateDocumentHandler): IBakkuConfiguration

- config way to generate document content for document page.
- default empty, the document page is not generate.
- must include `setDocumentPath(documentPath: string): IBakkuConfiguration`
- in `DefaultApplicationConfiguration`, the default handler is
- Recomend use `DocumentRouter.getDocumentHandler(existedApis, docPath)` for handling document data. You can use your handler, but it can make failed data, or not correct.

```
(existedApis: ControllerMethodPath) => DocumentRouter.getDocumentHandler(existedApis, docPath);
```

[refer this for more customization](./customization.md)

EX:

```
@Configuration()
class SampleConfiguration extends DefaultApplicationConfiguration {
  constructor() {
    super();
  }

  // config your hanlders if needed
  configure(bakkuConfiguration: IBakkuConfiguration): IBakkuConfiguration {
    super
      .configure(bakkuConfiguration)
      .setDocumentPath('doc')
      .setExpressSetting(this.getExpressSetting());
    return bakkuConfiguration;
  }

  private getDefaultDocumentHandler(docPath: string): GenerateDocumentHandler {
    return (existedApis: ControllerMethodPath) => DocumentRouter.getDocumentHandler(existedApis, docPath);
  }
}
```

### 2.11 setSwaggerDocumentPath(swaggerPath: string): IBakkuConfiguration

- config path for swagger URL (API document), use to generate swagger page.
- default empty, the swagger page is not generate.
- must include `setGenerateSwaggerDocumentHandlers(handlers: GenerateDocumentHandler): IBakkuConfiguration`
- Recommend use `convertToSwaggerJson(existedApis)` for convert to Swaager Json Data (version 3). You can change it if you use different swwager, or other document generation.
- after swaggerJson is generated, you can add more [securitySchemes](https://swagger.io/specification/#security-scheme-object) `swaggerJson.components.securitySchemes` if needed.

[refer this for more customization](./customization.md)

### 2.12 setGenerateSwaggerDocumentHandlers(handlers: GenerateDocumentHandler): IBakkuConfiguration

- config way to convert to swagger content for swwager page.
- default empty, the swagger page is not generate.
- must include `setSwaggerDocumentPath(swaggerPath: string): IBakkuConfiguration`

[refer this for more customization](./customization.md)

EX:

```
@Configuration()
class SampleConfiguration extends DefaultApplicationConfiguration {
  constructor() {
    super();
  }

  // config your hanlders if needed
  configure(bakkuConfiguration: IBakkuConfiguration): IBakkuConfiguration {
    super
      .configure(bakkuConfiguration)
      .setSwaggerDocumentPath('swagger')
      .setGenerateSwaggerDocumentHandlers(
        this.getSwaggerDocumentHandler(bakkuConfiguration.getConfiguration().swaggerDocumentPath as string)
      );
    return bakkuConfiguration;
  }


  private getSwaggerDocumentHandler(swaggerPath: string): GenerateDocumentHandler {
    return (existedApis: ControllerMethodPath): RequestHandler | RequestHandler[] => {
      // convertToSwaggerJson convert to SwaggerJSON
      const swaggerJson = convertToSwaggerJson(existedApis);
      // use swagger-ui-express to handle swagger API
      return [...swaggerUi.serve, swaggerUi.setup(swaggerJson)];
    };
  }
}
```

### 2.13 addFilter(filter: IApplicationFilter): IBakkuConfiguration

- add filter process for your server.

**TypeServerOptions:**

| name           | type                         | required | default | description                                                           |
| :------------- | :--------------------------- | :------- | :------ | :-------------------------------------------------------------------- |
| getAppliedPath | function: string or string[] | NO       |         | return path or list path will apply this filter, empty mean all paths |
| getHandler     | fucntion: RequestHandler     | yes      | 8080    | handler will be apply for listed paths or all paths                   |

```
@Configuration()
class SampleConfiguration extends DefaultApplicationConfiguration {
  constructor() {
    super();
  }

  // config your hanlders if needed
  configure(bakkuConfiguration: IBakkuConfiguration): IBakkuConfiguration {
    super
      .configure(bakkuConfiguration)
      .addFilter(new DetectUserFilter())
      .addFilter(new AuthorizedUserFilter());
    return bakkuConfiguration;
  }
}

// apply for all requests
class DetectUserFilter implements IApplicationFilter {
  getHandler(): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      req.user = { id: 'anonymous' };
      if (req.headers.authorization) {
        const jwt = req.headers.authorization.replace('Bearer ', '').replace('JWT', '');
        if (jwt) {
          req.user = this.decodeJWT(jwt);
        }
      }
      next();
    };
  }

  private decodeJWT(jwtString: string): IJWTUser {
    return { id: 'TODO' };
  }
}

// apply for requests which have prefix /api/user
class AuthorizedUserFilter implements IApplicationFilter {
  getAppliedPath(): string | string[] {
    return ['/api/user/*'];
  }
  getHandler(): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.user?.id || req.user?.id === 'anonymous') {
        throw newBakkuHttpError(HttpStatusCodes.UNAUTHORIZED);
      }
      next();
    };
  }
}
```

### 2.14 Self setting the express application

- using `getExpressApp` from `bakkuApplication` after start server for get Express Application and setting it.

```
const options: TypeServerOptions = {
  port: Number(global.applicationContexts.resource.port),
};
const { bakkuApplication } = startServer(options);
// EX:  disable x-powered-by
bakkuApplication.getExpressApp().disable('x-powered-by');
// setting other with bakkuApplication.getExpressApp() if need

```

**EX: setting static views**

```
import ejs from 'ejs';
ejs.delimiter = '@';
const options: TypeServerOptions = {
  port: Number(global.applicationContexts.resource.port),
};
const { bakkuApplication } = startServer(options);
bakkuApplication.getExpressApp().disable('x-powered-by');
// EX: setting server side render via ejs
bakkuApplication.getExpressApp().engine('html', ejs.renderFile);
bakkuApplication.getExpressApp().set('views', path.join(__dirname, 'views'));


//
@Controller({ name: 'SampleController', path: 'sample' })
class SampleController {
  @Get('hello', { hideInDoc: true })
  @ResponseCustomDataHandler((data, response) => {
    response.render('hello.html', data);
  })
  hello() {
    return {
      hello: 'Hello!',
      content: 'This is content render from server!',
    };
  }
}


// views/hello.html
<html>
  <head>
    <title>Hello page - sample server side render</title>
  </head>
  <body>
    <@= hello @>
    <br />
    <@= content @>
  </body>
</html>
```
