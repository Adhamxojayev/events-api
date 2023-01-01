import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { CategoriesModule } from './categories/categories.module';
import { SubCategoriesModule } from './sub-categories/sub-categories.module';
import { AdminsModule } from './admins/admins.module';
import { ConfigModule } from '@nestjs/config';
import { Events } from './events/events.entity';
import { Categories } from './categories/categories.entity';
import { SubCategories } from './sub-categories/sub-categories.entity';
import { Admin } from './admins/admin.entity';
import { CheckTokenMiddleware } from './middlewares/check-token';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.development.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.PG_USER,
      host: process.env.PG_HOST,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      // port: parseInt(process.env.PG_PORT),
      entities: [Events, Categories, SubCategories, Admin],
      synchronize: true,
    }),
    EventsModule,
    CategoriesModule,
    SubCategoriesModule,
    AdminsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckTokenMiddleware)
      .forRoutes(
        { path: 'events/admin/:id', method: RequestMethod.PATCH },
        { path: 'events/admin/:id', method: RequestMethod.DELETE },
        { path: 'events/admin/all', method: RequestMethod.GET },
      );
  }
}
