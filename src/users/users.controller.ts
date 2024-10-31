import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}



  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Request() req) {
    // Aquí obtienes el usuario del token JWT
    const user = req.user;
    console.log("Id en controller",user.userId);
    
    const response = this.usersService.findMe(user.userId)
    return response;
  }


}
