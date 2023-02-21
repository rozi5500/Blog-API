import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class PostDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
