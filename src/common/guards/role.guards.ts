// 导入 守卫的实现类,注入装饰器,守卫可以访问的 `ExecutionContext` 实例
import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
// 导入 `Reflector` ,用于获取 `@SetMetadata` 装饰器的元数据【Reflector：反射】
import { Reflector } from '@nestjs/core';

// 定义一个 `RolesGuard` 类,实现 `CanActivate` 接口
// 守卫的返回值- return 为 Boolean
@Injectable()
export class RolesGuard implements CanActivate {
  /* Reflector作用：【让守卫与装饰器进行桥接的桥梁】 */
  // 初始化
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    // 获取 模块方法 中使用装饰器@Roles配置的 `@SetMetadata` 的元数据(详情查看 `roles.decorator.ts`逻辑)
    // SetMetadata('roles', roles) => (key, value)🍃
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // 如果没有设置 `roles` 元数据,则直接返回 `true`,即不需要进行权限验证🍃
    if (!roles) return true;
    // 存在,获取请求对象
    const request = context.switchToHttp().getRequest();
    // 获取请求头中的 `authorization` 字段
    const authHeader = request.headers.authorization;
  }
}
