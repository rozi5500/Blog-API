import { RolesEnum } from '../../../common/enums/roles.enum';
import { IsEnum, IsString } from 'class-validator';

export class ChangeUserRoleDto {
  @IsString()
  id: string;

  @IsEnum(RolesEnum)
  role: RolesEnum;
}
