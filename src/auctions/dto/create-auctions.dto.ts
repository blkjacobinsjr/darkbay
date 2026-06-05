import {
  IsString,
  MaxLength,
  IsNumber,
  Min,
  IsDate,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAuctionDto {
  @IsString()
  @MaxLength(150)
  title: string;

  @IsString()
  @MaxLength(500)
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  startingprice: number;

  @Type(() => Date) // Wandelt den String vom Client in ein Date-Objekt um
  @IsDate()
  @IsOptional()
  endDate?: Date;

  @IsString()
  sellerId: string;
}
