import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auction } from './auctions.entity';
import { Repository } from 'typeorm';
import { CreateAuctionDto } from './dto/create-auctions.dto';
import { PaginationDto } from './dto/pagination.dto';
import { PaginatedAuctionsResponseDto } from './dto/metadata.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuctionsService {
  constructor(
    @InjectRepository(Auction)
    private readonly auctionsRepository: Repository<Auction>,
  ) { }

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

  async findAll(@Query() queryDto: PaginationDto): Promise<PaginatedAuctionsResponseDto> {
    const { items, totalItems } = await this.auctionsService.findAll(queryDto);
    const page = queryDto.page ?? 1;

    const limit = queryDto.limit ?? 10;
    const totalPages = Math.ceil(totalItems / limit);

    // Antwort-Objekt zusammenbauen
    const response = {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: page,

      },

    };

    return plainToInstance(PaginatedAuctionsResponseDto, response);


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
