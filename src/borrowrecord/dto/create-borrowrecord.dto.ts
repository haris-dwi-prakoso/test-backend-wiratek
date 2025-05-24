import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty } from "class-validator";

export class CreateBorrowRecordDto {
    @ApiProperty({
        example: 'JK-45',
        required: true
    })
    @IsNotEmpty()
    bookCode: string;
    @ApiProperty({
        example: 'M001',
        required: true
    })
    @IsNotEmpty()
    memberCode: string;
    @ApiProperty({
        example: '2025-02-01',
        required: false
    })
    @IsDateString({
        strict: true
    })
    borrowDate?: string;
    // @ApiProperty({
    //     example: '2025-02-01',
    //     required: false
    // })
    // @IsDateString({
    //     strict: true
    // })
    // returnDate?: string;
}
