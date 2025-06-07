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
@Controller({name: 'TestController', useLogger: true })
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

you have process two steps:

- define `useLogger: true` in injected param of class (apply for anotation : Controller, Service, Application, Configuration)
- define property `logger : Ilooger` into the injected class. it will auto set when app run and you can use
- define property `_bakku_logger_file` into the injected class to get more log info
  - `_bakku_logger_file = __filename` display full js file path in the log message: : `'2025-01-01 00:00:00.000 INFO   [..path to js file..]/TestController.js    message: {} '`
  - `_bakku_logger_file = [your prefix]` display full js file path in the log message: `'2025-01-01 00:00:00.000 INFO   [your prefix]    message: {} '`
  - not defile, it will auto get the class name `'2025-01-01 00:00:00.000 INFO   TestController    log data: {}'`

```
@Controller({name: 'TestController', useLogger: true })
class TestController {
  private logger : Ilooger;

  doSomeThings() {
    const dataLog = {};
    this.logger.info('log data:', data); // => `2025-01-01 00:00:00.000 INFO   TestController    log data: {} `
    // log content:
    // [dateTime] [level] TestController  log data:
    // data
  }
}
```

```
@Controller({name: 'TestController', useLogger: true })
class TestController {
  private logger : Ilooger;
  private _bakku_logger_file = __filename;  // => prefix in the logger


  doSomeThings() {
    const dataLog = {};
    this.logger.info('message', data); // => '2025-01-01 00:00:00.000 INFO   [..path to js file..]/testController.js    message: {} '
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

**prefix**: string => is `_bakku_logger_file` in injected class.
**options:**

| index | name          |                type                | description                         |
| :---- | :------------ | :--------------------------------: | :---------------------------------- |
| 1     | level         | ['error', 'info', 'warn', 'debug'] | level of logger                     |
| 2     | folderPath    |               string               | folder store the log file           |
| 3     | filename      |               string               | name of log file                    |
| 4     | maxFileSize   |               number               | number file will be store in folder |
| 5     | maxNumberFile |               number               | maximum file size of each file      |

**Config for all logger**

when you have configuration and want to apply for all lggers, you can use `configGlobalLogger`

```
import { configGlobalLogger } from '@bakku/etcapi';
// detect options
configGlobalLogger(options);
```
