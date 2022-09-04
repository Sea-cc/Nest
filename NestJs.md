# NestJs

![](./img/NestJs-16622077831711.png)

## 简介

Nest (NestJS) 是一个**用于构建高效、可扩展的 Node.js 服务器端应用程序的开发框架。**它利用 JavaScript 的渐进增强的能力，使用**并完全支持 TypeScript （仍然允许开发者使用纯 JavaScript 进行开发）**，并结合了 **OOP （面向对象编程）、FP （函数式编程）和 FRP （函数响应式编程）**。

**`Nest 框架底层 HTTP 平台默认是基于 Express 实现的，所以无需担心第三方库的缺失。`**

Nest 在这些常见的 Node.js 框架 (Express/Fastify) 之上提高了一个抽象级别，**但仍然向开发者直接暴露了底层框架的 API**。这使得开发者可以自由地使用适用于底层平台的无数的第三方模块。

**平台**：从技术上讲，一旦创建了适配器，Nest 便**可以使用任何 Node HTTP 框架**。 目前支持两个 HTTP 平台：[express](https://expressjs.com/) 和 [fastify](https://www.fastify.io/)。 您可以根据您的需求选择最适合平台。

无论使用那个平台，都会将平台的 application 接口暴露出来。它们分别是 `NestExpressApplication` 和 `NestFastifyApplication`。

> Express 简单介绍 🤿
>
> Express.js 诞生 Node.JS 之初，是一款基于[Node.js](https://link.juejin.cn/?target=http%3A%2F%2Fnodejs.cn%2F)以及 Chrome V8 引擎，快速、极简的 JS 服务端开发框架。
>
> Express 与 Nest 关系
>
> Nest.js 是基于 Express.js 的全功能框架 Nest.js，他是在 Express.js 上封装的，充分利用了 TypeScript 的特性；Nest.js 的优点是社区活跃，涨势喜人，截止目前在 GitHub 拥有 `50.7k Star` 是近期比较热门的企业级框架。

## 安装

使用 [Nest CLI](https://nestjs.bootcss.com/cli/overview) 创建项目

```shell
npm i -g @nestjs/cli
```

创建项目(注意规范)

```shell
nest new project-name
```

启动项目

```shell
npm run start
```

启动并监听项目

```shell
npm run start:dev
```

打开浏览器并导航到 `http://localhost:3000/`地址

## 起锅烧油 🍳

#### `src/` 目录核心文件

| `app.controller.ts`          | 带有`单个路由的`基本`控制器`                                                        |
| ---------------------------- | ----------------------------------------------------------------------------------- |
| **`app.controller.spec.ts`** | 针对控制器的单元测试。                                                              |
| **`app.module.ts`**          | T 应用程序的**`根模块`**（root module）。                                           |
| **`app.service.ts`**         | 具有单一方法的基本服务（service）。 method.                                         |
| **`main.ts`**                | 应用程序的**`入口文件`**，它`使用核心函数 NestFactory 来创建 Nest 应用程序的实例`。 |

## 入口文件

**`main.ts`**

- NestFactory 用来创建 Nest 应用实例
- create() 方法返回一个实现 INestApplication 接口的对象
- AppModule 这个文件里面主要是放在自己写的接口等信息
- app.listen(3000) 为监听服务启动的端口号

文件中包含了一个异步函数(bootstrap)，此函数将 **引导** 应用程序的启动过程

要创建一个 Nest 应用程序的实例，使用 `NestFactory` 核心类。`NestFactory` 暴露了一些静态方法用于创建应用程序的实例。其中，**`create()` 方法返回一个应用程序的对象，该对象实现了 `INestApplication` 接口**。该对象还提供了一组方法，这些方法将在接下来的章节中进行介绍。在 `main.ts` 中，仅启动了 HTTP 侦听器，该侦听器使应用程序可以**侦听入栈的 HTTP 请求**。

> 注意 💡
>
> **根模块 AppModule 提供了用来启动应用的引导机制，可以包含很多功能模块**

```js
// 引入platform-express平台
import { NestExpressApplication } from '@nestjs/platform-express';
/**
 * `NestFactory` 暴露了一些静态方法用于创建应用程序的实例
 * @function {*} create 方法返回一个应用程序的对象,该对象实现了 INestApplication 接口
 * @param {*} AppModule 根模块
 * app 对象将具有Express平台的专用方法。注意,除非确实需要访问底层平台的 API,否则无需指定平台类型。
 */
const app = (await NestFactory.create) < NestExpressApplication > AppModule;
await app.listen(3000);
// 提示服务启动成功
console.log(
  `🍃 启动成功:http://localhost:${await app.getHttpServer().address().port}`,
);
```

## 控制器 Controller

简单来说就是处理不同请求与不同路由之间的映射关系

控制器负责**处理传入的`请求`并将`响应`返回**给客户端

目的: 接收应用程序的特定请求。**`路由机制`控制哪个控制器接收哪个请求**。每个控制器都有多个路由，不同的路由可以执行不同的动作。

创建一个基本的控制器，需要使用类和**装饰器**。装饰器将类与所需的元数据**相关联**，并使 Nest **能够创建路由映射（将请求绑定到相应的控制器）**

> **提示 🎗️**
>
> 为了快速创建内置[验证的 CRUD 控制器，您可以使用 CLI 的](https://docs.nestjs.com/techniques/validation)[CRUD 生成器](https://docs.nestjs.com/recipes/crud-generator#crud-generator)：`nest g resource [name]`。

`app.controller.ts`

使用`@Controller()`装饰器，它是定义基本控制器所**必需的**

指定一个**可选的路由路径前缀**`api`。在装饰器中使用路径前缀`@Controller()`可以轻松地对一组相关路由进行**分组**，并最大限度地**减少重复代码**

```js
@Controller('api')
export class ApiController {
  @Get()
  findAll(): string {
    return 'This action returns all api';
  }
}
```

> **提示 🎗️**
>
> 使用 CLI 创建控制器，只需执行`$ nest g controller api`命令,api 为可选前缀
>
> @Controller('api')控制器,官方文档称之为`端点`

方法之前的`@Get()`HTTP 请求方法装饰器`findAll()`告诉 Nest 为 HTTP 请求的特定端点创建处理程序。**端点对应于 HTTP `请求方法`（本例中为 GET）和`路由路径`**

**最终路径：控制器声明的（可选）前缀`@Controller('api')`和请求装饰器中指定的任何路径`@Get('nest')`**【/api/nest】

规范：

- 文件命名：前缀.controller.ts
- 导出 export class：首字母大写前缀 + Controller(`ApiController`)
- 选择的方法名称`findAll`是完全任意的,没有任何意义

> **提示**💡
>
> 了解如何创建自定义的装饰器，请访问 https://nestjs.bootcss.com/custom-decorators

## 响应的处理

Nest 两种**不同**操作响应的选项

| 标准（推荐） | 使用此内置方法，当请求处理程序返回 JavaScript 对象或数组时，它会**自动**序列化为 JSON。然而，当它返回一个 JavaScript 原始类型时，Nest 将**只发送该值而不尝试对其进行序列化**。这使得响应处理变得简单：**`只需返回值，其余的由 Nest 处理`**。此外，响应的**状态码**`默认始终为 200`，除了使用 201 的 POST 请求。我们可以通过在处理程序级别添加装饰器来轻松更改此行为（请参阅[状态码](https://nestjs.bootcss.com/controllers#status-code)）。` number``boolean ` `@HttpCode(...)` |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 特定于库     | 我们可以使用库特定的（例如，Express）[响应对象](https://expressjs.com/en/api.html#res)，它可以使用`@Res()`方法处理程序签名中的装饰器（例如，`findAll(@Res() response)`）注入。通过这种方法，您可以使用该对象公开的本机响应处理方法。例如，使用 Express，您可以使用类似`response.status(200).send()`.                                                                                                                                                                            |

> **警告**🏷️
>
> Nest 检测到处理程序何时使用`@Res()`或`@Next()`，表示您选择了特定于库的选项。如果**同时使用这两种方法，则该单一路线的标准方法会自动禁用**，并且将不再按预期工作。要同时使用这两种方法（例如，通过注入响应对象以仅设置 cookie/标头但仍将其余部分留给框架），您必须在装饰器中将`passthrough`选项设置为：
>
> `true@Res({{ '{' }} passthrough: true {{ '}' }})`

## 请求的处理

处理程序通常需要**访问客户端请求的详细信息**。Nest 提供对底层平台的请求对象的访问（默认为 Express）

`@Req()`：通过将装饰器 @Req() 添加到**处理程序的签名中**来指示 Nest 注入它来访问请求对象。

```js
// 引入装饰器 and 类型注解💡
import { Controller, Get, Req } from '@nestjs/common';
import type { Request } from 'express'; // 需要安装 @types/express 开发依赖

@Controller('user')
export class UserController {
  @Get('queryInfo')
  getUser(@Req() request: Request) {
    console.log(request);
    return 'user';
  }
}
```

### 💡 请求处理装饰器

> **提示 🏷️**
>
> 请求对象表示 HTTP 请求，并具有请求查询字符串、参数、HTTP 标头和正文的属性（[在此处](https://expressjs.com/en/api.html#req)阅读更多内容）。**在大多数情况下，没有必要手动获取这些属性**。**`使用开箱即用的专用装饰器，例如 @Body()、@Query()...`**

| `@Request(), @Req()`      | `req`                             |
| ------------------------- | --------------------------------- |
| `@Response(), @Res()`     | `res`                             |
| `@Next()`                 | `next`                            |
| `@Session()`              | `req.session`                     |
| `@Param(key?: string)`    | `req.params` / `req.params[key]`  |
| `@Body(key?: string)`     | `req.body`/`req.body[key]`        |
| `@Query(key?: string)`    | `req.query`/`req.query[key]`      |
| `@Headers(name?: string)` | `req.headers`/`req.headers[name]` |
| `@Ip()`                   | `req.ip`                          |
| `@HostParam()`            | `req.hosts`                       |

**注意**：使用时，应该导入底层库的类型（例如，`@types/express`）以充分利用它们。

> 请注意，当在方法处理程序中注入 `@Res()` 或 `@Response()` 时，会将 Nest 置于该处理程序的 **Library-specific 模式** 中，并且您将负责管理响应。**这样做时，您必须通过调用 `response` 对象（例如，`res.json(...)` 或 `res.send(...)`）或 HTTP 服务器将挂起。**

**Nest 为所有标准 HTTP 方法提供装饰器：`@Get()`、`@Post()`、`@Put()`、`@Delete()`、`@Patch()`、`@Options()`和`@Head()`. 此外，`@All()`定义一个处理所有这些的端点。**

---

### @Post DTO

接受任何客户端参数的请求处理,通过在处理程序中添加`@Body()`装饰器来解决此问题。

**注意：如果使用 TypeScript，需要确定`DTO`（数据传输对象）模式。DTO 是一个`定义数据如何通过网络发送的对象`。我们可以使用 TypeScript `接口或简单的类`来确定 DTO 模式。`建议在这里使用类`** _`Why？`_

> 类是 JavaScript ES6 标准的一部分，因此在编译后的 JavaScript 中被保留为真实实体。另一方面，由于 TypeScript 接口在转译过程中被移除，Nest 无法在运行时引用它们。这很重要，因为**Pipes**等功能在运行时可以访问变量的元类型时提供了额外的可能性,所有`这里建议使用类来定义数据的传输`

```js
// 创建类的类型注解
class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}

// 确定`DTO`（数据传输对象)
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  return 'This action adds a new cat';
}
```

## 路由

支持基于模式的路由。例如，星号用作通配符，将匹配任何字符组合。

`'ab*cd'`路由路径将匹配、`abcd`、`ab_cd`等`abecd`

**字符`?`, `+`, `*`, 和`()`可以在路由路径中使用**，并且是它们的正则表达式对应物的子集。连字符 ( `-`) 和点 ( `.`) 由基于字符串的路径逐字解释。

```js
@Get('ab*cd')
findAll() {
  return 'This route uses a wildcard';
}
```

### 动态参数

定义带参数的路由，可以在路由的路径中添加路由参数**标记**，以捕获请求 URL 中该位置的动态值。可以使用`@Param()`装饰器访问以这种方式声明的路由参数，装饰器应添加到方法签名中,如`/api/user/2576206579`，`Param`从`@nestjs/common`中导入

```js
@Get(':id')
findOne(@Param() params): string {
  console.log(params.id);
  return `This action returns a #${params.id} cat`;
}
```

### 子域路由

装饰器`@Controller`可以通过配置项`host`选择要求传入请求的 HTTP 主机匹配某个特定值的域名

```js
@Controller({ host: 'admin.example.com' })
export class AdminController {
  @Get()
  index(): string {
    return 'Admin page';
  }
}
```

> **警告 🏷️**
>
> 由于**Fastify**缺乏对嵌套路由器的支持，**当使用子域路由时，应该使用（默认）Express 适配器。**

与 route 类似`path`，该`host`选项可以使用标记来捕获主机名中该位置的动态值。以这种方式(`:account`)声明的主机参数可以使用`@HostParam()`装饰器访问，装饰器应添加到方法签名中

```typescript
@Controller({ host: ':account.example.com' })
export class AccountController {
  @Get()
  getInfo(@HostParam('account') account: string) {
    return account;
  }
}
```

> **未理解的 🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿🤿**
>
> 对于来自不同编程语言背景的人来说，在 Nest 中得知几乎所有内容都是在传入请求之间共享的，这可能是出乎意料的。我们有一个到数据库的连接池、具有全局状态的单例服务等。请记住，Node.js 不遵循请求/响应多线程无状态模型，其中每个请求都由单独的线程处理。因此，使用单例实例对我们的应用程序来说是完全**安全**的。
>
> 但是，在某些极端情况下，控制器的基于请求的生命周期可能是所需的行为，例如 GraphQL 应用程序中的每个请求缓存、请求跟踪或多租户。[在此处](https://nestjs.bootcss.com/fundamentals/provider-scopes)了解如何控制范围。

我们喜欢现代 JavaScript，而且我们知道数据提取主要是**异步**的。这就是为什么 Nest 支持并很好地使用`async`函数的原因。

每个异步函数都必须返回一个`Promise`. 这意味着您可以返回 Nest 能够自行解析的延迟值。让我们看一个例子：

```typescript
@Get()
async findAll(): Promise<any[]> {
  return [];
}
```

上面的代码是完全有效的。此外，由于能够返回 RxJS[可观察流](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html)，Nest 路由处理程序更加强大。Nest 将自动订阅下面的源并获取最后一个发出的值（一旦流完成）。

```typescript
@Get()
findAll(): Observable<any[]> {
  return of([]);
}
```

上述两种方法都有效，您可以使用任何适合您要求的方法。

---

## 状态码

默认情况下响应**状态代码**始终为**200**，但 POST 请求除外**201**。可以通过`@HttpCode(...)`在处理程序添加装饰器来轻松更改此行为。`位于请求装饰器下`

与 @Get、@Post 一样，`HttpCode`从`@nestjs/common`中导入

```js
@Post()
@HttpCode(204)
create() {
  return 'This action adds a new cat';
}
```

**注意:**通常，状态代码不是静态的，而是取决于各种因素。在这种情况下，可以使用特定库的**响应**（使用 注入`@Res()`）对象（或者，如果出现错误，则抛出异常）。

## 自定义响应标头

使用`@Header()`装饰器或特定库的响应对象（`res.header()`直接调用）

`Header`从`@nestjs/common`中导入

```js
@Post()
@Header('Cache-Control', 'none')
create() {
  return 'This action adds a new cat';
}
```

## 响应重定向

要将响应重定向到特定 URL，可以使用`@Redirect()`装饰器或特定库的响应对象（`res.redirect()`直接调用）

@Redirect()`接受一个必需`url`参数和一个可选`statusCode`参数。如果省略，则`statusCode`默认为 302 Found`(简单的理解为该资源原本确实存在，但已经被临时改变了位置)

```js
@Get()
@Redirect('https://nestjs.com', 301)
```

有时可能希望动态确定 HTTP 状态代码或重定向 URL。通过以下路由处理程序方法返回一个对象来做到这一点

```json
{
  "url": string,
  "statusCode": number
}
```

**返回值将覆盖传递给`@Redirect()`装饰器的任何参数**

```typescript
@Get('docs')
@Redirect('https://docs.nestjs.com', 302)
getDocs(@Query('version') version) {
  if (version && version === '5') {
    return { url: 'https://docs.nestjs.com/v5/' };
  }
}
// 处理程序存在返回值时，将覆盖 @Redirect() 装饰器的参数
{
  "url": 'https://docs.nestjs.com',
  "statusCode": 302
}
```

## 错误处理

> 提示 💡
>
> Nest 带有一个内置的**异常层**，`负责处理应用程序中所有未处理的异常`。当应用程序代码未处理异常时，该层将捕获该异常，然后自动发送适当的用户友好响应。
>
> 开箱即用，此操作由内置的**全局异常过滤器**执行，该过滤器处理类型`HttpException`（及其子类）的异常。当异常**无法识别**（既不是`HttpException`也不是继承自的类`HttpException`）时，内置异常过滤器会生成以下默认 JSON 响应：

```js
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

