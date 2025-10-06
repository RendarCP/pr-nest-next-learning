# 프로젝트 개요

## 프로젝트명

NestJS & Next.js 학습 프로젝트 (pr-nest-next-learning)

## 프로젝트 목적

NestJS 백엔드 시스템과 Next.js 프론트엔드의 테스트 코드 작성 및 모범 사례를 학습하기 위한 모노레포 구조의 학습 프로젝트

## 핵심 목표

1. **백엔드 학습**: NestJS 프레임워크의 모듈 기반 아키텍처, DI, Guards, Filters, Interceptors, Pipes 이해
2. **프론트엔드 학습**: Next.js 15 App Router, 컴포넌트 테스트, E2E 테스트, MSW를 통한 API 모킹
3. **전체 스택 학습**: RESTful API 설계, DTO & Validation, 데이터베이스 연동
4. **테스트 전략**: 단위 테스트, E2E 테스트, API 모킹을 통한 완전한 테스트 환경 구축

## 프로젝트 범위

- **백엔드**: NestJS + TypeORM + PostgreSQL
- **프론트엔드**: Next.js 15 + React 19 + Tailwind CSS 4
- **테스트**: Jest, Testing Library, Playwright, MSW
- **개발 도구**: ESLint, Prettier, TypeScript

## 주요 기능

1. **사용자 관리**: 회원가입, 로그인, 사용자 CRUD
2. **게시글 관리**: 게시글 CRUD, 작성자 관계 설정
3. **인증 시스템**: JWT 기반 인증, 가드 및 인터셉터
4. **UI 컴포넌트**: 재사용 가능한 Tailwind 기반 컴포넌트 라이브러리

## 기술적 제약사항

- 모노레포 구조 (pnpm workspace)
- PostgreSQL 데이터베이스 사용
- TypeScript 전면 사용
- 테스트 커버리지 중시
- 현대적인 개발 도구 및 워크플로우

## 성공 기준

- 모든 주요 기능에 대한 단위 테스트 작성
- E2E 테스트를 통한 전체 사용자 플로우 검증
- 재사용 가능한 UI 컴포넌트 라이브러리 구축
- 깔끔하고 유지보수 가능한 코드 구조
