import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Context } from "../types";
import { Subject } from '../entity/Subject';

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
        @Arg("sem") sem: number,
        @Arg("credits") credits: number,
        @Ctx() { db }: Context
    ): Promise<Subject | null> {
        try {
            const subject = db.manager.create(Subject, {
                id: dept.toUpperCase() + " " + code,
                dept: dept,
                code: code,
                sem: sem,
                credits: credits,
                evals: []
            });
            await db.manager.save(subject);
            return subject;
        } catch(err) {
            console.log(err);
            return null;
        }
    }
}