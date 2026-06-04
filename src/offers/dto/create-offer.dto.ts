import { IsNumber, IsString, Min, IsNotEmpty } from "class-validator";

export class CreateOfferDto {
    @IsNumber()
    @Min(0)
    amount: number;

    @IsString()
    @IsNotEmpty()
    offererId: string;

    @IsString()
    @IsNotEmpty()
    auctionId: number;

}