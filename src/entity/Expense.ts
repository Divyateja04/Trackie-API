import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Expense {
    @PrimaryGeneratedColumn()
    @Column()
    id: number    

    @Column()
    place: string

    @Column()
    amount: number

    @Column()
    item: number

    @Column({ default: 1 })
    quantity: number    
}
