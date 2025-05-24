import { Test, TestingModule } from '@nestjs/testing';
import { BorrowRecordController } from './borrowrecord.controller';
import { BorrowRecordService } from './borrowrecord.service';

describe('BorrowrecordController', () => {
  let controller: BorrowRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BorrowRecordController],
      providers: [BorrowRecordService],
    }).compile();

    controller = module.get<BorrowRecordController>(BorrowRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
