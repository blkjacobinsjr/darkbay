import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuctionsModule } from './auctions/auctions.module';
import { OfferModule } from './offers/offer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auction } from './auctions/auctions.entity';
import { Offer } from './offers/offers.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: 'darkbay.sqlite',
    entities: [Auction, Offer],
    autoLoadEntities: true,     // Lädt alle Entities, die in den Feature-Modulen registriert sind, automatisch
    synchronize: true,          // ARCHITEKTUR-ANTWORT: Generiert und aktualisiert Tabellen automatisch bei jedem Serverstart
  }),
    AuctionsModule,
    OfferModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
