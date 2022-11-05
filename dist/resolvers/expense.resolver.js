"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Expense_1 = require("../entity/Expense");
let ExpenseResolver = class ExpenseResolver {
    async getExpensesPerMonth(month, year, { db }) {
        const expenses = await db.manager.query(`SELECT * FROM expense WHERE EXTRACT(MONTH FROM expense.date) = $1 AND EXTRACT(YEAR FROM expense.date) = $2;`, [month, year]);
        return expenses;
    }
    async addNewExpense(place, itemName, price, quantity, { db }) {
        const expense = db.manager.create(Expense_1.Expense, {
            place: place,
            itemName: itemName,
            price: price,
            quantity: quantity,
            totalPaid: price * quantity,
        });
        await db.manager.save(expense);
        return expense;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Expense_1.Expense]),
    __param(0, (0, type_graphql_1.Arg)("month")),
    __param(1, (0, type_graphql_1.Arg)("year")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], ExpenseResolver.prototype, "getExpensesPerMonth", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Expense_1.Expense),
    __param(0, (0, type_graphql_1.Arg)("place")),
    __param(1, (0, type_graphql_1.Arg)("itemName")),
    __param(2, (0, type_graphql_1.Arg)("price")),
    __param(3, (0, type_graphql_1.Arg)("quantity")),
    __param(4, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], ExpenseResolver.prototype, "addNewExpense", null);
ExpenseResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ExpenseResolver);
exports.ExpenseResolver = ExpenseResolver;
