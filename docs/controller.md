# 1 Controler

`import {Controller} from '@bakku/etcapi';`

`@Controller(controllerInjectedParams: IControllerInjectedParams)`

**IControllerInjectedParams**:

| name        | type   | required | default | description                                          |
| :---------- | :----- | :------- | :------ | :--------------------------------------------------- |
| name        | string | yes      |         | name of controller, it should be exit one (unique)   |
| path        | string | yes      |         | path of controller, pre path for each api detail     |
| description | string | no       |         | description which display in API document or swagger |
| hideInDoc   | string | no       |         | you can hide apis of this controller if needed       |

```
@Controller({name: 'UserController', path:'user'})
class UserController {
  @Get('')  // => HTTP GET request path : [prefix]/user
  getListUsers(){
    return [{name :'Bakku'}];
  }

  @Get(':id') // => HTTP GET request path : [prefix]/user/1
  getUserDetail(){
    return {name :'Bakku'};
  }
}
```

# 2 Controller APIs:

### 2.1 @Get

`import {Get} from '@bakku/etcapi';`

`@Get(path: string, description?: string | { description?: string, hideInDoc?: boolean})`

```
@Controller({name: 'UserController', path:'user'})
class UserController {
  @Get('profile')  // => HTTP GET request path : [prefix]/user/profile
  getUserProfile(){
    return [{name :'Bakku'}];
  }
}
```

### 2.2 @Post

`import {Post} from '@bakku/etcapi';`

`@Post(path: string, description?: string | { description?: string, hideInDoc?: boolean, bodyContentType?: string})`

- description: description which display in API document or swagger
- hideInDoc: you can hide this api if needed
- bodyContentType: speical content type, default is **application/json**, use **multipart/form-data** if you need api for upload file

EX:

```
@Controller({name: 'UserController', path:'user'})
class UserController {
  @Post('')  // => HTTP POST request path : [prefix]/user
  createUser(){
  }
}
```

### 2.3 @Put

`import {Put} from '@bakku/etcapi';`

`@Put(path: string, description?: string | { description?: string, hideInDoc?: boolean, bodyContentType?: string})`

- description: description which display in API document or swagger
- hideInDoc: you can hide this api if needed
- bodyContentType: speical content type, default is application/json

```
@Controller({name: 'UserController', path:'user'})
class UserController {
  @Put(':id')  // => HTTP PUT request path : [prefix]/user/[id]
  updateUser(){
  }
}
```

### 2.4 @Pacth

`import {Pacth} from '@bakku/etcapi';`

`@Pacth(path: string, description?: string | { description?: string, hideInDoc?: boolean, bodyContentType?: string})`

- description: description which display in API document or swagger
- hideInDoc: you can hide this api if needed
- bodyContentType: speical content type, default is application/json

```
@Controller({name: 'UserController', path:'user'})
class UserController {
  @Pacth(':id')  // => HTTP PATCH request path : [prefix]/user/[id]
  saveUser(){
  }
}
```

### 2.5 @Delete

`import {Delete} from '@bakku/etcapi';`

`@Delete(path: string, description?: string | { description?: string, hideInDoc?: boolean, bodyContentType?: string})`

- description: description which display in API document or swagger
- hideInDoc: you can hide this api if needed
- bodyContentType: speical content type, default is application/json

```
@Controller({name: 'UserController', path:'user'})
class UserController {
  @Delete(':id')  // => HTTP DELETE request path : [prefix]/user/[id]
  deleteUser(){
  }
}
```

# 3 Controller Request Params and Data

### 3.1 @Params

`@Params(schema?: IObjectSchema)`

- **schema**: optional => define the params which are used. This will be present in document API
- **schema** auto be defined if you use ,object class and define it's data properties

EX1: without schema

```
@Controller({name: 'UserController', path:'user'})
class UserController {
  @Get(':id')  // => HTTP GET request path : [prefix]/user/[id]
  getUser(@Prams() data: any){
    // data.id => id param, user id
    return [{name :'Bakku'}];
  }
}
```

