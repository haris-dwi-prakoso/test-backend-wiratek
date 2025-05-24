import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ReturnBookDto {
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
}