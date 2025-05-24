import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { BorrowRecord } from 'src/borrowrecord/entities/borrowrecord.entity';

@Entity()
export class Book {
    @PrimaryColumn()
    code: string;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    stock: number;

    @OneToMany(() => BorrowRecord, (borrowRecord) => borrowRecord.book, { cascade: ['insert', 'update'] })
    borrowRecords: BorrowRecord[]
}
