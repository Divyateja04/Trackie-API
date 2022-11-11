import { Field, ObjectType } from "type-graphql"
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn } from "typeorm"

@Entity()
@ObjectType()
export class Expense extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number    

    @Field()
    @CreateDateColumn()
    date: Date

    @Field()
    @Column()
    place: string
    
    @Field()
    @Column()
    itemName: string

    @Field()
    @Column()
    totalPaid: number
}
