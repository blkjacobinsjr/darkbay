import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auction } from './auctions.entity';
import { Repository } from 'typeorm';
import { CreateAuctionDto } from './dto/create-auctions.dto';
import { AuctionStatus, PaginationDto } from './dto/pagination.dto';

@Injectable()
export class AuctionsService {
  constructor(
    @InjectRepository(Auction)
    private readonly auctionsRepository: Repository<Auction>,
  ) {}

  async create(createAuctionDto: CreateAuctionDto): Promise<Auction> {
    const auction = this.auctionsRepository.create(createAuctionDto);

    auction.currentprice = auction.startingprice;

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

  async findAll(
    queryDto: PaginationDto,
  ): Promise<{ items: Auction[]; totalItems: number }> {
    const {
      status,
      page = 1, // Falls undefined, nimm 1
      limit = 10, // Falls undefined, nimm 10
    } = queryDto;

    const minPrice = queryDto['minPrice'];
    const maxPrice = queryDto['maxPrice'];

    // Wir erstellen einen QueryBuilder für komplexe Filterungen
    const queryBuilder = this.auctionsRepository
      .createQueryBuilder('auction')
      .leftJoinAndSelect('auction.offers', 'offer');

    const now = new Date();

    // 1. Filter nach Status (offen vs. geschlossen)
    if (status === AuctionStatus.OPEN) {
      queryBuilder.andWhere('auction.endDate > :now', { now });
    } else if (status === AuctionStatus.CLOSED) {
      queryBuilder.andWhere('auction.endDate <= :now', { now });
    }

    // 2. Filter nach Mindestpreis
    if (minPrice !== undefined) {
      queryBuilder.andWhere('auction.currentprice >= :minPrice', { minPrice });
    }

    // 3. Filter nach Maximalpreis
    if (maxPrice !== undefined) {
      queryBuilder.andWhere('auction.currentprice <= :maxPrice', { maxPrice });
    }

    // 4. Sortierung: Nach Enddatum, neueste (am längsten laufende/als letztes endende) zuerst
    queryBuilder.orderBy('auction.endDate', 'DESC');

    // 5. Paginierung berechnen
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    // Führt die Query aus und gibt die Einträge + die Gesamtzahl (ohne Limit) zurück
    const [items, totalItems] = await queryBuilder.getManyAndCount();

    return { items, totalItems };
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
