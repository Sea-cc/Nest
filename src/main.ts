import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// 引入platform-express平台
import { NestExpressApplication } from '@nestjs/platform-express';
// 引入全局过滤器
import { HttpExceptionFilter } from './common/filters/HttpException.filter';

async function bootstrap() {
  try {
    /**
     * `NestFactory` 暴露了一些静态方法用于创建应用程序的实例
     * @function {*} create 方法返回一个应用程序的对象,该对象实现了 INestApplication 接口
     * @param {*} AppModule 根模块
     * app 对象将具有Express平台的专用方法。注意,除非确实需要访问底层平台的 API,否则无需指定平台类型。
     */
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // 全局过滤器
    app.useGlobalFilters(new HttpExceptionFilter());
    // 创建 swagger 文档
    const options = new DocumentBuilder()
      .setTitle('Nest Serve')
      .setDescription('The Nest Serve API description')
      .setVersion('1.0')
      .addTag('nest-serve')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('doc', app, document);

    await app.listen(3000);
    // 提示服务启动成功
    console.log(
      `🍃 启动成功:http://localhost:${await app.getHttpServer().address()
        .port}`,
    );
  } catch (error) {
    console.log(`❌ 启动失败:${error}`);
  }
}
// 此函数将引导应用程序的启动过程
bootstrap();
