import { Module } from '@nestjs/common';
import { PenaltyService } from './penalty.service';
import { PenaltyController } from './penalty.controller';
import { Penalty } from './entities/penalty.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Penalty])],
  // controllers: [PenaltyController],
  providers: [PenaltyService],
  exports: [PenaltyService]
})
export class PenaltyModule { }
