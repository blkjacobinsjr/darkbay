import {
  Controller,
  Body,
  Post,
  Get,
  ParseIntPipe,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateAuctionDto } from './dto/create-auctions.dto';
import { AuctionResponseDto } from './dto/auction-response.dto';
import { plainToInstance } from 'class-transformer';
import { AuctionsService } from './auctions.service';
import { PaginationDto } from './dto/pagination.dto';
import { PaginatedAuctionsResponseDto } from './dto/metadata.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('auctions')
export class AuctionsController {
  constructor(private readonly auctionsService: AuctionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createAuctionDto: CreateAuctionDto,
  ): Promise<AuctionResponseDto> {
    const auction = await this.auctionsService.create(createAuctionDto);
    return plainToInstance(AuctionResponseDto, auction);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Query() queryDto: PaginationDto,
  ): Promise<PaginatedAuctionsResponseDto> {
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

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AuctionResponseDto> {
    const auctions = await this.auctionsService.findOne(id);
    return plainToInstance(AuctionResponseDto, auctions);
  }
}
