import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);
import { CreateAdminDto } from './dto/admin.dto';

@Injectable()
export class AdminsService {
  constructor(@InjectRepository(Admin) public adminRepo: Repository<Admin>) {}

  async signup(body: CreateAdminDto) {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(body.password, salt, 32)) as Buffer;
    body.password = salt + '.' + hash.toString('hex');

    const user = this.adminRepo.create(body);
    this.adminRepo.save(user);
    delete user.password;
    return { status: 201, message: 'ok', data: user };
  }

  async signin(body: CreateAdminDto) {
    const [user] = await this.adminRepo
      .createQueryBuilder()
      .select('*')
      .where('username = :username', { username: body.username })
      .getRawMany();
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const [salt, hashed] = user.password.split('.');

    const hash = (await scrypt(body.password, salt, 32)) as Buffer;

    if (hashed !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }
    delete user.password;
    return { status: 201, message: 'ok', data: user };
  }
}
