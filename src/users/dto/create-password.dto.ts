import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class CreatePasswordDTO {
  @IsNotEmpty()
  @MaxLength(32)
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;
}
