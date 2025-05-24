import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>
  ) { }
  async create(createBookDto: CreateBookDto) {
    return await this.booksRepository.create(createBookDto);
  }

  async findAll() {
    return await this.booksRepository.find();
  }

  async findOne(code: string) {
    return await this.booksRepository.findOne({ where: { code: code } });
  }

  async update(code: string, updateBookDto: UpdateBookDto) {
    return await this.booksRepository.update({ code: code }, updateBookDto);
  }

  async remove(code: string) {
    return await this.booksRepository.delete({ code: code });
  }

  async findAllAndCountActiveBorrowRecords() {
    return await this.booksRepository.createQueryBuilder('book')
      .leftJoinAndSelect('book.borrowRecords', 'borrow_record')
      .where('borrow_record.returnDate IS NULL')
      .loadRelationCountAndMap('book.activeBorrowCount', 'book.borrowRecords')
      .getMany();
  }

  async findOneAndCountActiveBorrowRecords(code: string) {
    return await this.booksRepository.createQueryBuilder('book')
      .leftJoinAndSelect('book.borrowRecords', 'borrow_record')
      .where('book.code = :code', { code: code })
      .andWhere('borrow_record.returnDate IS NULL')
      .loadRelationCountAndMap('book.activeBorrowCount', 'book.borrowRecords')
      .getOne();
  }
}
