import { RestorePasswordDto } from '../../auth/dto/restore-password.dto';
import { IsString } from 'class-validator';

export class ChangePasswordDto extends RestorePasswordDto {
  @IsString()
  newPassword: string;
}
