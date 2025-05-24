import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { BorrowRecord } from './entities/borrowrecord.entity';
import { BookService } from 'src/book/book.service';
import { MemberService } from 'src/member/member.service';
import { CreateBorrowRecordDto } from './dto/create-borrowrecord.dto';
import { UpdateBorrowRecordDto } from './dto/update-borrowrecord.dto';

@Injectable()
export class BorrowRecordService {
  constructor(
    @InjectRepository(BorrowRecord)
    private borrowRecordsRepository: Repository<BorrowRecord>,
    private bookService: BookService,
    private memberService: MemberService
  ) { }
  async create(createBorrowRecordDto: CreateBorrowRecordDto) {
    // const newRecord = this.borrowRecordsRepository.create(createBorrowRecordDto)
    // const book = await this.bookService.findOne(createBorrowRecordDto.bookCode);
    // const member = await this.memberService.findOne(createBorrowRecordDto.memberCode);
    // book?.borrowRecords.push(newRecord);
    // member?.borrowRecords.push(newRecord);
    return await this.borrowRecordsRepository.save(createBorrowRecordDto);
  }

  findAll() {
    return `This action returns all borrowrecord`;
  }

  findOne(id: number) {
    return `This action returns a #${id} borrowrecord`;
  }

  async update(id: number, updateBorrowRecordDto: UpdateBorrowRecordDto) {
    return await this.borrowRecordsRepository.update({ id: id }, updateBorrowRecordDto);
  }

  remove(id: number) {
    return `This action removes a #${id} borrowrecord`;
  }

  async findAllAndCountActiveByBookCode(bookCode: string) {
    return await this.borrowRecordsRepository.findAndCount({
      relations: {
        book: true
      },
      select: {
        book: {
          code: true
        }
      },
      where: {
        book: {
          code: bookCode
        },
        returnDate: IsNull()
      }
    });
  }

  async findAllAndCountActiveByMemberCode(memberCode: string) {
    return await this.borrowRecordsRepository.findAndCount({
      relations: {
        member: true
      },
      select: {
        member: {
          code: true
        }
      },
      where: {
        member: {
          code: memberCode
        },
        returnDate: IsNull()
      }
    });
  }

  async findValidBorrow(bookCode: string, memberCode: string) {
    return await this.borrowRecordsRepository.findOne({
      relations: {
        book: true,
        member: true
      },
      where: {
        book: {
          code: bookCode
        },
        member: {
          code: memberCode
        },
        returnDate: IsNull()
      }
    });
  }
}
