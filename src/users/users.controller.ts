import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreatePasswordDTO } from './dto/create-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @HttpCode(HttpStatus.NO_CONTENT)
  async registerUser(@Body() createUserDTO: CreateUserDTO) {
    return await this.usersService.register(createUserDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('create-password')
  async CreatePassword(
    @Body() createPasswordDTO: CreatePasswordDTO,
    @Request() req,
  ) {
    const { password } = createPasswordDTO;
    const { id } = req.user;
    return await this.usersService.changePassword(id, password);
  }
}
