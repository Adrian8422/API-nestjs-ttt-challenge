import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './auth.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.schema';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private readonly authModel: Model<Auth>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService:JwtService
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    try {
      const { password } = registerAuthDto;
      const plainToHash = await bcrypt.hash(password, 10);
      const newAuth = await this.authModel.create({
        ...registerAuthDto,
        password: plainToHash,
      });
      const newUser = await this.userModel.create({
        email: newAuth.email,
        authId: newAuth._id, 
      });

      return {
        auth: newAuth,
        user: newUser,
      };
    } catch (error) {
      console.log(error);
      
      throw new HttpException(
        error.message,
        error.status,
      );
    }
  }

  async login(loginAuthDto: LoginAuthDto) {
    console.log(loginAuthDto);
    
    try {
      const {email,password} = loginAuthDto
      const findUser = await this.authModel.findOne({email})
      if(!findUser)  throw new HttpException(
        'User not found',
        HttpStatus.NOT_FOUND,
      );
      const checkPassword = await bcrypt.compare(password, findUser.password) 
      if(!checkPassword) throw new HttpException(
        'Password incorrect',
        HttpStatus.UNAUTHORIZED,
      );

      const payload = {
        id:findUser.id,
        name: findUser.name
      }

      const token = this.jwtService.sign(payload)


      const data = {
        user:findUser,
        token
      }
      return data
      


      
     
    } catch (error) {
      console.log(error);
      
      throw new HttpException(
        error.message,
        error.status,
      );

      
    }
  }
}


////// VOY POR LA PARTE EN LA QUE EL LOGIN BUSCA POR EL EMAIL, DEBO CONTINUAR POR LO DEL PASSWORD Y DEMAS, IMPLEMENTAR JWT