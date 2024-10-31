import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Model, Types } from 'mongoose';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ){

  }
  async findMe(id:string){
    console.log("id en service",id);
    
    try {
      const user=  await this.userModel.findOne({ authId: new Types.ObjectId(id) })
      console.log(user)
      return user
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status,
      );
      
    }

  }

}
