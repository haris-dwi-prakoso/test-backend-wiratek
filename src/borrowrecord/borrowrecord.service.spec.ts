import { Test, TestingModule } from '@nestjs/testing';
import { BorrowRecordService } from './borrowrecord.service';

describe('BorrowrecordService', () => {
  let service: BorrowRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BorrowRecordService],
    }).compile();

    service = module.get<BorrowRecordService>(BorrowRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
