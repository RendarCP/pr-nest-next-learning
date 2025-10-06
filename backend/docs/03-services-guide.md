# NestJS Services 완전 가이드

## 🎯 Service란?

Service는 **비즈니스 로직을 처리하는 클래스**입니다. 데이터베이스 조작, 외부 API 호출, 데이터 변환 등의 핵심 로직을 담당합니다.

## 📁 Service 구조

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()  // 의존성 주입 가능한 클래스로 표시
export class UsersService {
  constructor(
    @InjectRepository(User)  // Repository 주입
    private readonly userRepository: Repository<User>,
  ) {}

  // 비즈니스 로직 메서드들
  async create(createUserDto: CreateUserDto) { ... }
  async findAll() { ... }
  async findOne(id: number) { ... }
  async update(id: number, updateUserDto: UpdateUserDto) { ... }
  async remove(id: number) { ... }
}
```

## 🔧 주요 데코레이터

### **@Injectable()**

```typescript
@Injectable()  // 의존성 주입 컨테이너에 등록
export class UsersService { ... }
```

### **@InjectRepository()**

```typescript
constructor(
  @InjectRepository(User)  // TypeORM Repository 주입
  private readonly userRepository: Repository<User>,
) {}
```

## 📝 실제 예시

### **UsersService**

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 사용자 생성
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  // 모든 사용자 조회
  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      select: [
        'id',
        'email',
        'name',
        'avatar',
        'isActive',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  // 특정 사용자 조회
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: [
        'id',
        'email',
        'name',
        'avatar',
        'isActive',
        'createdAt',
        'updatedAt',
      ],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  // 사용자 정보 수정
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  // 사용자 삭제
  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  // 이메일로 사용자 찾기
  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  // 사용자와 게시글 함께 조회
  async findByIdWithPosts(id: number): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['posts'],
    });
  }
}
```

## 🔄 데이터베이스 작업

### **기본 CRUD 작업**

```typescript
// Create (생성)
async create(dto: CreateUserDto): Promise<User> {
  const user = this.repository.create(dto);
  return await this.repository.save(user);
}

// Read (조회)
async findAll(): Promise<User[]> {
  return await this.repository.find();
}

async findOne(id: number): Promise<User> {
  return await this.repository.findOne({ where: { id } });
}

// Update (수정)
async update(id: number, dto: UpdateUserDto): Promise<User> {
  const user = await this.findOne(id);
  Object.assign(user, dto);
  return await this.repository.save(user);
}

// Delete (삭제)
async remove(id: number): Promise<void> {
  const user = await this.findOne(id);
  await this.repository.remove(user);
}
```

### **고급 쿼리**

```typescript
// 조건부 조회
async findActiveUsers(): Promise<User[]> {
  return await this.userRepository.find({
    where: { isActive: true },
    order: { createdAt: 'DESC' },
  });
}

// 관계 데이터 포함
async findUsersWithPosts(): Promise<User[]> {
  return await this.userRepository.find({
    relations: ['posts'],
    order: { createdAt: 'DESC' },
  });
}

// 페이지네이션
async findUsersWithPagination(page: number, limit: number): Promise<User[]> {
  const skip = (page - 1) * limit;
  return await this.userRepository.find({
    skip,
    take: limit,
    order: { createdAt: 'DESC' },
  });
}

// 검색
async searchUsers(searchTerm: string): Promise<User[]> {
  return await this.userRepository
    .createQueryBuilder('user')
    .where('user.name ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
    .orWhere('user.email ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
    .getMany();
}
```

## 🔗 서비스 간 의존성

### **서비스 주입**

```typescript
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService, // 다른 서비스 주입
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    // 비밀번호 검증 로직
    return user;
  }
}
```

### **순환 의존성 해결**

```typescript
// forwardRef 사용
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
}
```

## 🛡️ 에러 처리

### **예외 던지기**

```typescript
import { NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';

async findOne(id: number): Promise<User> {
  const user = await this.userRepository.findOne({ where: { id } });

  if (!user) {
    throw new NotFoundException(`User with ID ${id} not found`);
  }

  return user;
}

async create(createUserDto: CreateUserDto): Promise<User> {
  const existingUser = await this.findByEmail(createUserDto.email);

  if (existingUser) {
    throw new ConflictException('User already exists');
  }

  // 생성 로직
}
```

### **커스텀 예외**

```typescript
import { HttpException, HttpStatus } from '@nestjs/common';

async validateUser(userId: number): Promise<User> {
  const user = await this.findOne(userId);

  if (!user.isActive) {
    throw new HttpException(
      'User account is deactivated',
      HttpStatus.FORBIDDEN
    );
  }

  return user;
}
```

## 🔄 트랜잭션 처리

### **단일 트랜잭션**

```typescript
import { DataSource } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  async createUserWithProfile(
    userData: CreateUserDto,
    profileData: CreateProfileDto,
  ) {
    return await this.dataSource.transaction(async (manager) => {
      const user = manager.create(User, userData);
      const savedUser = await manager.save(user);

      const profile = manager.create(Profile, {
        ...profileData,
        userId: savedUser.id,
      });

      return await manager.save(profile);
    });
  }
}
```

## 🧪 테스트

### **단위 테스트**

```typescript
describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto = { email: 'test@example.com', name: 'Test User' };
    const user = { id: 1, ...createUserDto };

    jest.spyOn(repository, 'create').mockReturnValue(user as User);
    jest.spyOn(repository, 'save').mockResolvedValue(user as User);

    const result = await service.create(createUserDto);
    expect(result).toEqual(user);
  });
});
```

## 🎯 모범 사례

1. **단일 책임 원칙** - 하나의 서비스는 하나의 도메인만 담당
2. **의존성 주입** - 외부 의존성을 생성자에서 주입받기
3. **에러 처리** - 적절한 예외를 던져서 컨트롤러에서 처리
4. **비동기 처리** - 모든 데이터베이스 작업을 async/await로 처리
5. **트랜잭션** - 관련된 여러 작업을 하나의 트랜잭션으로 처리
6. **로깅** - 중요한 작업에 로깅 추가
7. **검증** - 입력 데이터 검증 및 비즈니스 규칙 적용

## 📚 추가 학습

- [NestJS Services 공식 문서](https://docs.nestjs.com/providers)
- [TypeORM Repository 패턴](https://typeorm.io/repository-api)
- [의존성 주입 패턴](https://en.wikipedia.org/wiki/Dependency_injection)
- [SOLID 원칙](https://en.wikipedia.org/wiki/SOLID)
