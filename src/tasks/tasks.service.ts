import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

export interface Task {
  id: number;
  title: string;
  description?: string;
  isCompleted: boolean;
}

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private idCounter = 1;

  create(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      id: this.idCounter++,
      title: createTaskDto.title,
      description: createTaskDto.description,
      isCompleted: createTaskDto.isCompleted ?? false,
    };

    this.tasks.push(task);
    return task;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: number): Task {
    const task = this.tasks.find(t => t.id === id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  update(id: number, updateData: Partial<Task>): Task {
    const task = this.findOne(id);
    Object.assign(task, updateData);
    return task;
  }

  remove(id: number): void {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) throw new NotFoundException('Task not found');
    this.tasks.splice(index, 1);
  }
}
