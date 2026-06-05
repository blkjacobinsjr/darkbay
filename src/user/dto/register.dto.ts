import { IsString, Min, Max, Matches } from 'class-validator';

export class RegisterDto {
  @IsString()
  @Min(6, { message: 'Username must be at least 6 characters long' })
  @Max(30, { message: 'Username max. 30 characters long' })
  username: string;

  @IsString()
  @Min(8, { message: 'Password must be at least 8 characters long' })
  @Max(20, , { message: 'Password max. 20 characters long' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Das Passwort ist zu schwach (muss mindestens 1 Großbuchstaben, 1 Kleinbuchstaben und 1 Zahl enthalten).',})
  passwordHash: string;
}
