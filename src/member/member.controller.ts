import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Member')
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) { }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Member successfully created"
  })
  @ApiBody({
    type: CreateMemberDto,
    description: 'JSON structure for Member object'
  })
  async create(@Body() createMemberDto: CreateMemberDto, @Res() res) {
    let createResult = await this.memberService.create(createMemberDto);
    return res.status(HttpStatus.CREATED).json(createResult);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Member list with the amount of their currently borrowed books"
  })
  async findAll(@Res() res) {
    // return this.memberService.findAll();
    let members = await this.memberService.findAllAndCountActiveBorrowRecords();
    return res.status(HttpStatus.OK).json(members);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.memberService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
  //   return this.memberService.update(id, updateMemberDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.memberService.remove(id);
  // }
}
