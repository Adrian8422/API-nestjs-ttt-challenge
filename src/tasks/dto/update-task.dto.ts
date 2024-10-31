import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {


  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(['pendiente', 'en progreso', 'completada'], {
    message: 'status must be either pendiente, en progreso, or completada',
  })
  @IsOptional()
  status?: 'pendiente' | 'en progreso' | 'completada';

  @IsDateString({}, { message: 'dueDate must be a valid ISO date string' })
  @IsOptional()
  dueDate?: string;
}
