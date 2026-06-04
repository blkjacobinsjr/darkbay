import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './offers.entity';
import { Repository } from 'typeorm';
import { Auction } from '../auctions/auctions.entity';
import { CreateOfferDto } from './dto/create-offer.dto';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    @InjectRepository(Auction)
    private readonly auctionRepository: Repository<Auction>,
  ) {}

  async create(createOfferDto: CreateOfferDto): Promise<Offer> {
    const { amount, offererId, auctionId } = createOfferDto;

    const auction = await this.auctionRepository.findOne({
      where: { id: auctionId },
    });

    if (!auction) {
      throw new NotFoundException('Auction not found');
    }

    const now = new Date();

    if (now > auction.endDate) {
      throw new ConflictException(
        'Gebot abgelehnt: Diese Auktion ist bereits beendet',
      );
    }

    if (auction.currentprice) {
      if (amount <= auction.currentprice) {
        throw new ConflictException(
          'Gebot abgelehnt. Preis ist niedriger als der aktuelle Preis',
        );
      }
    } else {
      if (amount < auction.startingprice) {
        throw new ConflictException(
          'Gebot abgelehnt. Preis ist niedriger als der Startbetrag',
        );
      }
    }

    const newOffer = this.offerRepository.create({
      amount,
      offererId,
      auction,
    });

    const savedOffer = await this.offerRepository.save(newOffer);

    auction.currentprice = amount;
    await this.auctionRepository.save(auction);

    return savedOffer;
  }

  async findByAuction(auctionId: number): Promise<Offer[]> {
    return await this.offerRepository.find({
      where: { auction: { id: auctionId } },
      order: { createdAt: 'DESC' },
    });
  }
}
