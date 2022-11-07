import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Subject } from "./Subject";

@Entity()
@ObjectType()
export class Evaluative {
    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    subjectId: string

    @Field(() => Subject)
    @ManyToOne(() => Subject, subject => subject.evals)
    subject: Subject

    @Field()
    @Column()
    name: string
    
    @Field()
    @Column()
    score: number

    @Field()
    @Column()
    total: number

    @Field()
    @Column()
    weightage: number
}