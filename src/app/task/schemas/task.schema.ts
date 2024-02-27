import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTaskRequest {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsDefined()
  @IsDate()
  @Type(() => Date)
  start_date: Date;

  @IsDefined()
  @IsDate()
  @Type(() => Date)
  end_date: Date;

  @IsOptional()
  @IsString()
  description?: string;
}
