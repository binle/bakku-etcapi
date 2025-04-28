import { Application, IApplication, TypeServerOptions, BakkuFramework } from '@bakku/etcapi';
import express from 'express';
import ejs from 'ejs';
import path from 'path';
import './app';
import './processes';
import './routers';

ejs.delimiter = '@';

@Application()
class DemoApplication implements IApplication {
  beforeStartApplication(): void | Promise<void> {
    const expressApp = BakkuFramework.getBakkuFramework().getExpressApp();
    expressApp.use(express.static(path.join(__dirname, 'public')));
  }

  afterStarttApplication(): void | Promise<void> {
    const expressApp = BakkuFramework.getBakkuFramework().getExpressApp();
    expressApp.disable('x-powered-by');
    expressApp.engine('html', ejs.renderFile);
    expressApp.set('views', path.join(__dirname, 'views'));

    const resourceData = BakkuFramework.getBakkuFramework().getResourceData();
    console.log(` === application is starting at port ${resourceData.port}====`);
  }
}
