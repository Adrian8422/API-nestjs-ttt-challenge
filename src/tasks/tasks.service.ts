import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto, CreateTaskFromClientDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './tasks.schema';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(
  @InjectModel(Task.name) private readonly taskModel: Model<Task>
  ){

  }
  async create(createTaskDto: CreateTaskFromClientDto, userId: string): Promise<Task> {
    console.log('data service',createTaskDto, userId);
    
    try {
      const newTask = await this.taskModel.create({
        ...createTaskDto,
        dueDate: new Date().toISOString(), // Convertir la cadena ISO a un objeto Date
        userId,
      });
  
      if (!newTask) {
        throw new HttpException(
          "We couldn't create the task",
          HttpStatus.NOT_FOUND,
        );
      }
  
      return newTask;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findAll(userId:string): Promise<Array<Task>> {
    try {
      const tasks = await this.taskModel.find({userId})
      if(!tasks) throw new HttpException(
        "We could not find any tasks from this user",
        HttpStatus.NOT_FOUND,
      );
      return tasks
      
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status,
      );
    }
  }

 async findOne(userId:string, id: string) {
    try {
      const task = await this.taskModel.findOne({userId, _id:id})
      if(!task) throw new HttpException(
        "We could not find this task id from this user",
        HttpStatus.NOT_FOUND,
      );
      return task
      
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status,
      );
    }
  }

  async update(userId: string, id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this.taskModel.findOneAndUpdate({userId, _id:id},updateTaskDto,{ new: true })
      if(!task) throw new HttpException(
        "We could not find this task id from this user, that's why not updated",
        HttpStatus.NOT_FOUND,
      );
       
      return task
      
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status,
      );
    }
  }

  async remove(userId:string,id: string) {
    try {
      const task = await this.taskModel.deleteOne({userId, _id:id})
      if(task.deletedCount == 0) throw new HttpException(
        "We could not find this task id from this user, that's why not deleted",
        HttpStatus.NOT_FOUND,
      );
      console.log('testing',task);
      
       
      return {
        message: 'Deleted task successfully'
      }
      
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status,
      );
    }
  }
}
