import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  task: string;

  @IsNotEmpty()
  complite: boolean;

  @IsNotEmpty()
  owner: number;
}
