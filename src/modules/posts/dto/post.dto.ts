import {
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CommentDto } from '../../comments/dto/comment.dto';

export class PostDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  description: string;

  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  comments: CommentDto[];
}
