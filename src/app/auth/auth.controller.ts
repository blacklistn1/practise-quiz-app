import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { CreateUserRequest, LoginRequest } from '../user/schemas/user.schema';
import { AuthService } from './services/auth.service';
import { AuthResponse } from './schemas/auth.schema';

@Controller('auth')
@ApiTags('Auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({
    type: CreateUserRequest,
  })
  @ApiCreatedResponse({
    schema: {
      type: 'object',
      properties: {
        status_code: {
          type: 'number',
        },
        data: {
          type: 'object',
          $ref: getSchemaPath(AuthResponse),
        },
      },
    },
  })
  register(@Body() body: CreateUserRequest) {
    return this.authService.register(body);
  }

  @Post('login')
  @ApiBody({
    type: LoginRequest,
  })
  @ApiCreatedResponse({
    type: AuthResponse,
  })
  login(@Body() body: LoginRequest) {
    return this.authService.login(body);
  }
}
