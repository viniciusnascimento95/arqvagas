import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserProfessionalDto } from './dto/update-user-professional.dto';
import { UpdateUserDto } from './dto/update-user.dts';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @Put(':id/updateProfessional')
  updateProfessional(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserProfessionalDto,
  ) {
    return this.userService.updateUserProfessional(+id, updateUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id/showUser')
  findUniqueUser(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get('/showUserByEmail/:email')
  findUniqueUserByEmail(@Param('email') email: string) {
    return this.userService.findUserByEmail(email);
  }
}
