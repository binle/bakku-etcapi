# 1 Install

&emsp;&emsp;npm: `npm install @bakku/etcapi`

&emsp;&emsp;yarn: `yarn install @bakku/etcapi`

# 2 Use

![Request Response](./bakku-etcapi.drawio.png)

use function `startServer` for start your API server.

```
  import {} from '@bakku/etcapi';

  const options: TypeServerOptions = {
    host: "0.0.0.0",
    port: 8080,
  };
  startServer(options);
```

### TypeServerOptions:

| name | type   | required | default | description                                       |
| :--- | :----- | :------- | :------ | :------------------------------------------------ |
| host | string | NO       |         | host which server will be used, should be 0.0.0.0 |
| port | number | NO       | 8080    | port which server will be used                    |
