import { Controller, Body, ClassSerializerInterceptor, UseInterceptors, Post, Get, ParseIntPipe, Param } from '@nestjs/common';
import { CreateAuctionDto } from './dto/create-auctions.dto';
import { AuctionResponseDto } from './dto/auction-response.dto';
import { plainToInstance } from 'class-transformer';
import { AuctionsService } from './auctions.service';


@Controller('auctions')
@UseInterceptors(ClassSerializerInterceptor)
export class AuctionsController {
  constructor (private readonly auctionsService: AuctionsService){}

  @Post()
  async create (@Body() createAuctionDto: CreateAuctionDto): Promise<AuctionResponseDto> {
    const auction = await this.auctionsService.create(createAuctionDto);
    return plainToInstance (AuctionResponseDto, auction);
  }

  @Get()
  async findAll(): Promise<AuctionResponseDto[]> {
    const auctions = await this.auctionsService.findAll();
    return plainToInstance (AuctionResponseDto, auctions);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<AuctionResponseDto> {
    const auctions = await this.auctionsService.findOne(id);
    return plainToInstance (AuctionResponseDto, auctions);
  };
}
