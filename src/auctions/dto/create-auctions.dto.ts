import { IsString, MaxLength, IsNumber, Min, IsDate } from "class-validator";


export class CreateAuctionDto {
    @IsString()
    @MaxLength(150)
    title: string;

    @IsString()
    @MaxLength(500)
    description: string;

    @IsNumber()
    @Min(0)
    startingprice: number;

    @IsDate()
    endDate: Date;

    @IsString()
    sellerId: string;
}