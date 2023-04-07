import { IsEmail, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { CountriesEnum, GendersEnum } from '../../../common/enums';

export class UserDto {
  @IsUUID()
  id: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  userName: string;

  @IsOptional()
  @IsString()
  refresh_token: string;

  @IsEnum(GendersEnum)
  gender: string;

  @IsEnum(CountriesEnum)
  country: string;

  @IsOptional()
  @IsString()
  photo: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  role: string;

  @IsString()
  @IsOptional()
  authToken: string;
}
