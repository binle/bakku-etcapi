### **_For make sure the latest documents, Please refer documents in git [etcapi](https://github.com/binle/bakku-etcapi)_**

# 1. Overview

EtcApi is a part of Bakku framework, it will help developer create APIs easiest.

We use [reflect-metadata](https://rbuckton.github.io/reflect-metadata/) library for creating it. It works base on [expressjs](https://expressjs.com/) and it is similar with Spring Framework with anotations:

- [@Configuration](./docs/configuration.md)
- [@Controller](./docs/controller.md)
- [@Service](./docs//service.md)
- ..v..v..

# 2. Technical

![Request Response](./docs/bakku-etcapi.drawio.png)
This library (framework) work as this image.

# 3. Use & Sample

### 3.1 Use

&emsp;&emsp;npm: `npm install @bakku/etcapi`

&emsp;&emsp;yarn: `yarn install @bakku/etcapi`

### 3.2 Sample

- Declaration @Application

```
import {Application} from '@bakku/etcapi';

@Application
class Application() {

}
```

- Use directive

```
import {BakkuFramework} from '@bakku/etcapi';

BakkuFramework.start(); ==> locahost:8080
```

Please see the [sample source code](./sample-etcapi/)

# 4. Documents

[All documents](https://github.com/binle/bakku-etcapi/tree/main/docs)

### 4.1 Anotaions

- [@Configuration](./docs/configuration.md)
- [@Controller](./docs/controller.md)
- [@Service](./docs//service.md)

### 4.2 Related

- [Customization](./docs/customization.md)
- [Logger](./docs/logger.md)
- [Schema](./docs/class-schema.md)
- [Validation](./docs/validate.md)

---

# NOTE: we will improve and develope other part of bakku platform in the future

- **for intergration with database**, we recoment use [typeorm](https://typeorm.io/)
- **for using socket**, we recomment use [socket.io](https://socket.io/)
- if you have any idear or problem, please create issue, we will try to resolve it.

# Thank you very much!
