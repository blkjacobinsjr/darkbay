import { Module } from '@nestjs/common';
import { AuctionsController } from './auctions.controller';
import { AuctionsService } from './auctions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auction } from './auctions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auction])],
  controllers: [AuctionsController],
  providers: [AuctionsService],
  exports: [AuctionsService],
})
export class AuctionsModule {}
