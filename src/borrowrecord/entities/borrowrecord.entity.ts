import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Book } from "src/book/entities/book.entity";
import { Member } from "src/member/entities/member.entity";

@Entity()
export class BorrowRecord {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    bookCode: string;

    @ManyToOne(() => Book, (book) => book.borrowRecords, { cascade: ['insert', 'update'] })
    @JoinColumn({ name: 'bookCode', referencedColumnName: 'code', foreignKeyConstraintName: 'FK_BookRecord' })
    book: Book;

    @Column()
    memberCode: string;

    @ManyToOne(() => Member, (member) => member.borrowRecords, { cascade: ['insert', 'update'] })
    @JoinColumn({ name: 'memberCode', referencedColumnName: 'code', foreignKeyConstraintName: 'FK_MemberRecord' })
    member: Member;

    @Column({ type: 'date' })
    borrowDate: string;

    @Column({ type: 'date', nullable: true })
    returnDate: string;
}
