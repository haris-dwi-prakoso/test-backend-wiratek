import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberModule } from './member/member.module';
import { BookModule } from './book/book.module';
import { BorrowrecordModule } from './borrowrecord/borrowrecord.module';
import { PenaltyModule } from './penalty/penalty.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'wiratek_test',
      entities: [],
      synchronize: true,
      autoLoadEntities: true
    }),
    MemberModule,
    BookModule,
    BorrowrecordModule,
    PenaltyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
