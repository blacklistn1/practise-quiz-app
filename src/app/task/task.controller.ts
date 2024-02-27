import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/services/auth.guard';

@Controller('tasks')
@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class TaskController {
  @Post('create')
  createTask() {
    return 'yay';
  }
}
