import { Field, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class MonthlyExpenses {
    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    month!: number

    @Field()
    @Column()
    year!: number

    @Field()
    @Column({ default: 0 })
    totalSpent: number
}