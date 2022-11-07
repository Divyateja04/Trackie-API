import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Context } from "../types";
import { Subject } from '../entity/Subject';

@Resolver()
export class SubjectResolver {
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