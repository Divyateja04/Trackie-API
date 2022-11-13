import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { Context } from "../types";
import { Subject } from '../entity/Subject';

@ObjectType()
export class SGPAReturn {
    @Field()
    midsemGrade!: number

    @Field()
    finalGrade!: number
}

@Resolver()
export class SubjectResolver {
    /**
     * 
     * @param dept the department of the course
     * @param code the course code
     * @param sem the semester which includes 1 through 8 Note: Add PS-1 and PS-2
     * @param credits no of credits the course is for
     * @param id automatically generated using dept + code 
     * @returns the new subjects
     */
    @Mutation(() => Subject)
    async addNewSubject(
        @Arg("dept") dept: string,
        @Arg("code") code: string,
        @Arg("sem") sem: string,
        @Arg("credits") credits: number,
        @Arg("midsemGrade") midsemGrade: number,
        @Arg("finalGrade") finalGrade: number,
        @Ctx() { db }: Context
    ): Promise<Subject> {

        const existingSubject = await db.manager.find(Subject, {
            where: {
                dept: dept,
                code: code
            },
            relations: {
                evals: true
            }
        })

        if(existingSubject.length == 1){
            if(existingSubject[0].sem != sem) throw Error("Cannot overlap subjects in different semesters");
        }

        const subject = db.manager.create(Subject, {
            id: dept.toUpperCase() + " " + code,
            dept: dept,
            code: code,
            sem: sem,
            credits: credits,
            midsemGrade: midsemGrade,
            finalGrade: finalGrade,
            evals: []
        });

        await db.manager.save(subject);
        return subject;
    }

    @Query(() => [Subject])
    async getSubjectsPerSem(
        @Arg("sem") sem: string,
        @Ctx() { db }: Context,
    ) {
        const subjects = await db.manager.find(Subject, {
            where: {
                sem: sem
            },
            relations: {
                evals: true
            }
        })

        return subjects;
    }

    @Query(() => SGPAReturn)
    async getSGPA(
        @Arg("sem") sem: string,
        @Ctx() { db }: Context
    ): Promise<SGPAReturn> {
        const subjects = await db.manager.find(Subject, {
            where: {
                sem: sem
            }
        })

        let credits: number = 0;
        let totalMidCredGrade: number = 0;
        let totalFinalCredGrade: number = 0;

        subjects.forEach(subject => {
            credits += subject.credits;
            totalMidCredGrade += subject.credits * subject.midsemGrade;
            totalFinalCredGrade += subject.credits * subject.finalGrade
        })

        return {
            midsemGrade: totalMidCredGrade/credits,
            finalGrade: totalFinalCredGrade/credits
        }
    }
}