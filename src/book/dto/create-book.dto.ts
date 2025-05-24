import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateBookDto {
    @ApiProperty({
        example: 'JK-45',
        required: true
    })
    @IsNotEmpty()
    code: string;

    @ApiProperty({
        example: 'Harry Potter',
        required: true
    })
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        example: 'J.K Rowling',
        required: true
    })
    @IsNotEmpty()
    author: string;

    @ApiProperty({ required: true })
    @IsNumber()
    stock: number;
}
