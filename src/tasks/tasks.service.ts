import { Injectable, NotFoundException } from '@nestjs/common';
import type { Task } from './task.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private idCounter = 1;

  create(createTaskDto: CreateTaskDto): Task {
    const newTask: Task = {
      id: this.idCounter++,
      title: createTaskDto.title,
      description: createTaskDto.description || '',
      isCompleted: createTaskDto.isCompleted ?? false,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: number): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  update(id: number, updateTaskDto: UpdateTaskDto): Task {
    const task = this.findOne(id);
    if (updateTaskDto.title !== undefined) {
      task.title = updateTaskDto.title;
    }
    if (updateTaskDto.description !== undefined) {
      task.description = updateTaskDto.description;
    }
    if (updateTaskDto.isCompleted !== undefined) {
      task.isCompleted = updateTaskDto.isCompleted;
    }
    return task;
  }

  remove(id: number): void {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    this.tasks.splice(taskIndex, 1);
  }
}
