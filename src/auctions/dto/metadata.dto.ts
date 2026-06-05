import { Expose, Type } from "class-transformer";
import { AuctionResponseDto } from "./auction-response.dto";

export class MetaDataDto {
    @Expose()
    totalitems: number;

    @Expose()
    itemcount: number;

    @Expose()
    totalpages: number;

    @Expose()
    currentpage: number;
}

export class PaginatedAuctionsResponseDto {
    @Expose()
    @Type(() => AuctionResponseDto)
    items: AuctionResponseDto[];

    @Expose()
    @Type(() => MetaDataDto)
    meta: MetaDataDto;
}