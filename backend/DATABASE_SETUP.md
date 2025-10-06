# PostgreSQL 데이터베이스 설정 가이드

## 1. PostgreSQL 설치 및 실행

### macOS (Homebrew 사용)

```bash
brew install postgresql
brew services start postgresql
```

### Ubuntu/Debian

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Windows

PostgreSQL 공식 사이트에서 다운로드: https://www.postgresql.org/download/windows/

## 2. 데이터베이스 생성

```bash
# PostgreSQL에 접속
psql -U postgres

# 데이터베이스 생성
CREATE DATABASE nest_learning;

# 사용자 생성 (선택사항)
CREATE USER nest_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE nest_learning TO nest_user;

# 종료
\q
```

## 3. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=nest_learning

# Application Configuration
NODE_ENV=development
PORT=3000
API_PREFIX=api
CORS_ORIGINS=http://localhost:3001
```

## 4. 애플리케이션 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm run start:dev
```

## 5. 데이터베이스 확인

애플리케이션이 실행되면 TypeORM이 자동으로 테이블을 생성합니다.

```bash
# PostgreSQL에 접속하여 테이블 확인
psql -U postgres -d nest_learning

# 테이블 목록 확인
\dt

# users 테이블 구조 확인
\d users

# posts 테이블 구조 확인
\d posts
```

## 6. API 테스트

### 사용자 생성

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

### 사용자 목록 조회

```bash
curl http://localhost:3000/api/users
```

### 게시글 생성

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "content": "This is my first post content",
    "authorId": 1,
    "isPublished": true
  }'
```

### 게시글 목록 조회

```bash
curl http://localhost:3000/api/posts
```
