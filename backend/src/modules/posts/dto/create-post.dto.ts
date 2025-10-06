import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  MinLength,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(10)
  content: string;

  @IsNumber()
  authorId: number;

  @IsBoolean()
  @IsOptional()
  published?: boolean;
}
