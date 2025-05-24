import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Penalty } from './entities/penalty.entity';
import { CreatePenaltyDto } from './dto/create-penalty.dto';
import { UpdatePenaltyDto } from './dto/update-penalty.dto';

@Injectable()
export class PenaltyService {
  constructor(
    @InjectRepository(Penalty)
    private penaltiesRepository: Repository<Penalty>
  ) { }
  create(createPenaltyDto: CreatePenaltyDto) {
    return this.penaltiesRepository.create(createPenaltyDto);
  }

  findAll() {
    return `This action returns all penalty`;
  }

  findOne(id: number) {
    return `This action returns a #${id} penalty`;
  }

  update(id: number, updatePenaltyDto: UpdatePenaltyDto) {
    return `This action updates a #${id} penalty`;
  }

  remove(id: number) {
    return `This action removes a #${id} penalty`;
  }

  async findOneByMemberCodeAndExpireDateMoreThanOrEqual(code: string, date: string) {
    return await this.penaltiesRepository.findOne({ relations: { member: true }, where: { member: { code: code }, expireDate: MoreThanOrEqual(date) } });
  }
}
