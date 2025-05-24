import { Module } from '@nestjs/common';
import { BorrowRecordService } from './borrowrecord.service';
import { BorrowRecordController } from './borrowrecord.controller';
import { BorrowRecord } from './entities/borrowrecord.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from 'src/book/book.module';
import { MemberModule } from 'src/member/member.module';
import { PenaltyModule } from 'src/penalty/penalty.module';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowRecord]), BookModule, MemberModule, PenaltyModule],
  controllers: [BorrowRecordController],
  providers: [BorrowRecordService],
  exports: [BorrowRecordService]
})
export class BorrowrecordModule { }
