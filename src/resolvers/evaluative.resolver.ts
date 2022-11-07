import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Context } from "../types";
import { Evaluative } from './../entity/Evaluative';
import { Subject } from './../entity/Subject';

@Resolver()
export class EvaluativeResolver {
    @Mutation(() => Evaluative)
    async addEval(
        @Arg("name") name: string,
        @Arg("score") score: number,
        @Arg("total") total: number,
        @Arg("weightage") weightage: number,
        @Arg("subjectId") subjectId: string,
        @Ctx() { db }: Context
    ) {
        const subject = await db.manager.find(Subject, {
            where: {
                id: subjectId
            }
        })

        if(subject.length != 1){
            throw Error("Can't determine Subject");
        }

        console.log(subject)

        const evaluative = db.manager.create(Evaluative, {
            name: name.toUpperCase(),
            score: score,
            total: total,
            weightage: weightage,
            subjectId: subjectId,
            subject: subject[0]
        })

        await db.manager.save(evaluative);
        return evaluative;
    }
}