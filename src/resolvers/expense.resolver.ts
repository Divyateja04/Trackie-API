import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../types";
import { Expense } from "../entity/Expense";
import { MonthlyExpenses } from "../entity/MonthlyExpenses";

@Resolver()
export class ExpenseResolver {
    /**
     * 
     * @param month month of which we need expenses
     * @param year similarly year
     * @returns an array of expenses for that month
     */
    @Query(() => [Expense])
    async getExpensesPerMonth (
        @Arg("month") month: number,
        @Arg("year") year: number,
        @Ctx() { db }: Context
    ) {
        const expenses = await db.manager.query(
            `SELECT * FROM expense WHERE EXTRACT(MONTH FROM expense.date) = $1 AND EXTRACT(YEAR FROM expense.date) = $2;`,
            [month, year]
        )
        return expenses;
    }

    /**
     * 
     * @param place where you bought the item
     * @param itemName name of the item
     * @param price price of the item
     * @param quantity quantity which defaults to 1
     * @returns the expense just added to the database
     */
    @Mutation(() => Expense)
    async addNewExpense(
        @Arg("place") place: string,
        @Arg("itemName") itemName: string,
        @Arg("totalPaid") totalPaid: number,
        @Ctx() { db }: Context,
    ): Promise<Expense> {

        const expense = db.manager.create(Expense, {
            place: place,
            itemName: itemName,
            totalPaid: totalPaid,
        });

        const existingMonthlyExpenses = await db.manager.find(MonthlyExpenses, {
            where: {
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear()
            }
        })

        if(existingMonthlyExpenses.length == 1){
            existingMonthlyExpenses[0].totalSpent += totalPaid;
            await db.manager.save(existingMonthlyExpenses[0]);
        }
        
        await db.manager.save(expense);
        return expense;
    }
}