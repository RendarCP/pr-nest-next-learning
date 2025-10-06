"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/Card";
import { Input } from "@/components/Input";

export default function ShowcasePage() {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = (variant: string) => {
    alert(`${variant} 버튼이 클릭되었습니다!`);
  };

  const handleLoadingTest = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value.length < 3) {
      setInputError("최소 3자 이상 입력해주세요");
    } else {
      setInputError("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            컴포넌트 Showcase
          </h1>
          <p className="text-lg text-gray-600">
            프로젝트에서 사용할 수 있는 모든 컴포넌트를 확인하고 테스트하세요
          </p>
        </div>

        <div className="space-y-12">
          {/* Button Section */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              Button
            </h2>

            <div className="space-y-8">
              {/* Variants */}
              <Card variant="bordered">
                <CardHeader>
                  <CardTitle>Variants</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <Button
                      variant="primary"
                      onClick={() => handleButtonClick("Primary")}
                    >
                      Primary
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleButtonClick("Secondary")}
                    >
                      Secondary
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleButtonClick("Outline")}
                    >
                      Outline
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleButtonClick("Ghost")}
                    >
                      Ghost
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleButtonClick("Danger")}
                    >
                      Danger
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Sizes */}
              <Card variant="bordered">
                <CardHeader>
                  <CardTitle>Sizes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center flex-wrap gap-4">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </CardContent>
              </Card>

              {/* States */}
              <Card variant="bordered">
                <CardHeader>
                  <CardTitle>States</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <Button>Normal</Button>
                    <Button disabled>Disabled</Button>
                    <Button isLoading={isLoading} onClick={handleLoadingTest}>
                      {isLoading ? "Loading..." : "Test Loading"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Card Section */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Card</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="default">
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    기본 스타일의 카드입니다. 배경색과 패딩이 적용되어 있습니다.
                  </p>
                </CardContent>
              </Card>

              <Card variant="bordered">
                <CardHeader>
                  <CardTitle>Bordered Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    테두리가 있는 카드입니다. 요소를 구분하기 좋습니다.
                  </p>
                </CardContent>
              </Card>

              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Elevated Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    그림자가 있는 카드입니다. 강조하고 싶은 요소에 사용하세요.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Complex Card Example */}
            <div className="mt-6">
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>복잡한 카드 예제</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      카드 안에 다양한 컴포넌트를 조합할 수 있습니다.
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="primary">
                        확인
                      </Button>
                      <Button size="sm" variant="outline">
                        취소
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Input Section */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Input</h2>

            <div className="space-y-8">
              {/* Basic Inputs */}
              <Card variant="bordered">
                <CardHeader>
                  <CardTitle>Basic Inputs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-w-md">
                    <Input placeholder="Placeholder 텍스트" />
                    <Input label="라벨이 있는 입력" placeholder="내용 입력" />
                    <Input
                      label="이메일"
                      type="email"
                      placeholder="example@email.com"
                    />
                    <Input
                      label="비밀번호"
                      type="password"
                      placeholder="비밀번호 입력"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Input States */}
              <Card variant="bordered">
                <CardHeader>
                  <CardTitle>Input States</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-w-md">
                    <Input label="Normal" placeholder="일반 상태" />
                    <Input
                      label="Disabled"
                      placeholder="비활성화 상태"
                      disabled
                    />
                    <Input
                      label="With Error"
                      placeholder="에러 상태"
                      error="에러 메시지가 표시됩니다"
                    />
                    <Input
                      label="실시간 검증"
                      placeholder="최소 3자 이상 입력"
                      value={inputValue}
                      onChange={handleInputChange}
                      error={inputError}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Form Example */}
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>폼 예제</CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    className="space-y-4 max-w-md"
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert("폼이 제출되었습니다!");
                    }}
                  >
                    <Input label="이름" placeholder="홍길동" required />
                    <Input
                      label="이메일"
                      type="email"
                      placeholder="example@email.com"
                      required
                    />
                    <Input
                      label="전화번호"
                      type="tel"
                      placeholder="010-1234-5678"
                    />
                    <div className="flex gap-2 pt-2">
                      <Button type="submit" variant="primary">
                        제출
                      </Button>
                      <Button type="reset" variant="outline">
                        초기화
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Combined Example */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              종합 예제
            </h2>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>로그인 폼</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4 max-w-md">
                  <Input
                    label="이메일"
                    type="email"
                    placeholder="이메일을 입력하세요"
                  />
                  <Input
                    label="비밀번호"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                  />
                  <div className="flex items-center justify-between pt-4">
                    <Button variant="ghost" size="sm">
                      비밀번호 찾기
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline">회원가입</Button>
                      <Button variant="primary">로그인</Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
