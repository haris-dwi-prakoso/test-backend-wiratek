import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Member } from "src/member/entities/member.entity";

@Entity()
export class Penalty {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    memberCode: string;

    @ManyToOne(() => Member, (member) => member.penalties, { cascade: ['insert', 'update'] })
    @JoinColumn({ name: 'memberCode', referencedColumnName: 'code', foreignKeyConstraintName: 'FK_MemberPenalty' })
    member: Member;

    @Column({ type: 'date' })
    expireDate: string;
}
