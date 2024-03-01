import { IsNotEmpty } from 'class-validator';
import { User } from 'db/entities';

export class CreateTaskDto {
  @IsNotEmpty()
  task: string;

  @IsNotEmpty()
  complite: boolean;

  user?: User;
}
