import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
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
    return await this.taskRepository.find({
      where: { user: { id } },
    });
  }

  async remove(id: number) {
    await this.taskRepository.delete(id);
    return `Task with #${id} was deleted`;
  }
}
