import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { BorrowRecord } from 'src/borrowrecord/entities/borrowrecord.entity';
import { Penalty } from 'src/penalty/entities/penalty.entity';

@Entity()
export class Member {
    @PrimaryColumn()
    code: string;

    @Column()
    name: string;

    @OneToMany(() => BorrowRecord, (borrowRecord) => borrowRecord.member, { cascade: ['insert', 'update'] })
    borrowRecords: BorrowRecord[];

    @OneToMany(() => Penalty, (penalty) => penalty.member, { cascade: ['insert', 'update'] })
    penalties: Penalty[];
}
