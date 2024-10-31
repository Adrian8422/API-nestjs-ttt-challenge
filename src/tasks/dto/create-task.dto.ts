import { IsString, IsNotEmpty, IsEnum, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsEnum(['pendiente', 'en progreso', 'completada'], {
    message: 'status must be either pendiente, en progreso, or completada',
  })
  status: 'pendiente' | 'en progreso' | 'completada';

  @IsDateString({}, { message: 'dueDate must be a valid ISO date string' })
  dueDate: string; // Cambiado a string

  @IsString()
  userId: string;
}
export class CreateTaskFromClientDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsEnum(['pendiente', 'en progreso', 'completada'], {
    message: 'status must be either pendiente, en progreso, or completada',
  })
  status: 'pendiente' | 'en progreso' | 'completada';

}
