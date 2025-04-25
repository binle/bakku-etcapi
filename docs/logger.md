# 1. Use in Injected class

define `logger : Ilooger` in the injected class. it will auto set when app run.

```
@Configuration
class TestConfiguration {
  private logger : Ilooger;

  doSomeThings() {
    const dataLog = {};
    this.logger.info('message', data);
  }
}
```

```
@Controller
class TestController {
  private logger : Ilooger;

  doSomeThings() {
    const dataLog = {};
    this.logger.info('message', data);
  }
}
```

```
@Service
class TestService {
  private logger : Ilooger;

  doSomeThings() {
    const dataLog = {};
    this.logger.info('message', data);
  }
}
```

# 2. Special log with file name

define `logger : Ilooger` in the injected class. it will auto set when app run.

```
@Controller
class TestController {
  private logger : Ilooger;

  doSomeThings() {
    const dataLog = {};
    this.logger.info('log data:', data);
    // log content:
    // [dateTime] [level] TestController  log data:
    // data
  }
}
```

```
@Controller
class TestController {
  private logger : Ilooger;
  private _bakku_logger_file = __filename; => prefix


  doSomeThings() {
    const dataLog = {};
    this.logger.info('message', data);
    // log content:
    // [dateTime] [level] [path]/[to]/[file]/TestController.ts  log data:
    // data
  }
}
```

# 3. Common Use:

```
  import { createLogger } from '@bakku/etcapi';
  const logger = createLogger(prefix, options);
```

**prefix**: string => is bakku_logger_file in injected class.
**options:**

| index | name          |                type                | description                         |
| :---- | :------------ | :--------------------------------: | :---------------------------------- |
| 1     | level         | ['error', 'info', 'warn', 'debug'] | level of logger                     |
| 2     | folderPath    |               string               | folder store the log file           |
| 3     | filename      |               string               | name of log file                    |
| 4     | maxFileSize   |               number               | number file will be store in folder |
| 5     | maxNumberFile |               number               | maximum file size of each file      |
