import { Expose } from 'class-transformer';

export class OfferResponseDto {
  @Expose()
  id: number;

  @Expose()
  amount: number;

  @Expose()
  createdAt: Date;

  @Expose()
  offererId: string;
}
