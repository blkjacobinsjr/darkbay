import { IsNumber, IsString, Min, IsNotEmpty, IsInt } from 'class-validator';

export class CreateOfferDto {
  @IsNumber()
  @Min(0)
  amount: number;

  @IsString()
  @IsNotEmpty()
  offererId: string;

  @IsInt()
  @IsNotEmpty()
  auctionId: number;
}
