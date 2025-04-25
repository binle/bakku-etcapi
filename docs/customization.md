# 1 Midleware - define pre handler for each API

- In addition to the filters provided in the config, system provide way to process before your API:

- `@Middleware( middleware: MiddlewareInjectData)` - MiddlewareInjectData = RequestHandler | RequestHandler[];

  > > use for define a handler and process it before your API

- `@MiddlewareCustom(getMiddleware: TypeGetRequestHandle)` - TypeGetRequestHandle = ()=> RequestHandler;
  > > sometime, your handler need to dinfe base on real time of request, it will be define hanlder and process it before your API.

```

const checkAuthenticatedUserHandler = (req: Request, res: Response, next: NextFunction) => {
  // do some things
};

const getCheckUserPermissionHandler = () => {
  // check some things ... and get realtime data
  return (req: Request, res: Response, next: NextFunction) => {
    //  do some things and compare with realtime data
  }
}

@Controller({ name: 'UserController', path: 'user' })
class UserController {
  @Get('')
  @Middleware(checkAuthenticatedUserHandler)
  @MiddlewareCustom(getCheckUserPermissionHandler)
  getUsers(){
    // do some things
  }
}
```

# 2 MulterMiddleware - define pre handler for upload API

- process for upload API, it use multer librarty
- `@MulterMiddleware(option: IMulterInjectedParams)`;

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

const MyMulterMiddleware = (optionData: IMulterInjectedParams) =>
  MulterMiddleware({ ...optionData, options: { storage } });

@Controller({ name: 'UserController', path: 'user' })
class UserController {
  @Post('avatar','[description]', 'multipart/form-data')
  // upload 1 file, use "single"
  @MulterMiddleware({single: {name: 'avartar'}, options: { storage }})
  uploadAvartar(@Body() body: any, @Req() req, ){
    // body.avatar === req.file => your uploaded file
  }

  @Post('files/array','[description]', 'multipart/form-data')
  // upload list file, use "array"
  @MyMulterMiddleware({array: {name: 'arrayFiles', maxCount: 2}})
  uploadFile1(@Body() body: any, @Req() req, ){
    // body.arrayFiles === req.files => your uploaded files, max 2 files
  }

  @Post('files/fields','[description]', 'multipart/form-data')
  // upload multi file with matching name, use "fields"
  @MyMulterMiddleware({fields: [{
    name: 'avatar', max: 1
  },{
    name: 'certification', max: 10
  }]})
  uploadFile1(@Body() body: any, @Req() req, ){
    // body.avatar === req.files['avatar']  => array files with 1 file
    // body.certification === req.files['certification'] => array files
  }
}
```

# 3. Custome Response Data Handler

- In addition to the data hanlder (`setResponseDataHandlerGlobal`) provided in the config, system provide way to custom reponse data for each API:
- `@ResponseCustomDataHandler(responseDataHandler : ResponseDataHandler )` - do some things before return data or custome returned data format or when return downloaded file.

```

class ListUserReponse {
  @DataProperty()
  count: number;
  @DataArrayProperty({itemSchema: {propertyType: User}})
  users: User[];
}

@Controller({ name: 'UserController', path: 'user' })
class UserController {
  @Get('')
  @ResponseCustomDataHandler((returnedData: any, res: Response) =>{
    // EX default response body format: {ok: boolean, data: {...returnedData}};
    // Change response body format => {...returnedData} -- don't need "ok" property.
    res.send(returnedData);
  })
  // custome formart for generate API infor in document - useDifferentResponse: true
  @ResponseSuccessSchema({propertyType: ListUserReponse, useDifferentResponse: true, })
  getUsers(){
    const returnedData = {
      count: 0,
      list: [],
    };
    // do some things
    return returnedData;
  }


  // custome for api download file
  @Get('file/:id')
  @ResponseCustomDataHandler((filePath: any, res: Response) =>{
    fs.createReadStream(filePath).pipe(res);
  })
  @ResponseSuccessSchema({ description: 'File Content', useDifferentResponse: true})
  downloadFile(){
    let downlaodFilePath = '';
    return downlaodFilePath;
  }
}
```

### NOTE: when you custom reposne data, you should change schema for geneate API document, too.

Use `@ResponseSuccessSchema, @ResponseSuccessObjectSchema, @ResponseSuccessArraySchema` with `useDifferentResponse: useDifferentResponse: true`

# 4. Custome Response Error Handler

- the same with custome reponse data, we can custome error handler for each API
- `@ResponseCustomErrorHandler(errorHandler: ErrorRequestHandler)`

```
@Controller({ name: 'UserController', path: 'user' })
class UserController {
  @Get('')
  @ResponseCustomErrorHandler((err: Error, req: Request, res: Response) => {
    // EX default response body format: {ok: false, error: {...error}};
    // change format:
    const error = err as IBakkuHttpError;
    const status = error.status || 500;
    const message = status < 500 ? error.message : 'Internal Server Error';
    const code = error.code;
    const data = error.data;
    res.status(status).json({ status, code, message, data });
  })
 @ResponseErrorSchema([ // many errors
    newBakkuHttpError(HttpStatusCodes.NOT_FOUND, { message: 'code 2 error', code: 'code_2' }),
    newBakkuHttpError(HttpStatusCodes.NOT_FOUND, { message: 'code 3 error', code: 'code_3' }),
  ],{ type: 'object',
    properties: { // custom error schema, too
    status: NumberSchema,
    code: StringSchema,
    message: StringSchema,
    data: {type: 'object', description: 'any data'},
  }}
  )
  getUsers(){
    // do somethings
  }
}

```
