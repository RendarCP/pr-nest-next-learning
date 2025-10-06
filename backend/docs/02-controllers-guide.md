# NestJS Controllers 완전 가이드

## 🎯 Controller란?

Controller는 **HTTP 요청을 처리하는 엔드포인트**입니다. 클라이언트의 요청을 받아서 적절한 서비스 메서드를 호출하고, 응답을 반환하는 역할을 담당합니다.

## 📁 Controller 구조

```typescript
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')  // 기본 경로: /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()              // GET /users
  findAll() { ... }

  @Post()             // POST /users
  create() { ... }

  @Get(':id')         // GET /users/1
  findOne() { ... }

  @Put(':id')         // PUT /users/1
  update() { ... }

  @Delete(':id')      // DELETE /users/1
  remove() { ... }
}
```

## 🔧 주요 데코레이터

### **@Controller()**

```typescript
@Controller('users')        // /users 경로
@Controller('api/users')    // /api/users 경로
@Controller()               // 루트 경로
```

### **HTTP 메서드 데코레이터**

```typescript
@Get()           // GET 요청
@Post()          // POST 요청
@Put()           // PUT 요청
@Patch()         // PATCH 요청
@Delete()        // DELETE 요청
@Options()       // OPTIONS 요청
@Head()          // HEAD 요청
```

### **요청 데이터 데코레이터**

```typescript
@Body()          // 요청 본문
@Param()         // URL 파라미터
@Query()         // 쿼리 파라미터
@Headers()       // HTTP 헤더
@Req()           // Express Request 객체
@Res()           // Express Response 객체
```

## 📝 실제 예시

### **UsersController**

```typescript
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users
  @Get()
  async findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return await this.usersService.findAll(page, limit);
  }

  // POST /users
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  // GET /users/1
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  // PUT /users/1
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  // DELETE /users/1
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}
```

## 🔍 요청 데이터 처리

### **@Body() - 요청 본문**

```typescript
@Post()
async create(@Body() createUserDto: CreateUserDto) {
  // POST 요청의 JSON 데이터를 받음
  // { "email": "test@example.com", "name": "Test User" }
}
```

### **@Param() - URL 파라미터**

```typescript
@Get(':id')
async findOne(@Param('id') id: string) {
  // GET /users/123 → id = "123"
  return await this.usersService.findOne(+id);
}

// 여러 파라미터
@Get(':id/posts/:postId')
async findUserPost(
  @Param('id') id: string,
  @Param('postId') postId: string
) {
  // GET /users/123/posts/456
}
```

### **@Query() - 쿼리 파라미터**

```typescript
@Get()
async findAll(
  @Query('page') page?: number,
  @Query('limit') limit?: number,
  @Query('search') search?: string
) {
  // GET /users?page=1&limit=10&search=test
}
```

## 🛡️ 가드와 인터셉터 적용

### **가드 적용**

```typescript
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)  // 전체 컨트롤러에 적용
export class UsersController {
  @Get()
  @UseGuards(AuthGuard)  // 특정 메서드에만 적용
  async findAll() { ... }
}
```

### **인터셉터 적용**

```typescript
import { UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';

@Controller('users')
@UseInterceptors(LoggingInterceptor)
export class UsersController { ... }
```

## 📊 응답 처리

### **기본 응답**

```typescript
@Get()
async findAll() {
  const users = await this.usersService.findAll();
  return users;  // 자동으로 JSON으로 변환
}
```

### **상태 코드 설정**

```typescript
import { HttpCode, HttpStatus } from '@nestjs/common';

@Post()
@HttpCode(HttpStatus.CREATED)  // 201 Created
async create(@Body() createUserDto: CreateUserDto) {
  return await this.usersService.create(createUserDto);
}
```

### **헤더 설정**

```typescript
import { Header } from '@nestjs/common';

@Post()
@Header('Cache-Control', 'none')
async create(@Body() createUserDto: CreateUserDto) {
  return await this.usersService.create(createUserDto);
}
```

## 🔄 라우팅 우선순위

```typescript
@Controller('users')
export class UsersController {
  @Get('profile')     // /users/profile (구체적)
  getProfile() { ... }

  @Get(':id')         // /users/:id (동적)
  findOne(@Param('id') id: string) { ... }
}
```

**주의**: 구체적인 경로가 동적 경로보다 우선순위가 높습니다.

## 🧪 테스트

### **단위 테스트**

```typescript
describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
```

## 🎯 모범 사례

1. **단일 책임 원칙** - 하나의 컨트롤러는 하나의 리소스만 담당
2. **의존성 주입** - 서비스를 생성자에서 주입받기
3. **에러 처리** - 서비스에서 예외를 던지고 컨트롤러에서 처리
4. **응답 일관성** - 동일한 형식의 응답 구조 유지
5. **문서화** - Swagger 데코레이터로 API 문서화

## 📚 추가 학습

- [NestJS Controllers 공식 문서](https://docs.nestjs.com/controllers)
- [HTTP 메서드와 RESTful API 설계](https://restfulapi.net/)
- [Express.js Request/Response 객체](https://expressjs.com/en/api.html)
