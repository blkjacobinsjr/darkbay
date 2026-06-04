import { Expose } from "class-transformer";
import { OfferResponseDto } from "src/offers/dto/offer-response.dto";

export class AuctionResponseDto {

    @Expose()
    id: number;

    @Expose()
    title: string;

    @Expose()
    description: string;

    @Expose()
    startingprice: number;

    @Expose()
    currentprice: number;

    @Expose()
    createdAt: Date;

    @Expose()
    endDate: Date;

    @Expose()
    sellerId: string;

    @Expose()
    offers: OfferResponseDto[];

}