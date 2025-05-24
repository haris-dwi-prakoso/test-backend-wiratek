import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { BorrowRecordService } from './borrowrecord.service';
import { BookService } from 'src/book/book.service';
import { MemberService } from 'src/member/member.service';
import { PenaltyService } from 'src/penalty/penalty.service';
import { CreateBorrowRecordDto } from './dto/create-borrowrecord.dto';
import { UpdateBorrowRecordDto } from './dto/update-borrowrecord.dto';
import { ReturnBookDto } from './dto/returnbook.dto';
import * as moment from 'moment';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Borrow')
@Controller('borrow')
export class BorrowRecordController {
  constructor(
    private readonly borrowrecordService: BorrowRecordService,
    private readonly bookService: BookService,
    private readonly memberService: MemberService,
    private readonly penaltyService: PenaltyService
  ) { }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Record successfully created"
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Book or Member not found"
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Member cannot borrow Book"
  })
  @ApiBody({
    type: CreateBorrowRecordDto,
    description: "JSON structure for borrow record object"
  })
  async create(@Body() createBorrowRecordDto: CreateBorrowRecordDto, @Res() res) {
    let memberData = await this.memberService.findOne(createBorrowRecordDto.memberCode);
    if (memberData === null) return res.status(HttpStatus.NOT_FOUND).send("Member does not exist");
    let [memberActiveBorrowRecords, memberActiveBorrowTotal] = await this.borrowrecordService.findAllAndCountActiveByMemberCode(createBorrowRecordDto.memberCode);
    if (memberActiveBorrowTotal > 2) return res.status(HttpStatus.FORBIDDEN).send("Member has reached the limit of unreturned books");
    let bookData = await this.bookService.findOneAndCountActiveBorrowRecords(createBorrowRecordDto.bookCode);
    if (bookData === null) return res.status(HttpStatus.NOT_FOUND).send("Book does not exist");
    else if (bookData.stock < bookData["activeBorrowCount"]) return res.status(HttpStatus.FORBIDDEN).send("Book is currently unavailable");
    let currentDate = moment().format('YYYY-MM-DD');
    let activePenalty = await this.penaltyService.findOneByMemberCodeAndExpireDateMoreThanOrEqual(createBorrowRecordDto.memberCode, currentDate);
    if (activePenalty !== null) return res.status(HttpStatus.FORBIDDEN).send("Member is currently under penalty");
    createBorrowRecordDto.borrowDate = createBorrowRecordDto.borrowDate ?? currentDate;
    let createResult = await this.borrowrecordService.create(createBorrowRecordDto)
    return res.status(HttpStatus.OK).json(createResult);
  }

  @Post('return')
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Book successfully returned"
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Borrow Record not found"
  })
  @ApiBody({
    type: ReturnBookDto,
    description: "JSON structure for returned book object"
  })
  async returnBook(@Body() returnBookDto: ReturnBookDto, @Res() res) {
    let validBorrow = await this.borrowrecordService.findValidBorrow(returnBookDto.bookCode, returnBookDto.memberCode);
    if (validBorrow === null) return res.status(HttpStatus.NOT_FOUND).send("Valid Borrow Record not found");
    let returnDate = moment();
    let returnDateString = returnDate.format('YYYY-MM-DD');
    let borrowDate = moment(validBorrow.borrowDate);
    let days = returnDate.diff(borrowDate, 'days');
    let penalty;
    if (days > 7) {
      let expireDate = returnDate.add(3, 'days').format('YYYY-MM-DD');
      penalty = await this.penaltyService.create({ expireDate: expireDate, memberCode: returnBookDto.memberCode });
    }
    let updateResult = await this.borrowrecordService.update(validBorrow.id, { returnDate: returnDateString });
    return res.status(HttpStatus.OK).json({ updateResult: updateResult, penalty: penalty });
  }

  // @Get()
  // findAll() {
  //   return this.borrowrecordService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.borrowrecordService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBorrowRecordDto: UpdateBorrowRecordDto) {
  //   return this.borrowrecordService.update(+id, updateBorrowRecordDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.borrowrecordService.remove(+id);
  // }
}