### 错误抛出标准

Nest 提供了一个**`内置类`**，从类 **HttpException**`暴露出来。`@nestjs/common`对于典型的基于 HTTP REST/GraphQL API 的应用程序，**最好在发生某些错误情况时发送标准 HTTP 响应对象**。

例如，在`CatsController`，有一个`findAll()`方法（`GET`路由处理程序）。假设这个路由处理程序由于某种原因抛出了一个异常。为了证明这一点，我们将对其进行硬编码，如下所示：

```typescript
@@filename(cats.controller)
@Get()
async findAll() {
  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
}

// ...
{
"statusCode": 403,
"message": "Forbidden"
}
```

`HttpException`构造函数**接受两个确定响应的必需参数**：

`new HttpException(response, status)`

- 该`response`参数定义 JSON 响应正文。它可以是 `string` 或 `object`，如下所述。
- 该`status`参数定义[HTTP 状态代码](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)。

默认情况下，JSON 响应正文包含两个属性：

- `statusCode`: 默认为`status`参数中提供的 HTTP 状态码
- `message`：基于 HTTP 错误的简短描述`status`

覆盖 JSON 响应正文的消息部分，请在`response`参数中提供一个字符串。要覆盖整个 JSON 响应正文，请在`response`参数中传递一个对象。Nest 将序列化对象并将其作为 JSON 响应正文返回。

第二个构造函数参数 - `status`- 应该是一个有效的 HTTP 状态码。最佳做法是使用`HttpStatus`从`@nestjs/common`.

这是一个覆盖整个响应正文的示例：

```typescript
@Get()
async findAll() {
  throw new HttpException({
    status: HttpStatus.FORBIDDEN,
    error: 'This is a custom message',
  }, HttpStatus.FORBIDDEN);
}
// ...
{
  "status": 403,
  "error": "This is a custom message"
}
```

`HttpStatus`是从`@nestjs/common`中导入的**帮助枚举**

```js
🍃 HttpStatus
{
  '100': 'CONTINUE',
  '101': 'SWITCHING_PROTOCOLS',
  '102': 'PROCESSING',
  '103': 'EARLYHINTS',
  '200': 'OK',
  '201': 'CREATED',
  '202': 'ACCEPTED',
  '203': 'NON_AUTHORITATIVE_INFORMATION',
  '204': 'NO_CONTENT',
  '205': 'RESET_CONTENT',
  '206': 'PARTIAL_CONTENT',
  '300': 'AMBIGUOUS',
  '301': 'MOVED_PERMANENTLY',
  '302': 'FOUND',
  '303': 'SEE_OTHER',
  '304': 'NOT_MODIFIED',
  '307': 'TEMPORARY_REDIRECT',
  '308': 'PERMANENT_REDIRECT',
  '400': 'BAD_REQUEST',
  '401': 'UNAUTHORIZED',
  '402': 'PAYMENT_REQUIRED',
  '403': 'FORBIDDEN',
  '404': 'NOT_FOUND',
  '405': 'METHOD_NOT_ALLOWED',
  '406': 'NOT_ACCEPTABLE',
  '407': 'PROXY_AUTHENTICATION_REQUIRED',
  '408': 'REQUEST_TIMEOUT',
  '409': 'CONFLICT',
  '410': 'GONE',
  '411': 'LENGTH_REQUIRED',
  '412': 'PRECONDITION_FAILED',
  '413': 'PAYLOAD_TOO_LARGE',
  '414': 'URI_TOO_LONG',
  '415': 'UNSUPPORTED_MEDIA_TYPE',
  '416': 'REQUESTED_RANGE_NOT_SATISFIABLE',
  '417': 'EXPECTATION_FAILED',
  '418': 'I_AM_A_TEAPOT',
  '421': 'MISDIRECTED',
  '422': 'UNPROCESSABLE_ENTITY',
  '424': 'FAILED_DEPENDENCY',
  '428': 'PRECONDITION_REQUIRED',
  '429': 'TOO_MANY_REQUESTS',
  '500': 'INTERNAL_SERVER_ERROR',
  '501': 'NOT_IMPLEMENTED',
  '502': 'BAD_GATEWAY',
  '503': 'SERVICE_UNAVAILABLE',
  '504': 'GATEWAY_TIMEOUT',
  '505': 'HTTP_VERSION_NOT_SUPPORTED',
  CONTINUE: 100,
  SWITCHING_PROTOCOLS: 101,
  PROCESSING: 102,
  EARLYHINTS: 103,
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NON_AUTHORITATIVE_INFORMATION: 203,
  NO_CONTENT: 204,
  RESET_CONTENT: 205,
  PARTIAL_CONTENT: 206,
  AMBIGUOUS: 300,
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  SEE_OTHER: 303,
  NOT_MODIFIED: 304,
  TEMPORARY_REDIRECT: 307,
  PERMANENT_REDIRECT: 308,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505
}
```

### 自定义错误标准

> 如果确实需要创建自定义异常，最好创建自己的**异常层次结构**，【自定义异常从`HttpException`类**`继承`**】通过这种方法，**Nest 将识别**您的异常，并自动处理错误响应

```js
// 继承于 HttpException 的 ForbiddenException 错误标准类
class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}

