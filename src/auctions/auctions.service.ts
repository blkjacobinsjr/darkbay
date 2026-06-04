import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auction } from './auctions.entity';
import { Repository } from 'typeorm';
import { CreateAuctionDto } from './dto/create-auctions.dto';

@Injectable()
export class AuctionsService {
  constructor(
    @InjectRepository(Auction)
    private readonly auctionsRepository: Repository<Auction>,
  ) {}

  async create(createAuctionDto: CreateAuctionDto): Promise<Auction> {
    const auction = this.auctionsRepository.create(createAuctionDto);
    if (!auction.endDate) {
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 3);
      auction.endDate = targetDate;
    } else {
      // Falls der Client ein Datum schickt, stellen wir sicher, dass es ein echtes Date-Objekt ist
      auction.endDate = new Date(auction.endDate);
    }
    return await this.auctionsRepository.save(auction);
  }

  async findAll(): Promise<Auction[]> {
    return await this.auctionsRepository.find({
      relations: {
        offers: true,
      },
    });
  }

  async findOne(id: number): Promise<Auction> {
    const auction = await this.auctionsRepository.findOne({
      where: { id },
      relations: {
        offers: true,
      },
    });

    if (!auction) {
      throw new NotFoundException('Auction with Id not found');
    }
    return auction;
  }
}
