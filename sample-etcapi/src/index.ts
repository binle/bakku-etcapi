import { Application, IApplication, BakkuFramework } from '@bakku/etcapi';
import express from 'express';
import ejs from 'ejs';
import path from 'path';
import './app';
import './processes';
import './routers';
import { initialization } from './app';

ejs.delimiter = '@';

@Application()
class DemoApplication implements IApplication {
  beforeStartApplication() {
    const expressApp = BakkuFramework.getExpressApp();
    expressApp.use(express.static(path.join(__dirname, 'public')));
  }

  afterStartApplication() {
    const expressApp = BakkuFramework.getExpressApp();
    expressApp.disable('x-powered-by');
    expressApp.engine('html', ejs.renderFile);
    expressApp.set('views', path.join(__dirname, 'views'));

    const resourceData = BakkuFramework.getResourceData();
    initialization(resourceData.roothPath);
    console.log(` === application is starting at port ${resourceData.port}====`);
  }
}
