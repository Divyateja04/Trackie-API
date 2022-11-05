import { Field, ObjectType } from "type-graphql"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
@ObjectType()
export class Expense {
    @Field()
    @PrimaryGeneratedColumn()
    id: number    

    @Field()
    @Column()
    place: string
    
    @Field()
    @Column()
    itemName: string

    @Field()
    @Column()
    price: number

    @Field()
    @Column({ default: 1 })
    quantity: number    

    @Field()
    @Column()
    totalPaid: number
}
