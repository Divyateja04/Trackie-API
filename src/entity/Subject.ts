import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Evaluative } from "./Evaluative";

@Entity()
@ObjectType()
export class Subject {
    @Field({ nullable: false})
    @PrimaryColumn({ unique: true })
    id: string

    @Field()
    @Column()
    dept: string

    @Field()
    @Column()
    code: string

    @Field()
    @Column()
    sem: string

    @Field(() => [Evaluative])
    @OneToMany(() => Evaluative, evaluative => evaluative.subject, { nullable: true })
    evals: Evaluative[]

    @Field()
    @Column()
    credits: number

    @Field()
    @Column({ nullable: true, default: 0 })
    midsemGrade: number

    @Field()
    @Column({ nullable: true, default: 0 })
    finalGrade: number
}