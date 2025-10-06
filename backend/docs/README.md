# NestJS 백엔드 개발 가이드

## 📚 문서 목록

이 디렉토리는 NestJS 백엔드 개발에 필요한 모든 가이드를 포함합니다.

### 1. [프로젝트 구조 가이드](./01-project-structure.md)

- 전체 프로젝트 구조 이해
- 핵심 개념 설명
- 데이터 흐름 분석
- 모듈별 역할 정리

### 2. [Controllers 가이드](./02-controllers-guide.md)

- HTTP 요청 처리
- 라우팅 설정
- 요청 데이터 처리
- 응답 형식 설정

### 3. [Services 가이드](./03-services-guide.md)

- 비즈니스 로직 처리
- 데이터베이스 작업
- 서비스 간 의존성
- 에러 처리

### 4. [Entities 가이드](./04-entities-guide.md)

- 데이터베이스 테이블 구조
- TypeORM 설정
- 관계 설정
- 고급 옵션

### 5. [DTO 가이드](./05-dto-guide.md)

- 데이터 전송 객체
- 검증 데코레이터
- 변환 처리
- 커스텀 검증

### 6. [Modules 가이드](./06-modules-guide.md)

- 모듈 설계
- 의존성 관리
- 모듈 간 통신
- 고급 설정

## 🚀 빠른 시작

### 1. 프로젝트 구조 이해

```bash
# 프로젝트 구조 파악
tree src/ -I node_modules
```

### 2. 개발 서버 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm run start:dev
```

### 3. API 테스트

```bash
# 사용자 생성
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123", "name": "Test User"}'

# 사용자 목록 조회
curl http://localhost:3000/api/users
```

## 🎯 학습 순서

1. **기본 구조 이해** - 프로젝트 구조 가이드 읽기
2. **컨트롤러 학습** - HTTP 요청 처리 방법
3. **서비스 학습** - 비즈니스 로직 구현
4. **엔티티 학습** - 데이터베이스 구조 설계
5. **DTO 학습** - 데이터 검증 및 변환
6. **모듈 학습** - 애플리케이션 구조화

## 🔧 개발 환경 설정

### 필수 도구

- Node.js 18+
- PostgreSQL 13+
- pnpm (패키지 매니저)
- DBeaver (데이터베이스 관리)

### 환경 변수 설정

```env
# .env 파일 생성
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=nest_learning
NODE_ENV=development
PORT=3000
API_PREFIX=api
```

## 📖 추가 학습 자료

- [NestJS 공식 문서](https://docs.nestjs.com/)
- [TypeORM 공식 문서](https://typeorm.io/)
- [PostgreSQL 공식 문서](https://www.postgresql.org/docs/)
- [Node.js 공식 문서](https://nodejs.org/docs/)

## 🤝 기여하기

이 문서는 학습 목적으로 작성되었습니다. 개선 사항이나 추가 내용이 있다면 언제든 제안해주세요!

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
