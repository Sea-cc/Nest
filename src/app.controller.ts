import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // console.log(HttpStatus);
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // return this.appService.getHello();
  }
}
