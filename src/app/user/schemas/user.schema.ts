import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserRequest {
  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(60)
  @ApiProperty()
  password: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  first_name?: string | null;

  @IsOptional()
  @IsString()
  @ApiProperty()
  last_name?: string | null;
}

export class CreateUserResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  constructor(data: Partial<CreateUserResponse>) {
    Object.assign(this, data);
  }
}
