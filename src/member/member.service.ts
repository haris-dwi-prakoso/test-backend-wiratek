import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>
  ) { }
  async create(createMemberDto: CreateMemberDto) {
    return await this.membersRepository.create(createMemberDto);
  }

  async findAll() {
    return await this.membersRepository.find();
  }

  async findOne(code: string) {
    return await this.membersRepository.findOne({ where: { code: code } });
  }

  async update(code: string, updateMemberDto: UpdateMemberDto) {
    return await this.membersRepository.update({ code: code }, updateMemberDto);
  }

  async remove(code: string) {
    return await this.membersRepository.delete({ code: code });
  }

  async findAllAndCountActiveBorrowRecords() {
    return await this.membersRepository.createQueryBuilder('member')
      .leftJoinAndSelect('member.borrowRecords', 'borrow_record')
      .where('borrow_record.returnDate IS NULL')
      .loadRelationCountAndMap('member.activeBorrowCount', 'member.borrowRecords')
      .getMany();
  }
}
