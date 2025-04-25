import {
  Controller,
  Get,
  ILogger,
  ResponseCustomDataHandler,
  ResponseSuccessSchema,
  StringSchema,
} from '@bakku/etcapi';

@Controller({ name: 'HealthController', path: 'health' })
class HealthController {
  logger: ILogger;
  _bakku_logger_file = __filename;

  @Get('check')
  @ResponseSuccessSchema({ type: 'object', properties: { message: StringSchema } })
  healthCheck() {
    this.logger.info('HealthController == healthCheck');
    return {
      message: 'Checked!',
    };
  }

  @Get('hello', { hideInDoc: true })
  @ResponseCustomDataHandler((data, response) => {
    console.log('--- ResponseCustomDataHandler -- ');
    response.render('hello.html', data);
  })
  hello() {
    this.logger.info('HealthController == hello');
    return {
      hello: 'Hello!',
      content: 'This is content render from server!',
    };
  }
}
