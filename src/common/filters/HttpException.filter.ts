// 错误的响应过滤器
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    // ...通过 host.switchToHttp() 获取 req，res
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    // ...通过 exception(异常) 获取状态码等info
    const exceptionResponse: any = exception.getResponse();
    const { message, error } = exceptionResponse;
    response.status(status).json({
      status: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message || error,
    });
  }
}
