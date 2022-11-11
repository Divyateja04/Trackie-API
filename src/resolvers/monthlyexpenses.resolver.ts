import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Context } from "../types";
import { MonthlyExpenses } from './../entity/MonthlyExpenses';
import { Expense } from './../entity/Expense';

@Resolver()
export class MonthlyExpensesResolver {    
    /**
     * 
     * @param month the month for which you need the monthly expense
     * @param year the year for which you need the monthly expense
     * @returns the row containing the monthly expense details for a month
     */
    @Mutation(() => MonthlyExpenses)
    async generateMonthlyExpense(
        @Arg("month") month: number,
        @Arg("year") year: number,
        @Ctx() { db }: Context
    ): Promise<MonthlyExpenses> {
        const existingMonthlyExpenses = await db.manager.find(MonthlyExpenses, {
            where: {
                month: month,
                year: year
            }
        })

        if(existingMonthlyExpenses.length == 1){
            return existingMonthlyExpenses[0];
        }

        const expenses: Expense[] = await db.manager.query(
            `SELECT * FROM expense WHERE EXTRACT(MONTH FROM expense.date) = $1 AND EXTRACT(YEAR FROM expense.date) = $2;`,
            [month, year]
        )

        let totalSpent: number = 0;
        for(let expense of expenses){
            totalSpent += expense.totalPaid;
        }

        const monthlyExpense = db.manager.create(MonthlyExpenses, {
            month: month,
            year: year,
            totalSpent: totalSpent,
        })
        await db.manager.save(monthlyExpense);
        return monthlyExpense;
    }
}