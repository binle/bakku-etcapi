import { Controller, Get, ILogger, StringSchema } from '@bakku/etcapi';

@Controller({ name: 'HealthController', path: 'health', useLogger: true })
class HealthController {
  logger: ILogger;
  _bakku_logger_file = __filename;

  @Get('check', { successSchema: { type: 'object', properties: { message: StringSchema } } })
  healthCheck() {
    this.logger.info('HealthController == healthCheck');
    return {
      message: 'Checked!',
    };
  }

  @Get('hello', {
    hideInDoc: true,
    customSuccessHandler: (data, response) => response.render('hello.html', data),
  })
  hello() {
    this.logger.info('HealthController == hello');
    return {
      hello: 'Hello!',
      content: 'This is content render from server!',
    };
  }
}