// ForbiddenException扩展 HttpException，它将与内置的异常处理程序无缝协作，因此可以在findAll()方法中使用它
@Get()
async findAll() {
  throw new ForbiddenException();
}
```

### 内置 HTTP 异常

Nest 提供一组**从基础继承的标准异常`HttpException`**。这些是从`@nestjs/common`中公开的，代表了许多最常见的 HTTP 异常：

- `BadRequestException`
- `UnauthorizedException`
- `NotFoundException`
- `ForbiddenException`
- `NotAcceptableException`
- `RequestTimeoutException`
- `ConflictException`
- `GoneException`
- `HttpVersionNotSupportedException`
- `PayloadTooLargeException`
- `UnsupportedMediaTypeException`
- `UnprocessableEntityException`
- `InternalServerErrorException`
- `NotImplementedException`
- `ImATeapotException`
- `MethodNotAllowedException`
- `BadGatewayException`
- `ServiceUnavailableException`
- `GatewayTimeoutException`
- `PreconditionFailedException`

### 过滤器自定义抛出错误 ExceptionFilter

#### **创建错误异常过滤器**

```js
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
```

**`ExceptionFilter`**继承类：`catch(exception: T, host: ArgumentsHost): any;`，实现它的时候必须遵守它的约定

```js
export interface ExceptionFilter<T = any> {
  /**
   * Method to implement a custom exception filter.
   *
   * @param exception the class of the exception being handled
   * @param host used to access an array of arguments for
   * the in-flight request
   */
  catch(exception: T, host: ArgumentsHost): any;
}
```

#### **使用**

##### **💡 单独使用**

在单个`users.controller.ts`控制器中，模块入口中

```js
import {
  Controller,
  Get,
  Post,
  Body,
  UseFilters,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
// 引入 swagger 的 ApiTags 装饰器
import { ApiQuery, ApiBody, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpExceptionFilter } from '../common/filters/HttpException.filter';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiQuery({ name: 'name', required: false })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  @UseFilters(new HttpExceptionFilter()) // 单独使用💡
  findAll() {
    // ...通过 throw new HttpException 返回自定义错误info 覆盖自带的标准
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
        message: 'This is a custom message',
      },
      HttpStatus.FORBIDDEN,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
```

##### 💡 全局使用过滤器

在`main.ts `

```js
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// 引入platform-express平台
import { NestExpressApplication } from '@nestjs/platform-express';
// 引入全局过滤器
import { HttpExceptionFilter } from './common/filters/HttpException.filter';

async function bootstrap() {
  const app = (await NestFactory.create) < NestExpressApplication > AppModule;

  // 全局过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
// 此函数将引导应用程序的启动过程
bootstrap();
```

## 放菜开炒 🔪

---

##### 在`/src`下新增目录

uitl：存储工具函数或 JSON 文件

modules：存放模块目录文件，利于管理

common：存放公共文件配置...目录

common/middleware：存放中间件文件目录的

---

##### CURD 模块

使用命令 `nest g resource 模块名称`快速创建一个 CURD 模块

![](./img/curd-dir.png)

**dto**：数据传输对象，dto 就像接口，目标是传输数据并验证它，主要用于路由器 or 控制器。简化 API 主体和查询验证逻辑

下面的 AuthDto 自动将用户电子邮件和密码映射到对象 DTO 以强制验证(期望密码超过 5 个字符，可以将 dto 与 class-validator 配对以自动抛出错误)

![](./img/dto.png)

`users.controller.spec.ts`、`users.service.spec.ts`测试文件

`users.controller.ts`：整个模块的控制器(**`模块的入口`**)，控制请求的路径方向(控制哪个控制器接收处理哪个请求)

**在初始化时，将`UsersService`注入进来**

```js
import { Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
```

`users.service.ts`:程序逻辑处理的文件，负责**处理请求 and 响应**(方法都会在 控制器 中被注入)

```js
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }
}
```

`users.module.ts`：模块的出口文件，导出在`app.module.ts`中

## Swagger API 文档生成

**Nest 集成自动生成文档，swagger 不是一个模块，而是对应于某个模块的增强**

创建 swagger 文档：

安装：`npm install -D @nestjs/swagger`

`main.js`下：

SwaggerModule.**setup**('api', app, document); `api`为访问路径

```js
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// 引入platform-express平台
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = (await NestFactory.create) < NestExpressApplication > AppModule;

  // 创建 swagger 文档📖
  const options = new DocumentBuilder()
    .setTitle('Nest Serve')
    .setDescription('The Nest Serve API description')
    .setVersion('1.0')
    .addTag('nest-serve')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
// 此函数将引导应用程序的启动过程
bootstrap();
```

### 详细使用

在 控制器 Controller 入口文件下：

```js
import { Controller,Get,Post,Body } from '@nestjs/common';
// 引入 swagger 的 Api 装饰器
import { ApiQuery, ApiBody, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // ...使用 Swagger
  @ApiBody({ type: CreateUserDto }) // 直接通过 DTO 类型校验对象生成 Body 传输参数
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiQuery({ name: 'name', required: false })
  @ApiResponse({ status: 200, description: 'The record has been successfully deleted.'})
  findAll() {
    return this.usersService.findAll();
  }
}
```

> 更多详细使用 查看官方文档

## 中间件

> 中间件是需要 **`注入(Injectable)`**的 ,并且**需要实现它**(NestMiddleware):`class LoggerMiddleware implements NestMiddleware`

NestMiddleware:在使用中间件时，需要实现它(TS),并且它只有一个方法`use(req,res,next)`

```js
export interface NestMiddleware<TRequest = any, TResponse = any> {
  use(req: TRequest, res: TResponse, next: (error?: Error | any) => void): any;
}
```

### 自定义 logger 日志中间件

**1、定义**

```js
import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // ...req: Request, res: Response, next: NextFunction
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next(); // ...
  }
}
```

**2、使用**

`app.module.ts`(后期需要考虑抽成一个配置文件，利于维护)

```js
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
// 使用 logger 中间件
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // 使用中间件
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(LoggerMiddleware)
      	.exclude( { path: 'users', method: RequestMethod.POST// 排除 users 下的 POST 方法 } )
        .forRoutes('users');// 在 users 模块下使用此中间件
  }
}
```

## Injectable 装饰器

Injectable 作用是可以彼此创建各种关系，并且“连接”对象实例的功能在很大程度上可以委托给 Nest 运行时系统
