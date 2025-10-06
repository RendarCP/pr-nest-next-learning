# NestJS 프로젝트 구조 가이드

## 📁 전체 프로젝트 구조

```
backend/
├── src/
│   ├── main.ts                    # 애플리케이션 진입점
│   ├── app.module.ts              # 루트 모듈
│   ├── app.controller.ts          # 루트 컨트롤러
│   ├── app.service.ts             # 루트 서비스
│   ├── config/                    # 설정 파일들
│   │   ├── app.config.ts
│   │   └── database.config.ts
│   ├── common/                    # 공통 기능들
│   │   ├── decorators/
│   │   ├── filters/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── pipes/
│   └── modules/                   # 기능별 모듈들
│       ├── auth/
│       ├── users/
│       └── posts/
├── dist/                          # 컴파일된 파일들
├── test/                          # 테스트 파일들
├── package.json
└── tsconfig.json
```

## 🎯 핵심 개념

### 1. **모듈 (Module)**

- 관련 기능들을 그룹화하는 단위
- 의존성 주입 컨테이너 역할
- `@Module()` 데코레이터로 정의

### 2. **컨트롤러 (Controller)**

- HTTP 요청을 처리하는 엔드포인트
- 라우팅과 요청/응답 처리
- `@Controller()` 데코레이터로 정의

### 3. **서비스 (Service)**

- 비즈니스 로직을 처리하는 클래스
- 데이터베이스 조작, 외부 API 호출 등
- `@Injectable()` 데코레이터로 정의

### 4. **엔티티 (Entity)**

- 데이터베이스 테이블 구조를 정의
- TypeORM과 연동하여 ORM 매핑
- `@Entity()` 데코레이터로 정의

### 5. **DTO (Data Transfer Object)**

- 클라이언트와 서버 간 데이터 전송 형식
- 데이터 검증과 타입 안정성 제공
- `class-validator` 데코레이터로 검증

## 🔄 데이터 흐름

```
1. 클라이언트 요청 (HTTP)
   ↓
2. Controller (라우팅 처리)
   ↓
3. DTO (데이터 검증)
   ↓
4. Service (비즈니스 로직)
   ↓
5. Repository (데이터베이스 접근)
   ↓
6. Entity (데이터 매핑)
   ↓
7. 응답 반환 (JSON)
```

## 📋 모듈별 역할

### **AppModule (루트 모듈)**

- 전체 애플리케이션의 진입점
- 다른 모듈들을 import하여 통합
- 전역 설정 (CORS, Validation 등)

### **UsersModule (사용자 모듈)**

- 사용자 관련 기능 담당
- CRUD 작업, 사용자 관리
- 인증/인가와 연동

### **AuthModule (인증 모듈)**

- 로그인, 회원가입 처리
- JWT 토큰 관리
- 사용자 인증 상태 확인

### **PostsModule (게시글 모듈)**

- 게시글 CRUD 작업
- 사용자와의 관계 설정
- 게시글 상태 관리

## 🛠️ 공통 기능 (Common)

### **Guards (가드)**

- 요청 전 인증/인가 검사
- `@UseGuards()` 데코레이터로 적용

### **Interceptors (인터셉터)**

- 요청/응답 전후 처리
- 로깅, 캐싱, 변환 등

### **Pipes (파이프)**

- 데이터 변환 및 검증
- 전역 Validation Pipe 설정

### **Filters (필터)**

- 예외 처리 및 에러 응답
- 전역 Exception Filter 설정

## 🔧 설정 파일

### **main.ts**

- 애플리케이션 부트스트랩
- 전역 설정 적용
- 서버 시작

### **config/**

- 환경별 설정 관리
- 데이터베이스 연결 설정
- 애플리케이션 설정

## 📚 학습 순서

1. **기본 구조 이해** - 모듈, 컨트롤러, 서비스
2. **데이터베이스 연동** - TypeORM, 엔티티
3. **API 설계** - RESTful API, DTO
4. **인증/인가** - JWT, 가드
5. **테스트** - 단위 테스트, 통합 테스트
6. **배포** - Docker, 환경 설정

## 🎯 다음 단계

- [ ] JWT 인증 구현
- [ ] API 문서화 (Swagger)
- [ ] 테스트 코드 작성
- [ ] Docker 컨테이너화
- [ ] CI/CD 파이프라인 구축