EX2: self define schema

```
@Controller({name: 'UserController', path:'user'})
class UserController {
  @Get(':id')  // => HTTP GET request path : [prefix]/user/[id]
  getUser(@Params({ type: 'object', properties: { id: StringSchema } }) data: {id: string}){
    // data.id => id param, user id
    return [{name :'Bakku'}];
  }
}
```

EX3: auto define schema

```
class DetailParams {
  @DataProperty()
  id: string;
}

@Controller({name: 'UserController', path:'user'})
class UserController {
  @Get(':id')  // => HTTP GET request path : [prefix]/user/[id]
  getUser(@Params() data: DetailParams){
    // data.id => id param, user id
    return {name :'Bakku'};
  }
}
```

### 3.2 @Queries

`@Queries(schema?: IObjectSchema)`

The same with [@Params](#31-params)

EX: auto define schema

```
class DetailQueries {
  @DataPropertyOptional()
  searchText?: string;
}

@Controller({name: 'UserController', path:'user'})
class UserController {
  @Get('')  // => HTTP GET request path : [prefix]/user?searchText=
  getListUser(@Queries() data: DetailQueries){
    // data.searchText => search text use for searching.
    return [{name :'Bakku'}];
  }
}
```

### 3.3 @Headers

`@Headers(schema?: IObjectSchema)`

The same with [@Params](#31-params)

EX: auto define schema

```
class DetailHeaders {
  @DataPropertyOptional()
  jwt?: string;
}

@Controller({name: 'UserController', path:'user'})
class UserController {
  @Get('')  // => HTTP GET request path : [prefix]/user
  getListUser(@Headers() headers: DetailHeaders){
    // headers.jwt => use for check user, authentication, permission...
    return [{name :'Bakku'}];
  }
}
```

### 3.4 @Body

`@Body(schema?: ISchemaGeneral)`

The same with [@Params](#31-params)

- **schema**: optional, body can be any things not only Object, that why it is `ISchemaGeneral` type
- only apply for Update, Put, Patch

EX: auto define schema

```
class UserSaveBodyRequest {
  @DataProperty()
  name: string;
  @DataProperty()
  email: string;
  //...
}

@Controller({name: 'UserController', path:'user'})
class UserController {
  @POST('')  // => HTTP POST request path : [prefix]/user
  saveUser(@Body() body: UserSaveBodyRequest){
    // body.name, body.email
    // do somthings.
  }
}
```

### 3.5 @BodyArray

The same with [@Body](#34-body)
Apply for body if it is array data.

EX: auto define schema

```
class UserSaveBodyRequest {
  @DataProperty()
  name: string;
  @DataProperty()
  email: string;
  //...
}

@Controller({name: 'UserController', path:'user'})
class UserController {
  @POST('')  // => HTTP POST request path : [prefix]/user
  saveUsers(@BodyArray() body: UserSaveBodyRequest[]){
    // body[0].name, body[0].email
    // do somthings.
  }
}
```

### 3.5 @Req

- pass Request from express handler

```
@Controller({name: 'UserController', path:'user'})
class UserController {
  @POST('')
  saveUsers(@Req() req: Request){
  }
}
```

### 3.5 @Res

- pass Response from express handler

```
@Controller({name: 'UserController', path:'user'})
class UserController {
  @POST('')
  saveUsers(@Res() res: Response){
  }
}
```

# 4 Schema and document

[schema - refer validation ](./validate.md)

- schema will be suse for validation and create document data.
- schema can be define by manual or auto be defined via class and data property.

### 4.1 Request - Schema for Params, Queries, Headers, Body

EX auto define schema:

```

class DetailParams {
  @DataProperty()
  id: string;
}

class DetailQueries {
  @DataPropertyOptional()
  clientId?: string;
}

class DetailHeaders {
  @DataPropertyOptional()
  jwt?: string;
}

class DetailBody {
  @DataProperty()
  name: string;
  @DataProperty()
  email: string;
  @DataPropertyOptional()
  description?: string;
}

@Controller({name: 'UserController', path:'user'})
class UserController {
  @POST(':id')
  saveUsers(
    @Prams() params: DetailParams,
    @Queries() queries: DetailQueries,
    @Headers() headers: DetailHeaders,
    @Body() body: DetailBody){
  }
}
```

EX manual define schema:

```
const paramsSchema = {type: 'object', properties: {id: StringRequireSchema}};
const querySchema = {type: 'object', properties: {clientId: StringSchema}};
const headerSchema = {type: 'object', properties: {jwt: StringSchema}};
const bodySchema = {type: 'object', properties: {name: StringRequireSchema, mail: StringRequireSchema, description: StringSchema}};

@Controller({name: 'UserController', path:'user'})
class UserController {
  @POST(':id')
  saveUsers(
    @Prams(paramsSchema) params: {id: string},
    @Queries(querySchema) queries: {clientId?: string},
    @Headers(headerSchema) headers: {jwt?:string},
    @Body(bodySchema) body: {name: string, email: string, description?: string}){
  }
}
```

### 4.2 Response - Schema for returning body data, error

#### 4.2.1 Response Success

- use for API document or swagger, it describe the response data format
- `@ResponseSuccessSchema(schemal: ResponseDataSuccess)` - common use for any schema
- `@ResponseSuccessObjectSchema(schemal: IObjectSchema)` - use when response data is object
- `@ResponseSuccessArraySchema(schemal: IArraySchema)` - use when response data is array

EX auto generate schema for response:

```
class UserDto {
  @DataProperty()
  id: string;
  @DataProperty()
  name: string;
  @DataProperty()
  email: string;
  @DataPropertyOptional()
  description: string;
}

@Controller({name: 'UserController', path:'user'})
class UserController {
  @Get(':id')
  @ResponseSuccessSchema({ propertyType: UserDto }) // system will be auto define schema for UserDto
  async getUsers(@Prams() params: DetailParams): Promise<UserDto>{
    const user: UserDto = ...
    return user;
  }
}
```

EX manual define schema:

```
const UserDtoSchemal: IObjectSchema = {
  type: 'object',
  properties: {
    id: StringRequireSchema,
    name: StringRequireSchema,
    email: StringRequireSchema,
    description: StringSchema
  }
}

@Controller({name: 'UserController', path:'user'})
class UserController {
  @Get(':id')
  @ResponseSuccessSchema(UserDtoSchemal) // system will use UserDtoSchemal for generate document
  async getUsers(@Prams() params: DetailParams){
    const user: any = ...
    return user;
  }
}
```

#### 4.2.2 Response error

- define the error which can be occur for this API. Use for API document
- `@ResponseErrorSchema(error: IBakkuHttpError | IBakkuHttpError[], description?: string)

```
class UserDto {
  @DataProperty()
  id: string;
  @DataProperty()
  name: string;
  @DataProperty()
  email: string;
  @DataPropertyOptional()
  description: string;
}

@Controller({name: 'UserController', path:'user'})
class UserController {
  @Get(':id')
  @ResponseSuccessSchema({ propertyType: UserDto }) // success
  @ResponseErrorSchema(newBakkuHttpError(HttpStatusCodes.NOT_FOUND, { message: 'code 1 error', code: 'code_1' })) // 1error
  @ResponseErrorSchema([ // many errors
    newBakkuHttpError(HttpStatusCodes.NOT_FOUND, { message: 'code 2 error', code: 'code_2' }),
    newBakkuHttpError(HttpStatusCodes.NOT_FOUND, { message: 'code 3 error', code: 'code_3' }),
  ])
  async getUsers(@Prams() params: DetailParams): Promise<UserDto>{
    const user: UserDto = ...
    return user;
  }
}
```
