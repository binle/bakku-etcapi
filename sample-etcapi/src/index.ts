import { startServer, TypeServerOptions } from '@bakku/etcapi';
import ejs from 'ejs';
import path from 'path';
import { initialization } from './app';
import './processes';
import './routers';

ejs.delimiter = '@';

(async () => {
  await initialization(__dirname);
  const options: TypeServerOptions = {
    port: Number(global.applicationContexts.resource.port),
  };
  const { bakkuApplication } = startServer(options);
  bakkuApplication.getExpressApp().disable('x-powered-by');
  bakkuApplication.getExpressApp().engine('html', ejs.renderFile);
  console.log(path.join(__dirname, 'views'));
  bakkuApplication.getExpressApp().set('views', path.join(__dirname, 'views'));
})().catch((error) => {
  console.error('server error ========', error);
  // stopServer(server);
});
