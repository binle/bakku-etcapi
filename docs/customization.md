# 1 Middleware - define pre handler for each API

- In addition to the filters provided in the config, system provide way to process before your API:

- `middlewares?: MiddlewareInjectData`:property in method injected params: **use for define handlers and process it before your API**

```

const checkAuthenticatedUserHandler = (req: Request, res: Response, next: NextFunction) => {
  // do some things
};

const checkUserPermissionHandler = (req: Request, res: Response, next: NextFunction) => {
  //  do some things and compare with realtime data
}

@Controller({ name: 'UserController', path: 'user' })
class UserController {
  @Get('', {
    middlewares: [checkAuthenticatedUserHandler,checkUserPermissionHandler]
  })
  getUsers(){
    // do some things
  }
}
```

# 2 MulterMiddleware - define pre handler for upload API

- process for upload API, it use multer library
- `multer?: IMulterInjectedParams` : property in method injected params: it work like `middlewares` but multer will be processed after `middlewares`

```
export interface IMulterFileOption {
  name: string;
}
export interface IMulterMultiFileOption extends IMulterFileOption {
  maxCount?: number;
}

export interface IMulterInjectedParams {
  single?: IMulterFileOption; // 1 file
  array?: IMulterMultiFileOption; // list files in one name
  fields?: IMulterMultiFileOption[]; // list files with matching in name
  options?: multer.Options;
}
```

EX:

```
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(global.applicationContexts.rootPath, 'storage', 'temp_' + Date.now()));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname);
  },
});
const options = { storage };

@Controller({ name: 'UserController', path: 'user' })
class UserController {
  @Post('avatar',{
    multer: {single: {name: 'avatar'}, options},  // upload 1 file, use "single"
    bodyContentType: 'multipart/form-data',
  })
  uploadAvatar(@Body() body: any, @Req() req, ){
    // body.avatar === req.file => your uploaded file : Express.Multer.File
  }

  @Post('files/array',{
    multer: {array: {name: 'arrayFiles', maxCount: 2},  options}, // upload list file, use "array"
    bodyContentType: 'multipart/form-data',
  })
  uploadFile1(@Body() body: any, @Req() req, ){
    // body.arrayFiles === req.files => your uploaded files, max 2 files : [Express.Multer.File]
  }

  @Post('files/fields', {
    multer: {
      fields: [{
        name: 'avatar', max: 1
      },{
        name: 'certification', max: 10
      }],
      options
    }, // upload multi file with matching name, use "fields"
    bodyContentType: 'multipart/form-data',
  })
  uploadFile1(@Body() body: any, @Req() req, ){
    // body.avatar === req.files['avatar']  => array files with 1 file: Express.Multer.File
    // body.certification === req.files['certification'] => array files : [Express.Multer.File]
  }
}
```

# 3. Custom Response Data Handler

- In addition to the data handler (`setResponseDataHandlerGlobal`) provided in the config, system provide way to custom response data for each API:
- `customSuccessHandler?: ResponseDataHandler;`: property in method injected params

```

class ListUserResponse {
  @DataProperty()
  count: number;
  @DataArrayProperty({itemSchema: {propertyType: User}})
  users: User[];
}

@Controller({ name: 'UserController', path: 'user' })
class UserController {
  @Get('', {
    customSuccessHandler: (returnedData: any, res: Response) =>{
      // EX default response body format: {ok: boolean, data: {...returnedData}};
      // Change response body format => {...returnedData} -- don't need "ok" property.
      res.send(returnedData);
    },
    successSchema: {propertyType: ListUserResponse } // also define custom format for generating API info in document
  })

  getUsers(){
    const returnedData = {
      count: 0,
      list: [],
    };
    // do some things
    return returnedData;
  }


  // custom for api download file
  @Get('file/:id', {
    customSuccessHandler: (returnedData: any, res: Response) => fs.createReadStream(filePath).pipe(res),
    successSchema: { description: 'File Content'},
  })
  downloadFile(){
    let downloadFilePath = '';
    return downloadFilePath;
  }
}
```

### NOTE: when you custom response data, you should defined the changed schema (`successSchema`) for generate API document, too.

# 4. Custom Response Error Handler

- the same with custom response data, we can custom error handler for each API
- `customErrorHandler?: ErrorRequestHandler`: property in method injected params

```
@Controller({ name: 'UserController', path: 'user' })
class UserController {
  @Get('', {
    customErrorHandler: (err: Error, req: Request, res: Response) => {
      // EX default response body format: {ok: false, error: {...error}};
      // change format:
      const error = err as IBakkuHttpError;
      const status = error.status || 500;
      const message = status < 500 ? error.message : 'Internal Server Error';
      const code = error.code;
      const data = error.data;
      res.status(status).json({ status, code, message, data });
    },
    errorSchema: { type: 'object',
      properties: { // custom error schema, too
      status: NumberSchema,
      code: StringSchema,
      message: StringSchema,
      data: {type: 'object', description: 'any data'},
    },
    errorData: [ // many errors
      newBakkuHttpError(HttpStatusCodes.NOT_FOUND, { message: 'code 2 error', code: 'code_2' }),
      newBakkuHttpError(HttpStatusCodes.NOT_FOUND, { message: 'code 3 error', code: 'code_3' }),
    ]
  })
  getUsers(){
    // do somethings
  }
}

```

### NOTE: when you custom error data, you should defined the changed schema (`errorSchema`) for generate API document, too.
