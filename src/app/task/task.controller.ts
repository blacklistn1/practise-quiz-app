import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('tasks')
@ApiTags('Tasks')
@UseInterceptors(ClassSerializerInterceptor)
export class TaskController {
  @Post('create')
  createTask() {}
}
