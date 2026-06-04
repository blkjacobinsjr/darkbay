import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { plainToInstance } from 'class-transformer';
import { OfferResponseDto } from './dto/offer-response.dto';

@Controller('offers')
@UseInterceptors(ClassSerializerInterceptor) // Filtert die Daten anhand der @Expose() Regeln im DTO
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  // POST /offers -> Ein neues Gebot für eine Auktion abgeben
  @Post()
  async create(
    @Body() createOfferDto: CreateOfferDto,
  ): Promise<OfferResponseDto> {
    const offer = await this.offersService.create(createOfferDto);

    return plainToInstance(OfferResponseDto, offer);
  }

  // GET /offers/auction/:auctionId -> Den gesamten Gebotsverlauf einer bestimmten Auktion abrufen
  @Get('auction/:auctionId')
  async findByAuction(
    @Param('auctionId', ParseIntPipe) auctionId: number,
  ): Promise<OfferResponseDto[]> {
    const offers = await this.offersService.findByAuction(auctionId);
    return plainToInstance(OfferResponseDto, offers);
  }
}
