# NestJS Entities 완전 가이드

## 🎯 Entity란?

Entity는 **데이터베이스 테이블 구조를 클래스로 정의**한 것입니다. TypeORM과 연동하여 객체-관계 매핑(ORM)을 제공합니다.

## 📁 Entity 구조

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users') // 테이블명 지정
export class User {
  @PrimaryGeneratedColumn() // 자동 증가 기본키
  id: number;

  @Column() // 일반 컬럼
  email: string;

  @Column({ nullable: true }) // NULL 허용
  avatar?: string;

  @CreateDateColumn() // 생성일시 자동 설정
  createdAt: Date;

  @UpdateDateColumn() // 수정일시 자동 설정
  updatedAt: Date;
}
```

## 🔧 주요 데코레이터

### **@Entity()**

```typescript
@Entity()                    // 테이블명: User (클래스명)
@Entity('users')            // 테이블명: users
@Entity('public.users')      // 스키마 포함
```

### **@PrimaryGeneratedColumn()**

```typescript
@PrimaryGeneratedColumn()           // 자동 증가
@PrimaryGeneratedColumn('uuid')      // UUID 생성
@PrimaryGeneratedColumn('increment') // 정수 증가
```

### **@Column()**

```typescript
@Column()                           // 기본 컬럼
@Column({ type: 'varchar', length: 255 })  // 타입과 길이 지정
@Column({ nullable: true })         // NULL 허용
@Column({ unique: true })           // 유니크 제약
@Column({ default: 'active' })      // 기본값 설정
```

## 📝 실제 예시

### **User Entity**

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Post } from './post.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 관계 설정
  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
```

### **Post Entity**

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text') // TEXT 타입
  content: string;

  @Column({ default: false })
  isPublished: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 관계 설정
  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authorId' })
  author: User;

  @Column()
  authorId: number;
}
```

## 🔗 관계 설정

### **OneToMany (일대다)**

```typescript
@OneToMany(() => Post, (post) => post.author)
posts: Post[];
```

### **ManyToOne (다대일)**

```typescript
@ManyToOne(() => User, (user) => user.posts)
@JoinColumn({ name: 'authorId' })
author: User;
```

### **OneToOne (일대일)**

```typescript
@OneToOne(() => Profile, (profile) => profile.user)
@JoinColumn()
profile: Profile;
```

### **ManyToMany (다대다)**

```typescript
@ManyToMany(() => Tag, (tag) => tag.posts)
@JoinTable()
tags: Tag[];
```

## 📊 컬럼 타입

### **기본 타입**

```typescript
@Column('varchar', { length: 255 })
name: string;

@Column('int')
age: number;

@Column('boolean')
isActive: boolean;

@Column('decimal', { precision: 10, scale: 2 })
price: number;

@Column('date')
birthDate: Date;

@Column('timestamp')
createdAt: Date;
```

### **JSON 타입**

```typescript
@Column('json')
metadata: object;

@Column('jsonb')  // PostgreSQL
settings: object;
```

### **배열 타입**

```typescript
@Column('simple-array')
tags: string[];

@Column('simple-json')
config: object;
```

## 🔧 고급 옵션

### **인덱스 설정**

```typescript
@Entity('users')
@Index(['email']) // 단일 인덱스
@Index(['name', 'email']) // 복합 인덱스
export class User {
  @Column()
  @Index() // 컬럼 레벨 인덱스
  email: string;
}
```

### **유니크 제약**

```typescript
@Entity('users')
@Unique(['email']) // 테이블 레벨 유니크
export class User {
  @Column({ unique: true }) // 컬럼 레벨 유니크
  email: string;
}
```

### **체크 제약**

```typescript
@Entity('users')
@Check(`"age" >= 0`)
export class User {
  @Column()
  age: number;
}
```

## 🔄 관계 옵션

### **Cascade 옵션**

```typescript
@OneToMany(() => Post, (post) => post.author, { cascade: true })
posts: Post[];

// cascade: true - 부모 저장 시 자식도 저장
// cascade: ['insert', 'update'] - 특정 작업만
```

### **Eager/Lazy 로딩**

```typescript
@OneToMany(() => Post, (post) => post.author, { eager: true })
posts: Post[];  // 항상 함께 로드

@OneToMany(() => Post, (post) => post.author, { lazy: true })
posts: Promise<Post[]>;  // 지연 로드
```

### **OnDelete 옵션**

```typescript
@ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
author: User;  // 부모 삭제 시 자식도 삭제

// onDelete: 'SET NULL' - NULL로 설정
// onDelete: 'RESTRICT' - 삭제 방지
```

## 🧪 테스트

### **Entity 테스트**

```typescript
describe('User Entity', () => {
  it('should create a user entity', () => {
    const user = new User();
    user.email = 'test@example.com';
    user.name = 'Test User';

    expect(user.email).toBe('test@example.com');
    expect(user.name).toBe('Test User');
  });

  it('should have default values', () => {
    const user = new User();
    expect(user.isActive).toBe(true);
  });
});
```

## 🎯 모범 사례

1. **명명 규칙** - 테이블명은 복수형, 컬럼명은 snake_case
2. **관계 설정** - 적절한 관계 타입과 옵션 선택
3. **인덱스** - 자주 조회되는 컬럼에 인덱스 설정
4. **제약 조건** - 데이터 무결성을 위한 제약 설정
5. **성능** - 불필요한 관계 로딩 방지
6. **마이그레이션** - 스키마 변경 시 마이그레이션 사용

## 📚 추가 학습

- [TypeORM Entities 공식 문서](https://typeorm.io/entities)
- [데이터베이스 정규화](https://en.wikipedia.org/wiki/Database_normalization)
- [관계형 데이터베이스 설계](https://en.wikipedia.org/wiki/Database_design)
- [PostgreSQL 데이터 타입](https://www.postgresql.org/docs/current/datatype.html)
