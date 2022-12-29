import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminDto } from './dto/admin.dto';
import { JwtService } from '@nestjs/jwt';
import { Admin } from './admin.entity';
import { Repository } from 'typeorm';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin) public adminRepo: Repository<Admin>,
    private jwt: JwtService,
  ) {}

  async signup(body: CreateAdminDto) {
    const username = await this.findOneAdmin(body.username);
    if (username) {
      return new BadRequestException('such a username exists');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(body.password, salt, 32)) as Buffer;
    body.password = salt + '.' + hash.toString('hex');

    const user = this.adminRepo.create(body);
    await this.adminRepo.save(user);
    delete user.password;
    return { status: 201, message: 'ok', data: user };
  }

  async signin(body: CreateAdminDto) {
    const user = await this.findOneAdmin(body.username);
    if (!user) {
      return new NotFoundException('user not found');
    }

    const [salt, hashed] = user.password.split('.');

    const hash = (await scrypt(body.password, salt, 32)) as Buffer;

    if (hashed !== hash.toString('hex')) {
      return new BadRequestException('bad password');
    }
    delete user.password;
    return {
      status: 200,
      message: 'ok',
      data: user,
      access_token: this.jwt.sign({ adminId: user.adminId }),
    };
  }

  async findOneAdmin(username: string) {
    const [user] = await this.adminRepo
      .createQueryBuilder()
      .select('*')
      .where('username = :username', { username: username })
      .getRawMany();
    return user;
  }
}
