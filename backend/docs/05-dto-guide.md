# NestJS DTO 완전 가이드

## 🎯 DTO란?

DTO(Data Transfer Object)는 **클라이언트와 서버 간 데이터 전송 형식을 정의**한 클래스입니다. 데이터 검증, 타입 안정성, API 문서화 등의 역할을 담당합니다.

## 📁 DTO 구조

```typescript
import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(2)
  name: string;

  @IsOptional()
  @IsString()
  avatar?: string;
}
```

## 🔧 주요 데코레이터

### **검증 데코레이터**

```typescript
@IsString()           // 문자열 검증
@IsEmail()            // 이메일 형식 검증
@IsNumber()            // 숫자 검증
@IsBoolean()           // 불린 검증
@IsDate()              // 날짜 검증
@IsArray()             // 배열 검증
@IsObject()            // 객체 검증
@IsOptional()          // 선택적 필드
@IsNotEmpty()          // 빈 값 방지
@IsDefined()           // 정의된 값 검증
```

### **길이 검증**

```typescript
@MinLength(6)          // 최소 길이
@MaxLength(255)        // 최대 길이
@Length(6, 255)        // 길이 범위
```

### **숫자 검증**

```typescript
@Min(0)                // 최소값
@Max(100)              // 최대값
@IsPositive()          // 양수
@IsNegative()          // 음수
@IsInt()               // 정수
@IsFloat()             // 실수
```

### **문자열 검증**

```typescript
@Matches(/^[a-zA-Z0-9]+$/)  // 정규식
@IsAlpha()                  // 알파벳만
@IsAlphanumeric()           // 알파벳+숫자
@IsUppercase()              // 대문자
@IsLowercase()              // 소문자
```

## 📝 실제 예시

### **CreateUserDto**

```typescript
import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: '올바른 이메일 형식이 아닙니다.' })
  email: string;

  @IsString({ message: '비밀번호는 문자열이어야 합니다.' })
  @MinLength(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: '비밀번호는 대문자, 소문자, 숫자를 포함해야 합니다.',
  })
  password: string;

  @IsString({ message: '이름은 문자열이어야 합니다.' })
  @MinLength(2, { message: '이름은 최소 2자 이상이어야 합니다.' })
  @MaxLength(50, { message: '이름은 최대 50자까지 가능합니다.' })
  name: string;

  @IsOptional()
  @IsString()
  avatar?: string;
}
```

### **UpdateUserDto**

```typescript
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
```

### **CreatePostDto**

```typescript
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreatePostDto {
  @IsString({ message: '제목은 문자열이어야 합니다.' })
  @MinLength(3, { message: '제목은 최소 3자 이상이어야 합니다.' })
  @MaxLength(200, { message: '제목은 최대 200자까지 가능합니다.' })
  title: string;

  @IsString({ message: '내용은 문자열이어야 합니다.' })
  @MinLength(10, { message: '내용은 최소 10자 이상이어야 합니다.' })
  content: string;

  @IsNumber({}, { message: '작성자 ID는 숫자여야 합니다.' })
  authorId: number;

  @IsOptional()
  @IsBoolean({ message: '발행 여부는 불린 값이어야 합니다.' })
  isPublished?: boolean;
}
```

## 🔄 변환 데코레이터

### **@Type() - 타입 변환**

```typescript
import { Type } from 'class-transformer';

export class CreatePostDto {
  @Type(() => Number)
  @IsNumber()
  authorId: number;

  @Type(() => Boolean)
  @IsBoolean()
  isPublished: boolean;

  @Type(() => Date)
  @IsDate()
  publishedAt: Date;
}
```

### **@Transform() - 값 변환**

```typescript
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @Transform(({ value }) => value?.toLowerCase())
  @IsEmail()
  email: string;

  @Transform(({ value }) => value?.trim())
  @IsString()
  name: string;
}
```

## 🔍 고급 검증

### **커스텀 검증**

```typescript
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isStrongPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const strongPasswordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
          return typeof value === 'string' && strongPasswordRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return '비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.';
        },
      },
    });
  };
}

export class CreateUserDto {
  @IsStrongPassword({ message: '강력한 비밀번호를 입력해주세요.' })
  password: string;
}
```

### **조건부 검증**

```typescript
import { ValidateIf } from 'class-validator';

export class UpdateUserDto {
  @ValidateIf((o) => o.password !== undefined)
  @IsString()
  @MinLength(6)
  password?: string;

  @ValidateIf((o) => o.email !== undefined)
  @IsEmail()
  email?: string;
}
```

## 📊 응답 DTO

### **UserResponseDto**

```typescript
export class UserResponseDto {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.avatar = user.avatar;
    this.isActive = user.isActive;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
```

### **PaginatedResponseDto**

```typescript
export class PaginatedResponseDto<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;

  constructor(data: T[], total: number, page: number, limit: number) {
    this.data = data;
    this.total = total;
    this.page = page;
    this.limit = limit;
    this.totalPages = Math.ceil(total / limit);
  }
}
```

## 🧪 테스트

### **DTO 테스트**

```typescript
describe('CreateUserDto', () => {
  it('should pass validation with valid data', () => {
    const dto = new CreateUserDto();
    dto.email = 'test@example.com';
    dto.password = 'password123';
    dto.name = 'Test User';

    const errors = validateSync(dto);
    expect(errors).toHaveLength(0);
  });

  it('should fail validation with invalid email', () => {
    const dto = new CreateUserDto();
    dto.email = 'invalid-email';
    dto.password = 'password123';
    dto.name = 'Test User';

    const errors = validateSync(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('email');
  });
});
```

## 🎯 모범 사례

1. **명명 규칙** - Create, Update, Response 접두사 사용
2. **검증 메시지** - 사용자 친화적인 에러 메시지
3. **타입 안정성** - TypeScript 타입과 검증 일치
4. **재사용성** - PartialType으로 중복 제거
5. **성능** - 불필요한 검증 방지
6. **보안** - 민감한 데이터 제외

## 📚 추가 학습

- [class-validator 공식 문서](https://github.com/typestack/class-validator)
- [class-transformer 공식 문서](https://github.com/typestack/class-transformer)
- [NestJS Validation 공식 문서](https://docs.nestjs.com/techniques/validation)
- [데이터 검증 패턴](https://en.wikipedia.org/wiki/Data_validation)
