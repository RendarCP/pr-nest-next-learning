import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

describe("Input Component", () => {
  it("인풋이 렌더링되어야 함", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("라벨이 표시되어야 함", () => {
    render(<Input label="Username" />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
  });

  it("에러 메시지가 표시되어야 함", () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("텍스트 입력이 동작해야 함", async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Enter text" />);

    const input = screen.getByPlaceholderText("Enter text");
    await user.type(input, "Hello");

    expect(input).toHaveValue("Hello");
  });

  it("disabled 상태가 적용되어야 함", () => {
    render(<Input disabled placeholder="Disabled input" />);
    const input = screen.getByPlaceholderText("Disabled input");

    expect(input).toBeDisabled();
  });

  it("에러 상태일 때 스타일이 적용되어야 함", () => {
    render(<Input error="Error message" />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveClass("border-red-500");
  });
});
