import { Body, Controller, Post } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/admin.dto';

@Controller('admins')
export class AdminsController {
  constructor(private adminService: AdminsService) {}

  @Post('/signup')
  create(@Body() body: CreateAdminDto) {
    return this.adminService.signup(body);
  }

  @Post('/signin')
  find(@Body() body: CreateAdminDto) {
    return this.adminService.signin(body);
  }
}
