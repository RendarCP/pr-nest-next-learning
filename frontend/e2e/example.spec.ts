import { test, expect } from "@playwright/test";

test("홈페이지가 로드되어야 함", async ({ page }) => {
  await page.goto("/");

  // 페이지 타이틀 확인
  await expect(page).toHaveTitle(/Next.js/);
});

test("네비게이션이 동작해야 함", async ({ page }) => {
  await page.goto("/");

  // 예제: 링크 클릭 테스트
  // await page.click('text=About')
  // await expect(page).toHaveURL('/about')
});
