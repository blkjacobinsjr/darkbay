import { Expose } from 'class-transformer';

export class PaginationResponseDto {
  @Expose()
  totalitems: number;

  @Expose()
  itemcount: number;

  @Expose()
  totalpages: number;

  @Expose()
  currentpage: number;
}
