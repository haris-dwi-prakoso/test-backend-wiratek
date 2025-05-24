import { PartialType } from '@nestjs/swagger';
import { CreateBorrowRecordDto } from './create-borrowrecord.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString } from "class-validator";

export class UpdateBorrowRecordDto extends PartialType(CreateBorrowRecordDto) {
    @ApiProperty({
        example: '2025-02-01',
        required: false
    })
    @IsDateString({
        strict: true
    })
    returnDate?: string;
}
