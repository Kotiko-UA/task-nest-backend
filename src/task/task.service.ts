import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository, getRepository } from 'typeorm';
import { Task } from 'db/entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, id: number) {
    const newTask = {
      task: createTaskDto.task,
      complite: createTaskDto.complite,
      user: { id },
    };
    return await this.taskRepository.save(newTask);
  }

  async findAll(id: number) {
    const tasks = await this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.user', 'user')
      .select(['task.id', 'task.task', 'task.complite', 'user.id'])
      .where('user.id = :id', { id })
      .getMany();

    return tasks;
  }

  async remove(id: number) {
    await this.taskRepository.delete(id);
    return `Task with #${id} was deleted`;
  }
}
