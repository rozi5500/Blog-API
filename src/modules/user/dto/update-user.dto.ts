import { IsEmail, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { GendersEnum } from '../../../common/enums/genders.enum';
import { CountriesEnum } from '../../../common/enums/countries.enum';

export class UpdateUserDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  userName: string;

  @IsEnum(GendersEnum)
  @IsOptional()
  gender: string;

  @IsEnum(CountriesEnum)
  @IsOptional()
  country: string;

  @IsOptional()
  @IsString()
  photo: string;

  @IsString()
  @IsOptional()
  password: string;
}
