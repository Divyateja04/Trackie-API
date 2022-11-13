import { Field, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn()
    @Field()
    userId: number

    @Column()
    @Field()
    email!: string

    @Column()
    password!: string

    @CreateDateColumn()
    @Field()
    createdAt: Date

    @UpdateDateColumn()
    @Field()
    updatedAt: Date
}