import { IsEmail, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { GendersEnum } from '../../../common/enums/genders.enum';
import { CountriesEnum } from '../../../common/enums/countries.enum';

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
}
