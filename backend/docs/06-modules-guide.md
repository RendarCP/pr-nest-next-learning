# NestJS Modules 완전 가이드

## 🎯 Module이란?

Module은 **관련 기능들을 그룹화하는 컨테이너**입니다. 의존성 주입, 모듈 간 통신, 애플리케이션 구조화 등의 역할을 담당합니다.

## 📁 Module 구조

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // 다른 모듈 import
  controllers: [UsersController], // 컨트롤러 등록
  providers: [UsersService], // 서비스 등록
  exports: [UsersService], // 다른 모듈에서 사용 가능
})
export class UsersModule {}
```

## 🔧 주요 속성

### **imports**

```typescript
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),  // TypeORM 기능
    ConfigModule,                      // 설정 모듈
    JwtModule,                         // JWT 모듈
    OtherModule,                       // 다른 모듈
  ],
})
```

### **controllers**

```typescript
@Module({
  controllers: [
    UsersController,    // HTTP 요청 처리
    AuthController,     // 인증 관련
  ],
})
```

### **providers**

```typescript
@Module({
  providers: [
    UsersService,       // 비즈니스 로직
    AuthService,        // 인증 서비스
    DatabaseService,    // 데이터베이스 서비스
  ],
})
```

### **exports**

```typescript
@Module({
  exports: [
    UsersService,       // 다른 모듈에서 사용 가능
    DatabaseService,    // 공유 서비스
  ],
})
```

## 📝 실제 예시

### **UsersModule**

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // AuthModule에서 사용
})
export class UsersModule {}
```

### **AuthModule**

```typescript
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule, // UsersService 사용
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

### **PostsModule**

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    UsersModule, // 사용자 정보 필요
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
```

## 🔄 모듈 간 의존성

### **순환 의존성**

```typescript
// UsersModule
@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

// AuthModule
@Module({
  imports: [forwardRef(() => UsersModule)],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
```

### **동적 모듈**

```typescript
@Module({})
export class DatabaseModule {
  static forRoot(options: DatabaseOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'DATABASE_OPTIONS',
          useValue: options,
        },
        DatabaseService,
      ],
      exports: [DatabaseService],
    };
  }
}

// 사용
@Module({
  imports: [DatabaseModule.forRoot({ host: 'localhost' })],
})
export class AppModule {}
```

## 🏗️ 모듈 설계 패턴

### **Feature Module**

```typescript
// 기능별 모듈 분리
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
```

### **Shared Module**

```typescript
// 공통 기능 모듈
@Module({
  providers: [CommonService, LoggerService],
  exports: [CommonService, LoggerService],
})
export class SharedModule {}
```

### **Core Module**

```typescript
// 핵심 기능 모듈
@Module({
  imports: [ConfigModule, DatabaseModule],
  providers: [CoreService],
  exports: [CoreService],
})
export class CoreModule {}
```

## 🔧 고급 모듈 설정

### **조건부 모듈**

```typescript
@Module({
  imports: [
    process.env.NODE_ENV === 'development'
      ? DevelopmentModule
      : ProductionModule,
  ],
})
export class AppModule {}
```

### **모듈 재사용**

```typescript
// 공통 모듈
@Module({
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}

// 여러 모듈에서 사용
@Module({
  imports: [CommonModule],
})
export class UsersModule {}

@Module({
  imports: [CommonModule],
})
export class PostsModule {}
```

## 🧪 테스트

### **모듈 테스트**

```typescript
describe('UsersModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have UsersService', () => {
    const service = module.get<UsersService>(UsersService);
    expect(service).toBeDefined();
  });
});
```

## 🎯 모범 사례

1. **단일 책임 원칙** - 하나의 모듈은 하나의 도메인만 담당
2. **의존성 관리** - 명확한 의존성 관계 설정
3. **모듈 분리** - 기능별로 모듈 분리
4. **재사용성** - 공통 모듈은 재사용 가능하게 설계
5. **테스트** - 모듈 단위 테스트 작성
6. **문서화** - 모듈 역할과 의존성 문서화

## 📚 추가 학습

- [NestJS Modules 공식 문서](https://docs.nestjs.com/modules)
- [의존성 주입 패턴](https://en.wikipedia.org/wiki/Dependency_injection)
- [모듈 설계 원칙](https://en.wikipedia.org/wiki/Modular_programming)
- [SOLID 원칙](https://en.wikipedia.org/wiki/SOLID)
