import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((t) => t.id === id);
  }

  getTasksWithFilters(filterDto: GetTasksFilterDTO): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((t) => t.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        (t) => t.title.includes(search) || t.description.includes(search),
      );
    }
    return tasks;
  }

  createTask(createTaskDto: CreateTaskDTO): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuidv4(),
      status: TaskStatus.OPEN,
      title,
      description,
    };
    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const foundTaskIndex = this.tasks.findIndex((t) => t.id === id);
    this.tasks[foundTaskIndex].status = status;
    return this.tasks[foundTaskIndex];
  }

  deleteTask(id: string): Task {
    const foundTaskIndex = this.tasks.findIndex((t) => t.id === id);
    this.tasks.splice(foundTaskIndex, 1);
    return this.tasks[foundTaskIndex];
  }
}
