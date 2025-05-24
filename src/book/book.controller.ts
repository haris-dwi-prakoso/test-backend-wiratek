import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Book successfully created"
  })
  @ApiBody({
    type: CreateBookDto,
    description: 'JSON structure for Book object'
  })
  async create(@Body() createBookDto: CreateBookDto, @Res() res) {
    let createResult = await this.bookService.create(createBookDto);
    return res.status(HttpStatus.CREATED).json(createResult);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: "List of books and their currently available stock"
  })
  async findAll(@Res() res) {
    // return this.bookService.findAll();
    let result = await this.bookService.findAllAndCountActiveBorrowRecords();
    result = result.map((x) => {
      x.stock = x.stock - x["activeBorrowCount"];
      delete x["activeBorrowCount"];
      return x;
    });
    return res.status(HttpStatus.OK).json(result);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.bookService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
  //   return this.bookService.update(id, updateBookDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.bookService.remove(id);
  // }
}
