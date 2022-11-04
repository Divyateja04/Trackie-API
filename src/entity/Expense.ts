import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Expense {
    @PrimaryGeneratedColumn()
    @Column()
    id: number    

    @Column()
    place: string
    
    @Column()
    itemName: string

    @Column()
    price: number

    @Column({ default: 1 })
    quantity: number    

    @Column()
    totalPaid: number
}
