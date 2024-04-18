import { UserService } from './users.service';
import { Controller, DefaultValuePipe, Get, Logger, ParseIntPipe, Query } from '@nestjs/common';
import { UsersEntity } from './users.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private userService: UserService) {}

  @Get('')
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ): Promise<Pagination<UsersEntity>> {
    this.logger.log('Get users according selected page');
    return this.userService.paginate({
      page,
      limit,
      route: '/users',
    });
  }
}
