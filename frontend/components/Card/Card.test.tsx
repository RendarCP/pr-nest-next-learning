import { render, screen } from "@testing-library/react";
import { Card, CardHeader, CardTitle, CardContent } from "./Card";

describe("Card Component", () => {
  it("카드가 렌더링되어야 함", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("variant에 따라 스타일이 적용되어야 함", () => {
    const { container, rerender } = render(
      <Card variant="default">Default</Card>
    );
    expect(container.firstChild).toHaveClass("bg-white rounded-lg p-6");

    rerender(<Card variant="bordered">Bordered</Card>);
    expect(container.firstChild).toHaveClass("border border-gray-200");

    rerender(<Card variant="elevated">Elevated</Card>);
    expect(container.firstChild).toHaveClass("shadow-lg");
  });

  it("CardHeader, CardTitle, CardContent가 렌더링되어야 함", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
        </CardHeader>
        <CardContent>Test Content</CardContent>
      </Card>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});
