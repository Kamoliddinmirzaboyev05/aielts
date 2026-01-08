import { IsString, IsNotEmpty, IsOptional, IsEnum, IsObject } from 'class-validator';

export class CreateTestDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsObject()
  @IsOptional()
  content?: any;

  @IsString()
  @IsOptional()
  audioUrl?: string;
}
