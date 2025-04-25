# 1 Service - define singleton instance.

- `@Service(identifier: Identifier)` - define singleton object base on class

```
@Service('SampleService')
export class SampleService implements ISampleService {
  sayHello(name: string) {
    this.logger.info('test logger from service');
    return `Hello ${name} from sample service`;
  }
}
```

# 2 InjectService - set singleton instance.

- `@InjectService(identifier: Identifier)` - pass singleton instance for property.

```
@Controller({ name: 'UserController', path: 'user' })
class UserController {
  @InjectService('SampleService') // pass instance via identify "'SampleService'"
  sampleService: ISampleService;

  @Get('')
  getUsers(){
    this.sampleService.sayHello('Noname');
  }
}
```
