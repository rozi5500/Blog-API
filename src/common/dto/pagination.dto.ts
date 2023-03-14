import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  offset: number;
}

export class FilterWithPaginationDto extends PaginationDto {
  @IsOptional()
  @IsString()
  filter: string;
}
