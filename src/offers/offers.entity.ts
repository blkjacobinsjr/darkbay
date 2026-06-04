import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Auction } from "src/auctions/auctions.entity";

@Entity()
export class Offer {
    @PrimaryGeneratedColumn()
    id: number;


    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @CreateDateColumn({ type: 'datetime', })
    createdAt: Date;

    @Column({ type: 'text', nullable: false })
    offererId: string;

    @ManyToOne(() => Auction, (auction) => auction.offers)
    auction: Auction;

}