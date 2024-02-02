import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty()
  access_token: string;

  constructor(data: Partial<AuthResponse>) {
    Object.assign(this, data);
  }
}
