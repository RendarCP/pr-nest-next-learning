import { http, HttpResponse } from "msw";

export const handlers = [
  // 예제 API 핸들러
  http.get("/api/users", () => {
    return HttpResponse.json([
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
    ]);
  }),

  http.post("/api/users", async ({ request }) => {
    const newUser = await request.json();
    return HttpResponse.json({ id: 3, ...newUser }, { status: 201 });
  }),
];
