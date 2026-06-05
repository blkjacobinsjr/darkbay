import { IsEnum, IsOptional, Min, IsInt, IsNumber } from "class-validator";
import { Transform } from "class-transformer";

export enum AuctionStatus {
    OPEN = 'open',
    CLOSED = 'closed',
}

export class PaginationDto {
    @IsOptional()
    @IsEnum(AuctionStatus)
    status?: AuctionStatus;

    @Min(1)
    @IsOptional()
    @IsInt()
    @Transform(({ value }) => parseInt(value, 10))
    page?: number = 1;

    @Min(1)
    @IsOptional()
    @IsInt()
    @Transform(({ value }) => parseInt(value, 10))
    limit?: number = 10;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Transform(({ value }) => parseFloat(value))
    minPrice?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Transform(({ value }) => parseFloat(value))
    maxPrice?: number;






}
