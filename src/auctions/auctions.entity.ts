import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Offer } from '../offers/offers.entity';

@Entity('auctions')
export class Auction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', length: 150, nullable: false })
  title: string;

  @Column({ type: 'text', length: 500, nullable: false })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  startingprice: number;

  @Column('decimal', { precision: 10, scale: 2 })
  currentprice: number;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @Column({ type: 'datetime', nullable: true })
  endDate: Date;

  @Column({ type: 'text', nullable: false })
  sellerId: string;

  @OneToMany(() => Offer, (offer) => offer.auction)
  offers: Offer[];
}
